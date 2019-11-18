import {ConfigModule} from '@app/config';
import {DatabaseModule} from '@app/database';
import {Module} from '@nestjs/common';
import {AuthController} from './auth/auth.controller';
import {AuthService} from './auth/auth.service';
import {JsonWebToken} from './auth/json-web-token';
import {Constants} from './constants';
import {MealController} from './meal/meal.controller';
import {MealService} from './meal/meal.service';
import {UserController} from './user/user.controller';
import {UserService} from './user/user.service';

@Module({
  controllers: [UserController, AuthController, MealController],
  imports: [DatabaseModule, ConfigModule],
  providers: [UserService, AuthService, Constants, JsonWebToken, MealService],
})
export class V1Module {
}
