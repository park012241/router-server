import { MongoService } from '@app/mongo';
import { SshService } from '@app/ssh';
import { Inject, Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { PortForwardRule } from './port-forward-rule.class';

@Injectable()
export class RouterService {
  @Inject()
  private readonly sshService: SshService;
  private readonly portForwardRules: Collection<PortForwardRule>;

  constructor(database: MongoService) {
    this.portForwardRules = database.collection('port-forward-rules');
  }

  public async ping(): Promise<string> {
    return (await this.sshService.execute('echo pong')).stdout?.toString().trim();
  }

  public async iptables(): Promise<string> {
    return (await this.sshService.execute('iptables -nL')).stdout?.toString().trim();
  }
}
