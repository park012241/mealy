import {Injectable} from '@nestjs/common';
import {randomBytes} from 'crypto';
import {config} from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly env: Record<string, string> = {};

  constructor() {
    config();
    Object.assign(this.env, process.env);
  }

  public get mongodbURI(): string {
    if (!this.env.MONGODB_URI) {
      throw new Error('Couldn\'t find MongoDB URI Value');
    }
    return this.env.MONGODB_URI;
  }

  public get elasticSearchAPM(): string | undefined {
    return this.env.ES_APM;
  }

  public get tokenSecret(): Buffer {
    if (!this.env.JWT_SECRET) {
      this.env.JWT_SECRET = randomBytes(64).toString();
    }
    return Buffer.from(this.env.JWT_SECRET);
  }
}
