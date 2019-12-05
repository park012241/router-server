import { Injectable } from '@nestjs/common';
import { IsEnum, IsNumberString, IsString, Matches, validateSync, ValidationError } from 'class-validator';
import { config as env } from 'dotenv';

export type Config = Record<string, string>;

export enum NodeEnv {
  development = 'development',
  production = 'production',
  testing = 'test',
}

@Injectable()
export class ConfigService {
  @IsString()
  @Matches(/^mongodb:\/\/.+(:[0-9]+)?\/.+$/)
  public readonly MONGODB_URI: string;

  @IsEnum(NodeEnv)
  public readonly NODE_ENV: NodeEnv;

  @IsNumberString()
  public readonly PORT: string;

  @IsString()
  public readonly HOST: string;

  @IsString()
  public readonly JWT_SECRET: string;

  @IsString()
  public readonly SSH_HOST: string;

  @IsNumberString()
  public readonly SSH_PORT: string;

  @IsString()
  public readonly SSH_USER: string;

  @IsString()
  public readonly SSH_PASS: string;

  constructor(customConf?: Config) {
    env();
    Object.assign(this, {
      ...{
        HOST: '0.0.0.0',
        JWT_SECRET: 'SLoWMoTIoN',
        NODE_ENV: NodeEnv.development,
        PORT: '3000',
      },
      ...process.env,
      ...customConf,
    });
    const validateResult: ValidationError[] = validateSync(this);
    if (validateResult.length > 0) {
      throw new Error(validateResult[0].toString());
    }
  }
}

export const config = new ConfigService();
