import {DatabaseService} from '@app/database';
import {Inject, Injectable} from '@nestjs/common';
import {Collection} from 'mongodb';
import {Constants} from '../constants';
import {User} from '../types';
import {AuthDto} from './dto/auth.dto';
import {TokenKind} from './interfaces/token-payload.interface';
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

  private signToken(user: User): TokenInterface {
    return {
      access: this.jwt.sign({
        id: user.username,
        kind: TokenKind.access,
      }, {
        expiresIn: '1d',
      }),
      refresh: this.jwt.sign({
        id: user.username,
        kind: TokenKind.refresh,
      }, {
        expiresIn: '7d',
      }),
    };
  }

  public async refresh(refreshToken: string): Promise<TokenInterface> {
    const data = this.jwt.verify(refreshToken);
    if (data.kind !== TokenKind.refresh) {
      throw new Error('This is not refresh token');
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
}
