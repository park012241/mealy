import {ApiModelProperty} from '@nestjs/swagger';
import {IsJWT} from 'class-validator';
import {sign} from 'jsonwebtoken';
import {TokenKind} from '../interfaces/token-payload.interface';

export class RefreshDto {
  @IsJWT()
  @ApiModelProperty({
    description: 'User\'s Refresh Token',
    example: sign({
      id: 'park012241',
      kind: TokenKind.refresh,
    }, Buffer.from('SLoWMoTIoN'), {
      expiresIn: '7d',
    }),
  })
  public refreshToken: string;
}
