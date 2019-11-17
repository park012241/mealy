import {ApiModelProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class UserDto {
  @IsString()
  @ApiModelProperty({
    description: 'Login User ID, Unique',
    example: 'park012241',
  })
  public username: string;
  @IsString()
  @ApiModelProperty({
    description: 'User Login Password',
    example: 'P@ssw0rd',
  })
  public password: string;
  @IsString()
  @ApiModelProperty({
    description: 'Pre-shared Unique User Pass-code',
    example: 'SLoWMoTIoN',
  })
  public passCode: string;
}
