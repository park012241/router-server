import { ConfigService } from '@app/config';
import { Injectable } from '@nestjs/common';
import { Collection, MongoClient } from 'mongodb';

@Injectable()
export class MongoService extends MongoClient {
  constructor(config: ConfigService) {
    super(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  public async connect(): Promise<MongoService> {
    await super.connect();
    return this;
  }

  public collection<T = any>(name: string): Collection<T> {
    return this.db().collection(name);
  }
}
