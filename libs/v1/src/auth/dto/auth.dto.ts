import {ApiModelProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class AuthDto {
  @IsString()
  @ApiModelProperty({
    description: 'Username',
    example: 'park012241',
  })
  public username: string;
  @IsString()
  @ApiModelProperty({
    description: 'Password',
    example: 'P@ssw0rd',
  })
  public password: string;
}
