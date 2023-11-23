import { Module } from '@nestjs/common';
import { CronjobsService } from './cronjobs.service';
import { PlanilhaService } from 'src/planilha/planilha.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [CronjobsService, PlanilhaService, PrismaService]
})
export class CronjobsModule { }
