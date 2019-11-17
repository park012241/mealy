import {Injectable} from '@nestjs/common';

@Injectable()
export class Constants {
  public readonly collectionName = {
    passCode: 'pass-codes',
    userProfileImages: 'user-profiles',
    users: 'users',
  };
}
