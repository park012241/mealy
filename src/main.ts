import {NestFactory} from '@nestjs/core';
import {start} from 'elastic-apm-node';
import {AppModule} from './app.module';

if (process.env.ES_APM) {
  start({
    serverUrl: process.env.ES_APM,
  });
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000, process.env.HOST);
};

bootstrap().then();
