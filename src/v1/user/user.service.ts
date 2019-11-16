import {User} from '@app/v1';
import {Injectable} from '@nestjs/common';
import {Collection} from 'mongodb';
import {DatabaseService} from '../../database/database.service';

@Injectable()
export class UserService {
  private readonly users: Collection<User>;

  constructor(database: DatabaseService) {
    this.users = database.collection('users');
  }

  public greet() {
    return 'Hello!';
  }
}
