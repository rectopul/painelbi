import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PlanilhaResume } from '@prisma/client';
import { PlanilhaService } from 'src/planilha/planilha.service';

@Injectable()
export class CronjobsService {
    private readonly logger = new Logger(CronjobsService.name);

    constructor(private readonly planilha: PlanilhaService) { }

    @Cron('45 * * * * *')
    async handleCron() {
        try {
            const planilha: PlanilhaResume[] = await this.planilha.refresh()
            this.logger.debug(`Planilha atualizada ${planilha.length} dados atualizados`);
        } catch (error) {
            this.logger.debug(`Erro ao executar tarefa agendada: Atualização de planilha ${error}`);
        }

    }
}
