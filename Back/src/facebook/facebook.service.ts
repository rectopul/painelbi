import { Injectable } from '@nestjs/common';
import { CreateFacebookDto, FacePostsList, FacebookAccount, FacebookDataPages, FacebookPageToken, FacebookPagesListMain, FacebookPagesPayload } from './dto/create-facebook.dto';
import { UpdateFacebookDto } from './dto/update-facebook.dto';
import { PrismaService } from 'src/database/prisma.service';
import { FacebookProfiles } from '@prisma/client'
import { ErrorType } from 'src/@types/util';

@Injectable()
export class FacebookService {
  constructor(
    private readonly prisma: PrismaService
  ) { }

  create(createFacebookDto: CreateFacebookDto) {
    return 'This action adds a new facebook';
  }

  async findAll(): Promise<FacebookProfiles[]> {
    try {
      const facebookAccounts = await this.prisma.facebookProfiles.findMany()


      return facebookAccounts
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }

  async findAllPages(): Promise<FacebookPagesPayload[]> {
    try {
      const facebookAccounts = await this.prisma.facebookProfiles.findMany()

      const facebookWithPages: FacebookPagesPayload[] = await Promise.all(
        facebookAccounts.map(async (f) => {
          try {
            const faceBookAccountURL = new URL(`https://graph.facebook.com/v18.0/me`)
            faceBookAccountURL.searchParams.append('access_token', f.token)

            const reqFacebookAccountId = await fetch(faceBookAccountURL)

            if (!reqFacebookAccountId.ok) {
              const dataFaceAccountError: ErrorType = await reqFacebookAccountId.json()
              throw new Error(dataFaceAccountError.message)
            }

            const faceBookAccountPayload: FacebookAccount = await reqFacebookAccountId.json()

            //Pegar Token de páginas da conta
            const faceBookPageTokenURL = new URL(`https://graph.facebook.com/v18.0/${faceBookAccountPayload.id}/accounts`)
            faceBookPageTokenURL.searchParams.append('access_token', f.token)

            const faceBookPageTokenReq = await fetch(faceBookPageTokenURL)

            if (!faceBookPageTokenReq.ok) {
              const dataFaceTokenError: ErrorType = await faceBookPageTokenReq.json()
              throw new Error(dataFaceTokenError.message)
            }

            const resFaceToken: FacebookPageToken = await faceBookPageTokenReq.json()


            const urlFacebookPages = new URL(`https://graph.facebook.com/v18.0/me/accounts`)
            urlFacebookPages.searchParams.append('access_token', f.token)

            const req = await fetch(urlFacebookPages)

            if (!req.ok) {
              const dataError: ErrorType = await req.json()
              throw new Error(dataError.message)
            }

            const res: FacebookPagesListMain = await req.json()

            //Resolvendo as promessas de requisições de páginas
            const posts: FacebookDataPages[] = await Promise.all(
              res.data.map(async (page) => {
                try {

                  //Montagem da url de requisição de páginas
                  const urlPost = new URL(`https://graph.facebook.com/v18.0/${page.id}`)
                  urlPost.searchParams.append('fields', 'posts,ads_posts')
                  urlPost.searchParams.append('access_token', resFaceToken.data[0].access_token)

                  //Requisição para os posts da página
                  const req = await fetch(urlPost)

                  if (!req.ok) {
                    const dataError: ErrorType = await req.json()
                    console.log(dataError)
                  }

                  const postList: FacePostsList = await req.json()

                  return { posts: postList, ...page }

                } catch (error) {
                  console.log(error?.message || error?.error)
                }
              })
            )

            const pages = {
              data: posts,
              paging: res.paging
            }

            //Capturar os posts das páginas

            return { pages, ...f }
          } catch (error) {
            console.log(error)
            throw new Error(error?.message || error?.error)
          }
        })
      )

      return facebookWithPages
    } catch (error) {
      throw new Error(error?.message || error?.error)
    }
  }
}
