import { Module } from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { FacebookController } from './facebook.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [FacebookController],
  providers: [FacebookService, PrismaService]
})
export class FacebookModule { }
