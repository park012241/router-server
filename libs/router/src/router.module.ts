import { MongoModule } from '@app/mongo';
import { SshModule } from '@app/ssh';
import { Module } from '@nestjs/common';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';

@Module({
  controllers: [RouterController],
  exports: [RouterService],
  imports: [SshModule, MongoModule],
  providers: [RouterService],
})
export class RouterModule {
}
