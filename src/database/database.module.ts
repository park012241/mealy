import {Module} from '@nestjs/common';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
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
