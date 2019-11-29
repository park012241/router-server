import { Controller, Inject } from '@nestjs/common';
import { JsonWebTokenService } from './json-web-token.service';

@Controller('json-web-token')
export class JsonWebTokenController {
  @Inject()
  private readonly jsonWebTokenService: JsonWebTokenService;
}
