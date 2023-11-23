import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanilhaDto } from './create-planilha.dto';

export class UpdatePlanilhaDto extends PartialType(CreatePlanilhaDto) {}
