import { ConfigService } from '@app/config';
import { User, UserService } from '@app/user';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { sign, verify } from 'jsonwebtoken';
import { Payload } from './class/payload.class';
import { IPayload } from './interface/payload.interface';

@Injectable()
export class JsonWebTokenService {
  private readonly issuer: string = 'SLoWMoTIoN Router';
  private readonly secret: Buffer;

  @Inject()
  private readonly userService: UserService;

  constructor(config: ConfigService) {
    this.secret = Buffer.from(config.JWT_SECRET);
  }

  public sign(payload: IPayload): string {
    return sign(classToPlain(new Payload(payload)), this.secret, {
      expiresIn: '1w',
      issuer: this.issuer,
    });
  }

  public async auth(token: string): Promise<User> {
    const user = await this.userService.getUser({
      username: {
        $eq: this.verify(token).username,
      },
    });
    if (!user[0]) {
      throw new NotFoundException('User Not Found');
    }
    return new User(user[0]);
  }

  private verify(token: string): IPayload {
    return verify(token, this.secret, {
      issuer: this.issuer,
    }) as unknown as IPayload;
  }
}
