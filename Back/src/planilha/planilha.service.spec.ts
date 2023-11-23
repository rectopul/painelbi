import { Test, TestingModule } from '@nestjs/testing';
import { PlanilhaService } from './planilha.service';

describe('PlanilhaService', () => {
  let service: PlanilhaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlanilhaService],
    }).compile();

    service = module.get<PlanilhaService>(PlanilhaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
