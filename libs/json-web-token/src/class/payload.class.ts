import { Exclude } from 'class-transformer';
import { IPayload } from '../interface/payload.interface';

export class Payload implements IPayload {
  public isAdmin: boolean;

  @Exclude()
  public isDisabled: boolean;

  @Exclude()
  public password: string;

  public username: string;

  constructor(payload: IPayload) {
    Object.assign(this, payload);
  }
}
