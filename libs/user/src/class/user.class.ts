import { IsBoolean, IsString } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class User implements IUser {
  @IsBoolean()
  public isAdmin: boolean;

  @IsString()
  public isDisabled: boolean;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  constructor(user: IUser) {
    Object.assign(this, user);
  }
}
