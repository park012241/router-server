import { Test, TestingModule } from '@nestjs/testing';
import { config, ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: ConfigService,
        useValue: config,
      }],
    }).compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validating', () => {
    it('should use default when NODE_ENV is falsy value', () => {
      expect(new ConfigService({
        NODE_ENV: null,
      })).toBeInstanceOf(ConfigService);
    });

    it('should use default when NODE_ENV is not in NodeEnv enum', () => {
      expect(() => {
        return new ConfigService({
          NODE_ENV: 'null',
        });
      }).toThrow();
    });
  });
});
