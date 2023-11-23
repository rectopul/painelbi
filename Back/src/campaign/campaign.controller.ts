import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { AccountFacebookCreateDTO, AdAccountsPayloadsPDTO, AdAccountsStatusDTO, CreateCampaignDto } from './dto/create-campaign.dto';

@Controller('campaign')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) { }

  @Post()
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    try {
      return await this.campaignService.create(createCampaignDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Post('account')
  async accountFaceCreate(@Body() data: AccountFacebookCreateDTO) {
    try {
      return await this.campaignService.AccountCreate(data)
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.campaignService.findOne(+id);
  // }

  @Patch('account/ad_account/:id')
  async updateAdAccount(@Param('id') id: string, @Body() updateCampaignDto: AdAccountsPayloadsPDTO) {
    try {
      return await this.campaignService.updateAdAccounts(+id, updateCampaignDto);
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampaignDto: UpdateCampaignDto) {
    return this.campaignService.update(+id, updateCampaignDto);
  }

  @Get('ads_status')
  async allAdsStatus() {
    try {
      return await this.campaignService.allAdsStatus()
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.BAD_REQUEST)
    }

  }

  @Get('terms')
  remove(@Query('q') term: string) {
    return this.campaignService.searchTerms(term)
  }
}
