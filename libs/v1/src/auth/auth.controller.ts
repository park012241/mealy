import {Body, Controller, Post, ValidationPipe} from '@nestjs/common';
import {ApiUseTags} from '@nestjs/swagger';
import {AuthService} from './auth.service';
import {AuthDto} from './dto/auth.dto';
import {RefreshDto} from './dto/refresh.dto';
import {TokenInterface} from './interfaces/token.interface';

const name = 'V1 Auth';

@Controller(name.replace(' ', '/').toLowerCase())
@ApiUseTags(name)
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  public auth(@Body(new ValidationPipe()) authData: AuthDto): Promise<TokenInterface> {
    return this.authService.auth(authData);
  }

  @Post('refresh')
  public refresh(@Body(new ValidationPipe()) {refreshToken}: RefreshDto) {
    return this.authService.refresh(refreshToken);
  }
}
