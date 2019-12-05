import { RouterModule } from '@app/router';
import { UserModule } from '@app/user';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [AppController],
  imports: [RouterModule, UserModule],
  providers: [AppService],
})
export class AppModule {
}
