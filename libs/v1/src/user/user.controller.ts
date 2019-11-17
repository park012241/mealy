import {Body, Controller, Patch, Post, ValidationPipe} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import {ChangePasswordDto} from './dto/change-password.dto';
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

  @Patch()
  @ApiOperation({
    title: 'Update Password',
  })
  public async changePassword(@Body(new ValidationPipe()) body: ChangePasswordDto) {
    return this.userService.changePassword(body);
  }
}
