import {Exclude, Transform} from 'class-transformer';
import {ObjectId} from 'mongodb';

export class User {
  public name: string;
  public studentNumber: string;
  public username: string;
  @Transform((id: string) => `${id}`)
  public image?: ObjectId;
  @Exclude()
  public password: Buffer;

  @Exclude()
  public passCode: string;
}
