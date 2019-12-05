import { ConfigService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { Client, ConnectConfig } from 'ssh2';

export interface IExecResult {
  stdout?: Buffer;
  stderr?: Buffer;

  signal: number;
  exitCode: number;
}

@Injectable()
export class SshService {
  private readonly client: Client;
  private readonly sshConfig: ConnectConfig;
  private readonly isRoot: boolean;
  private newLine = Buffer.from('\n');

  constructor(private readonly config: ConfigService) {
    this.client = new Client();
    this.sshConfig = {
      host: config.SSH_HOST,
      password: config.SSH_PASS,
      port: parseInt(config.SSH_PORT, 10),
      username: config.SSH_USER,
    };
    this.isRoot = config.SSH_USER === 'root';
  }

  public execute(command: string): Promise<IExecResult> {
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.exec(`${!this.isRoot && 'sudo '}${command}`, (err, stream) => {
          const result: IExecResult = {
            exitCode: 0,
            signal: 0,
            stderr: Buffer.from([]),
            stdout: Buffer.from([]),
          };

          if (err) {
            reject(err);
          }
          stream.on('close', (code, signal) => {
            result.exitCode = code;
            result.signal = signal;
            if (result.stderr.length > 0) {
              reject(new Error(result.stderr.toString()));
            }
            resolve(result);
          }).on('data', (data) => {
            result.stdout = Buffer.concat([result.stdout, this.newLine, data]);
          }).stderr.on('data', (data) => {
            result.stderr = Buffer.concat([result.stderr, this.newLine, data]);
          });
        });
      }).connect(this.sshConfig);
    });
  }
}
