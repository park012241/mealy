import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule} from './config/config.module';
import {DatabaseModule} from './database/database.module';
import {V1Module} from './v1/v1.module';

@Module({
  controllers: [AppController],
  imports: [ConfigModule, DatabaseModule, V1Module],
  providers: [AppService],
})
export class AppModule {
}
