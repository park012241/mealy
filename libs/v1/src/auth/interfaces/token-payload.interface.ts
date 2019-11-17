export enum TokenKind {
  access = 'access',
  refresh = 'refresh',
}

export interface TokenPayload {
  id: string;
  kind: TokenKind;
}
