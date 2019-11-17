import {ApiModelProperty} from '@nestjs/swagger';
import {IsJWT, IsString} from 'class-validator';
import {sign} from 'jsonwebtoken';
import {TokenKind} from '../../auth/interfaces/token-payload.interface';

export class ChangePasswordDto {
  @IsJWT()
  @ApiModelProperty({
    description: 'Access Token',
    example: sign({
      id: 'park012241',
    }, Buffer.from('SLoWMoTIoN'), {
      expiresIn: '1d',
      issuer: 'mealy',
      subject: TokenKind.access,
    }),
  })
  public token: string;
  @IsString()
  @ApiModelProperty({
    description: 'New Password',
    example: 'P@ssw0rd',
  })
  public password: string;
}
