import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { AppGateway } from 'src/app/app.gateway';
import { DashboardController } from './dashboard.controller';
import { UserByToken } from 'src/session/auth';
import { JsonWebToken } from 'src/modules/JsonWebToken';
import { JwtService } from '@nestjs/jwt';
import { DashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [PrismaService, AppGateway, UserByToken, DashboardController, JsonWebToken, JwtService, DashboardService]
})
export class DashboardModule { }
