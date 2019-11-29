import { ConfigModule } from '@app/config';
import { Test, TestingModule } from '@nestjs/testing';
import { JsonWebTokenService } from './json-web-token.service';

describe('JsonWebTokenService', () => {
  let service: JsonWebTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [JsonWebTokenService],
    }).compile();

    service = module.get<JsonWebTokenService>(JsonWebTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
