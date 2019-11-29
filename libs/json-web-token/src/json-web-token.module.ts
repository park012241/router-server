import { ConfigModule } from '@app/config';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { JsonWebTokenController } from './json-web-token.controller';
import { JsonWebTokenService } from './json-web-token.service';

@Module({
  controllers: [JsonWebTokenController],
  exports: [JsonWebTokenService],
  imports: [ConfigModule, UserModule],
  providers: [JsonWebTokenService],
})
export class JsonWebTokenModule {
}
