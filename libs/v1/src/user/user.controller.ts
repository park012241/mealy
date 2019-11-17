import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {UserDto} from './dto/user.dto';
import {UserService} from './user.service';

const name = 'V1 User';

@Controller(name.replace(' ', '/').toLowerCase())
@ApiUseTags(name)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post()
  @ApiOperation({
    title: 'Sign Up',
  })
  public async addUser(@Body(new ValidationPipe()) body: UserDto) {
    return this.userService.newUser(body);
  }
}
