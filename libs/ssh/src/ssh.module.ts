import { ConfigModule } from '@app/config';
import { Module } from '@nestjs/common';
import { SshService } from './ssh.service';

@Module({
  exports: [SshService],
  imports: [ConfigModule],
  providers: [SshService],
})
export class SshModule {
}
