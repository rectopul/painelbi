import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCampaignDto, CampaignPayloadDTO, AccountFacebookCreateDTO, FacebookAccountsPayloadDTO, AdAccountsStatusDTO, AdAccountsStatusListDTO, AdAccountsPayloadsPDTO, CampaignStatusListDTO, AdAccountsConsultDTO } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { PrismaService } from 'src/database/prisma.service';

interface CampaignFaceDTO {
  id: string
}

@Injectable()
export class CampaignService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCampaignDto: CreateCampaignDto): Promise<CampaignPayloadDTO> {
    try {
      //console.log(`dados recebidos`, createCampaignDto)
      const facebookProfile = await this.prisma.facebookProfiles.findFirst({ where: { id: +createCampaignDto.facebook_account } })

      if (!facebookProfile) throw new Error(`Conta de facebook não existe`)

      const url = `https://graph.facebook.com/v18.0/act_${process.env.FACE_ACCOUNT_ID}/campaigns?access_token=${facebookProfile.token}`

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createCampaignDto)
      }

      const req = await fetch(url, options)

      if (!req.ok) {
        const res: any = await req.json()
        throw new Error(res)
      }

      const res: CampaignFaceDTO = await req.json()

      const payloadCampaign = {
        name: createCampaignDto.name,
        objective: createCampaignDto.objective,
        status: createCampaignDto.status,
        special_ad_categories: createCampaignDto.special_ad_categories,
        campaign_id: res.id,
        facebook_profile_id: facebookProfile.id
      }

      const campaign = await this.prisma.campaigns.create({
        data: payloadCampaign
      })

      return campaign
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }

  async allAdsStatus() {
    try {
      const profiles = await this.prisma.facebookProfiles.findMany({ include: { AdAccount: true } })
      const adAccounts = await this.prisma.adAccount.findMany({ include: { facebook: { include: { BusinessAccount: true } } } })

      if (!adAccounts) throw new Error(`Nenhuma conta de anúncio encontrada`)

      const responseAccounts: CampaignStatusListDTO[] = []
      const response = []

      for (const profile of profiles) {
        const token = profile.token


        const url = new URL(`https://graph.facebook.com/v18.0/me`)
        url.searchParams.append('access_token', token)
        url.searchParams.append(
          'fields',
          `adaccounts{balance,account_status,amount_spent,business,business_name,currency,custom_audience_info,name,id,owner,ads{bid_amount,effective_status,ad_active_time,name,status,insights{spend},account_id}}`
        )

        const req = await fetch(url)

        if (!req.ok) {
          const errorData = await req.json()

          throw new HttpException(errorData.error.message, HttpStatus.BAD_REQUEST);
        }

        const res: AdAccountsConsultDTO = await req.json()

        for (const adAccount of profile.AdAccount) {

          const filter = res.adaccounts.data.filter(a => a.name == adAccount.name)

          const incrementAds = filter.map(ad => {
            if (ad.ads) {
              const { account_status, balance, name, id, amount_spent } = ad
              const data = ad.ads.data.map(a => {
                if (a.insights && a.insights.data.length) {
                  const { name, status, effective_status, id } = a
                  const { date_start, date_stop, spend } = a.insights.data[0]

                  return {
                    name,
                    status,
                    effective_status,
                    ad_id: id,
                    date_start,
                    date_stop,
                    spend
                  }
                }
              })

              return {
                account_status,
                balance,
                name,
                id,
                amount_spent,
                ads: data
              }
            }
          })

          const cleans = incrementAds.filter(e => Boolean(e))

          if (cleans.length) {
            for (const ads of cleans) {
              for (const adItem of ads.ads) {
                if (adItem) {
                  const adsExists = await this.prisma.ads.findFirst({ where: { unic_code: adItem.ad_id } })

                  if (!adsExists) {

                    await this.prisma.ads.create({
                      data: {
                        date_start: adItem.date_start,
                        date_stop: adItem.date_stop,
                        name: adItem.name,
                        status: adItem.status,
                        adAccountId: adAccount.id,
                        ad_active_time: "0",
                        spend: adItem.spend,
                        unic_code: adItem.ad_id
                      }
                    })
                  }
                }
              }
            }
          }

        }

      }

      const getData = await this.prisma.facebookProfiles.findMany({ include: { AdAccount: { include: { Ads: true } } } })

      return getData
    } catch (error) {
      console.log(error)
      // if (error.name && error.name == `PrismaClientKnownRequestError`) {
      //   if (error.code && error.code == `P2002`) {
      //     throw new Error(`Você está tentando enviar atualizar um dado que não pode ser repetido`)
      //   }
      // }
      throw new Error(error?.message || error?.error)
    }
  }

  async AccountCreate(data: AccountFacebookCreateDTO) {
    try {
      //console.log(`dados recebidos`, createCampaignDto)
      const url = `https://graph.facebook.com/v18.0/me?access_token=${data.token}&fields=accounts,name`


      const req = await fetch(url)

      if (!req.ok) {
        const res: any = await req.json()
        console.log(`erro ao buscar contas do facebook`, res)
        throw new Error(res.error.message)
      }

      const res: FacebookAccountsPayloadDTO = await req.json()

      console.log(`resposta do face: `, res)

      const reqStatus = await fetch(`https://graph.facebook.com/v18.0/me/adaccounts?access_token=${data.token}&fields=account_status,name`)

      if (!reqStatus.ok) {
        const resStatus: any = await reqStatus.json()
        throw new Error(resStatus)
      }



      const resStatus: AdAccountsStatusListDTO = await reqStatus.json()

      if (res && resStatus.data.length) {
        const checkExists = await this.prisma.facebookProfiles.findFirst({ where: { token: data.token } })

        if (checkExists) throw new Error(`Token já cadastrado, informe um novo token`)
        const faceAccounts = await this.prisma.facebookProfiles.create({
          data: {
            token: data.token,
            unic_code: data.unic_code,
            name: res.name,
            status: `ACTIVE`
          }
        })

        if (faceAccounts.id) {
          for (const resAccount of resStatus.data) {
            let status;

            if (resAccount.account_status == 1) status = `ACTIVE`
            if (resAccount.account_status == 2) status = `DISABLED`
            if (resAccount.account_status == 3) status = `UNSETTLED`
            if (resAccount.account_status == 7) status = `PENDING_RISK_REVIEW`
            if (resAccount.account_status == 8) status = `PENDING_SETTLEMENT`
            if (resAccount.account_status == 9) status = `IN_GRACE_PERIOD`
            if (resAccount.account_status == 100) status = `PENDING_CLOSURE`
            if (resAccount.account_status == 101) status = `CLOSED`
            if (resAccount.account_status == 201) status = `ANY_ACTIVE`
            if (resAccount.account_status == 202) status = `ANY_CLOSED`

            console.log(`account ids: `, resAccount)

            await this.prisma.adAccount.create({
              data: {
                account_id: resAccount.id,
                name: resAccount.name,
                status,
                facebook_id: faceAccounts.id
              }
            })
          }
        }


        // if (faceAccounts.id) {
        //   await this.prisma.businessAccount.create({
        //     data: {
        //       access_token: data.token,
        //       business_id: res.accounts.data[0].id,
        //       unic_code: data.unic_code,
        //       facebook_account: faceAccounts.id,
        //       name: res.accounts.data[0].name
        //     }
        //   })
        // }

        const resAccounts = await this.prisma.facebookProfiles.findFirst({ where: { id: faceAccounts.id }, include: { AdAccount: true, BusinessAccount: true } })

        return resAccounts
      }

      console.log(res)
      throw new Error(`Erro ao criar contas ${JSON.stringify(res)}`)
    } catch (error) {
      console.log(error)
      if (error.name && error.name == `PrismaClientKnownRequestError`) {
        if (error.code && error.code == `P2002`) {
          throw new Error(`Você está tentando enviar atualizar um dado que não pode ser repetido`)
        }
      }
      throw new Error(error?.message || error?.error)
    }
  }

  async updateAdAccounts(id: number, data: AdAccountsPayloadsPDTO) {
    try {
      const ad_account = await this.prisma.adAccount.findFirst({ where: { id } })

      if (!ad_account) throw new Error(`ad account not exists`)

      const update = await this.prisma.adAccount.update({ where: { id }, data: data })

      if (!update) throw new Error(`error on update ad account`)

      return update
    } catch (error) {

      if (error.name && error.name == `PrismaClientKnownRequestError`) {
        if (error.code && error.code == `P2002`) {
          throw new Error(`Você está tentando enviar atualizar um dado que não pode ser repetido`)
        }
      }
      throw new Error(error?.message || error?.error)
    }
  }

  findAll() {
    return `This action returns all campaign`;
  }

  findOne(id: number) {
    return `This action returns a #${id} campaign`;
  }

  update(id: number, updateCampaignDto: UpdateCampaignDto) {
    return `This action updates a #${id} campaign`;
  }

  async searchTerms(term: string) {
    try {
      //FACE_APP_TOKEN
      const url = `https://graph.facebook.com/v18.0/search?access_token=${process.env.FACE_APP_TOKEN}&q=${term}&type=adinterest`

      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const req = await fetch(url, options)


      if (!req.ok) {
        const res: any = await req.json()
        throw new Error(res)
      }

      const res = await req.json()

      return res
    } catch (error) {
      throw new Error(error?.message || error)
    }
  }
}
