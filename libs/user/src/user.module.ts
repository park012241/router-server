import { MongoModule, MongoService } from '@app/mongo';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [MongoModule],
  providers: [{
    inject: [MongoService],
    provide: UserService,
    useFactory(database: MongoService) {
      return new UserService(database).initialize();
    },
  }],
})
export class UserModule {
}
