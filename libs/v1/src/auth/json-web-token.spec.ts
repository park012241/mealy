import {Test, TestingModule} from '@nestjs/testing';
import {JsonWebToken} from './json-web-token';

describe('JsonWebToken', () => {
  let provider: JsonWebToken;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JsonWebToken],
    }).compile();

    provider = module.get<JsonWebToken>(JsonWebToken);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
