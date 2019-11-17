import {Test, TestingModule} from '@nestjs/testing';
import {Constants} from './constants';

describe('Constants', () => {
  let provider: Constants;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Constants],
    }).compile();

    provider = module.get<Constants>(Constants);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
