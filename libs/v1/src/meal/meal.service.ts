import {DatabaseService} from '@app/database';
import {Inject, Injectable} from '@nestjs/common';
import {Collection} from 'mongodb';
import {JsonWebToken} from '../auth/json-web-token';
import {Meal} from '../types';
import {UserService} from '../user/user.service';

@Injectable()
export class MealService {
  private readonly meals: Collection<Meal>;

  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(JsonWebToken)
  private readonly jwt: JsonWebToken;

  constructor(database: DatabaseService) {
    this.meals = database.collection('meals');
    this.meals.createIndexes([{
      key: {
        date: 1,
      },
      name: 'date',
    }, {
      key: {
        time: 1,
      },
      name: 'time',
    }]).then();
  }
}
