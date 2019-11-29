import { MongoService } from '@app/mongo';
import { Injectable } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { Collection, FilterQuery } from 'mongodb';
import { User } from './class/user.class';
import { IUser } from './interface/user.interface';

@Injectable()
export class UserService {
  private readonly users: Collection<IUser>;

  constructor(database: MongoService) {
    this.users = database.collection('users');
  }

  public async getUser(query: FilterQuery<IUser>): Promise<User[]> {
    return this.users.find(query).map((i: IUser) => new User(i)).toArray();
  }

  public async initialize(): Promise<UserService> {
    if (!await this.users.find({
      username: {
        $eq: 'admin',
      },
    }).next()) {
      await this.users.insertOne({
        isAdmin: true,
        isDisabled: false,
        password: 'admin',
        username: 'admin',
      });
    }
    return this;
  }

  private async addUser(user: User): Promise<void> {
    await validateOrReject(user);
    await this.users.insertOne(user);
  }
}
