import { Test, TestingModule } from '@nestjs/testing';
import { PlanilhaController } from './planilha.controller';
import { PlanilhaService } from './planilha.service';

describe('PlanilhaController', () => {
  let controller: PlanilhaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlanilhaController],
      providers: [PlanilhaService],
    }).compile();

    controller = module.get<PlanilhaController>(PlanilhaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
