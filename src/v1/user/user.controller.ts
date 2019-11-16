import {Controller, Get} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';

const name = 'V1 User';

@Controller(name.replace(' ', '/').toLowerCase())
@ApiUseTags(name)
export class UserController {
  @Get()
  public greet() {
    return 'Hello!';
  }
}
