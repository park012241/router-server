import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';
import { IUser } from '..';

export class User implements IUser {
  @Exclude()
  // tslint:disable-next-line:variable-name
  public _id?: ObjectId;

  @IsBoolean()
  @ApiModelProperty({
    description: 'admin 여부',
    example: true,
  })
  public isAdmin: boolean;

  @IsBoolean()
  @ApiModelProperty({
    description: '비활성 여부',
    example: false,
  })
  public isDisabled: boolean;

  @IsString()
  @ApiModelProperty({
    description: '비밀번호',
    example: 'P@ssw0rd',
  })
  public password: string;

  @IsString()
  @ApiModelProperty({
    description: '사용자 이름',
    example: 'park012241',
  })
  public username: string;

  constructor(user: IUser) {
    Object.assign(this, user);
  }
}
