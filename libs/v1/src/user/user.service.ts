import {DatabaseService} from '@app/database';
import {Injectable} from '@nestjs/common';
import {Collection, GridFSBucket} from 'mongodb';
import {User} from '../types/user';
import {UserDto} from './dto/user.dto';
import {PassCodeInterface} from './interfaces/pass-code.interface';

@Injectable()
export class UserService {
  private readonly passCodes: Collection<PassCodeInterface>;
  private readonly users: Collection<User>;
  private readonly userProfileImages: GridFSBucket;

  constructor(database: DatabaseService) {
    this.passCodes = database.collection('pass-codes');
    this.users = database.collection('users');
    this.userProfileImages = database.gridFS('user-profiles');

    this.users.createIndex('username' as keyof PassCodeInterface, {
      unique: true,
    }).then();
  }

  public greet() {
    return 'Hello!';
  }

  public async newUser(user: UserDto): Promise<void> {
    if (await this.passCodes.find({
      passCode: {
        $eq: user.passCode,
      },
    }).count() !== 1) {
      throw new Error('PassCode mismatch');
    }

    const pc = this.passCodes.find({
      passCode: {
        $eq: user.passCode,
      },
    });

    await this.users.insertOne(Object.assign(user, {
      password: Buffer.from(user.password),
    }, await pc.next()));

    await pc.destroy();
  }
}
