import {ConfigService} from '@app/config';
import {Injectable} from '@nestjs/common';
import {sign, SignOptions, verify, VerifyOptions} from 'jsonwebtoken';
import {TokenPayload} from './interfaces/token-payload.interface';

@Injectable()
export class JsonWebToken {
  private readonly secret: Buffer;

  constructor(config: ConfigService) {
    this.secret = config.tokenSecret;
  }

  public sign(payload: TokenPayload, option?: SignOptions): string {
    return sign(payload, this.secret, Object.assign<SignOptions, SignOptions>({
      issuer: 'mealy',
    }, option));
  }

  public verify(token: string, option?: VerifyOptions): TokenPayload {
    return verify(token, this.secret, Object.assign<VerifyOptions, VerifyOptions>({
      issuer: 'mealy',
    }, option)) as unknown as TokenPayload;
  }
}
