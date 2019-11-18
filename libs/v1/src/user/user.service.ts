import {DatabaseService} from '@app/database';
import {ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {JsonWebTokenError} from 'jsonwebtoken';
import {Collection, GridFSBucket} from 'mongodb';
import {TokenKind, TokenPayload} from '../auth/interfaces/token-payload.interface';
import {JsonWebToken} from '../auth/json-web-token';
import {Constants} from '../constants';
import {User} from '../types';
import {ChangePasswordDto} from './dto/change-password.dto';
import {UserDto} from './dto/user.dto';
import {PassCodeInterface} from './interfaces/pass-code.interface';

@Injectable()
export class UserService {
  @Inject(JsonWebToken)
  private readonly jwt: JsonWebToken;
  private readonly passCodes: Collection<PassCodeInterface>;
  private readonly users: Collection<User>;
  private readonly userProfileImages: GridFSBucket;

  constructor(database: DatabaseService, constants: Constants) {
    this.passCodes = database.collection(constants.collectionName.passCode);
    this.users = database.collection(constants.collectionName.users);
    this.userProfileImages = database.gridFS(constants.collectionName.userProfileImages);

    this.users.createIndex('username' as keyof PassCodeInterface, {
      unique: true,
    }).then();
    this.passCodes.createIndex('passCode' as keyof PassCodeInterface, {
      unique: true,
    }).then();
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

    await this.passCodes.deleteOne({
      passCode: {
        $eq: user.passCode,
      },
    });
  }

  public async changePassword({password, token}: ChangePasswordDto): Promise<void> {
    let data: TokenPayload;
    try {
      data = this.jwt.verify(token, {
        subject: TokenKind.access,
      });
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new ForbiddenException(e.message.toString());
      } else {
        throw new InternalServerErrorException(e.message.toString());
      }
    }

    if (!await this.users.find({
      username: data.id,
    }).hasNext()) {
      throw new NotFoundException('Couldn\'t find User');
    }

    await this.users.updateOne({
      username: {
        $eq: data.id,
      },
    }, {
      $set: {
        password: Buffer.from(password),
      },
    });
  }

  public getUser(user: string): Promise<User> {
    return this.users.find({
      username: {
        $eq: /.+\..+\..+/.test(user) ? this.jwt.verify(user, {
          subject: TokenKind.access,
        }).id : user,
      },
    }).next();
  }
}
