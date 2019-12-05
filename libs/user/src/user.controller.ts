import { Body, ClassSerializerInterceptor, Controller, Get, Inject, Put, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { User } from './class/user.class';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public getAllUsers(): Promise<User[]> {
    return this.userService.getUser({});
  }

  @Put()
  public addUser(@Body(new ValidationPipe()) user: User): Promise<void> {
    return this.userService.addUser(user);
  }
}
