import {ConfigModule} from '@app/config';
import {DatabaseModule} from '@app/database';
import {V1Module} from '@app/v1';
import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
  controllers: [AppController],
  imports: [ConfigModule, DatabaseModule, V1Module],
  providers: [AppService],
})
export class AppModule {
}
