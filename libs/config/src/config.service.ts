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

  constructor(customConf?: Config) {
    env();
    Object.assign(this, {
      ...process.env,
      ...customConf,
    });
    Object.assign(this, {
      HOST: this.HOST || '0.0.0.0',
      NODE_ENV: this.NODE_ENV || NodeEnv.development,
      PORT: this.PORT || '3000',
    });
    const validateResult: ValidationError[] = validateSync(this);
    if (validateResult.length > 0) {
      throw new Error(validateResult[0].toString());
    }
  }
}

export const config = new ConfigService();
