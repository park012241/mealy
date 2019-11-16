import {Module} from '@nestjs/common';
import {DatabaseModule} from '../database/database.module';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [UserService],
})
export class V1Module {
}
