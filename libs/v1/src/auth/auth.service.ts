import {DatabaseService} from '@app/database';
import {ForbiddenException, Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {JsonWebTokenError} from 'jsonwebtoken';
import {Collection} from 'mongodb';
import {Constants} from '../constants';
import {User} from '../types';
import {AuthDto} from './dto/auth.dto';
import {TokenKind, TokenPayload} from './interfaces/token-payload.interface';
import {TokenInterface} from './interfaces/token.interface';
import {JsonWebToken} from './json-web-token';

@Injectable()
export class AuthService {
  private readonly users: Collection<User>;
  @Inject(JsonWebToken)
  private readonly jwt: JsonWebToken;

  constructor(database: DatabaseService, constants: Constants) {
    this.users = database.collection(constants.collectionName.users);
  }

  public async auth(authData: AuthDto): Promise<TokenInterface> {
    const query = this.users.find({
      password: {
        $eq: Buffer.from(authData.password),
      },
      username: {
        $eq: authData.username,
      },
    });

    if (await query.count() !== 1) {
      throw new Error('Username or Password is not Right');
    }

    return this.signToken(await query.next());
  }

  public async refresh(refreshToken: string): Promise<TokenInterface> {
    let data: TokenPayload;
    try {
      data = this.jwt.verify(refreshToken, {
        subject: TokenKind.refresh,
      });
    } catch (e) {
      if (e instanceof JsonWebTokenError) {
        throw new ForbiddenException(`Token Error: ${e.message.toString()}`);
      } else {
        throw new InternalServerErrorException(e.message);
      }
    }

    const query = this.users.find({
      username: {
        $eq: data.id,
      },
    });

    if (!await query.hasNext()) {
      throw new Error('There isn\'t user');
    }

    return this.signToken(await query.next());
  }

  private signToken(user: User): TokenInterface {
    return {
      access: this.jwt.sign({
        id: user.username,
      }, {
        expiresIn: '1d',
        subject: TokenKind.access,
      }),
      refresh: this.jwt.sign({
        id: user.username,
      }, {
        expiresIn: '7d',
        subject: TokenKind.refresh,
      }),
    };
  }
}
