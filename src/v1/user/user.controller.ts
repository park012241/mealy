import {Controller, Get} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {UserService} from './user.service';

const name = 'V1 User';

@Controller(name.replace(' ', '/').toLowerCase())
@ApiUseTags(name)
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Get()
  public greet() {
    return this.userService.greet();
  }
}
