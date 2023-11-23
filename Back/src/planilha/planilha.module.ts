import { Module } from '@nestjs/common';
import { PlanilhaService } from './planilha.service';
import { PlanilhaController } from './planilha.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [PlanilhaController],
  providers: [PlanilhaService, PrismaService]
})
export class PlanilhaModule {}
