import {ConfigModule, ConfigService} from '@app/config';
import {Module} from '@nestjs/common';
import {DatabaseService} from './database.service';

@Module({
  exports: [DatabaseService],
  imports: [ConfigModule],
  providers: [{
    inject: [ConfigService],
    provide: DatabaseService,
    useFactory(config: ConfigService) {
      return new DatabaseService(config.mongodbURI).connect();
    },
  }],
})
export class DatabaseModule {
}
