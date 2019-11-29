import { ConfigModule } from '@app/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [ConfigModule],
  providers: [AppService],
})
export class AppModule {
}
