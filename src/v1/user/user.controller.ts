import {Body, Controller, Get, Post, ValidationPipe} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserDto} from './dto/user.dto';
import {UserService} from './user.service';

const name = 'V1 User';

@Controller(name.replace(' ', '/').toLowerCase())
@ApiUseTags(name)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  public async greet() {
    return this.userService.greet();
  }

  @Post()
  public async addUser(@Body(new ValidationPipe()) body: UserDto) {
    return this.userService.newUser(body);
  }
}
