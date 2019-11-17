import {DatabaseModule} from '@app/database';
import {Module} from '@nestjs/common';
import {AuthController} from './auth/auth.controller';
import {AuthService} from './auth/auth.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';

@Module({
  controllers: [UserController, AuthController],
  imports: [DatabaseModule],
  providers: [UserService, AuthService],
})
export class V1Module {
}
