import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlanilhaService } from './planilha.service';
import { CreatePlanilhaDto, QueriesDTO } from './dto/create-planilha.dto';
import { UpdatePlanilhaDto } from './dto/update-planilha.dto';
import { PlanilhaResume } from '@prisma/client';

//UpInsertPlanilhaDTO

interface UpInsertPlanilhaDTO extends Omit<PlanilhaResume, 'id'> {
  id?: number
}

@Controller('planilha')
export class PlanilhaController {
  constructor(private readonly planilhaService: PlanilhaService) { }

  @Post()
  create(@Body() createPlanilhaDto: CreatePlanilhaDto) {
    return this.planilhaService.create(createPlanilhaDto);
  }

  @Get('refresh')
  refresh() {
    return this.planilhaService.refresh();
  }

  @Get()
  findAll(
    @Query('status') nome_status: string,
    @Query('id_pedido') id: string,
    @Query('product_code') product_code: string,
    @Query('data') date: string,
  ) {
    const queries: QueriesDTO = { nome_status, numero_pedido: id, product_code, date }

    const filteredQueries = Object.keys(queries).reduce((filtered, key) => {
      if (queries[key] !== undefined) {
        filtered[key] = queries[key];
      }
      return filtered;
    }, {});

    return this.planilhaService.findAll(filteredQueries);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planilhaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanilhaDto: UpdatePlanilhaDto) {
    return this.planilhaService.update(+id, updatePlanilhaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planilhaService.remove(+id);
  }
}
