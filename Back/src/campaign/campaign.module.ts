import { Module } from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService]
})
export class CampaignModule { }
