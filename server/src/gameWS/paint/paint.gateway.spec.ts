import { Test, TestingModule } from '@nestjs/testing';
import { PaintGateway } from './paint.gateway';

describe('PaintGateway', () => {
  let gateway: PaintGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaintGateway],
    }).compile();

    gateway = module.get<PaintGateway>(PaintGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
