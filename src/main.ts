import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {config} from 'dotenv';
import {flush, start} from 'elastic-apm-node';
import {AppModule} from './app.module';

config();
if (process.env.ES_APM) {
  start({
    serverUrl: process.env.ES_APM,
    serviceName: 'Mealy',
  });
  setInterval(() => {
    flush();
  }, 1000);
}

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV !== 'production') {
    const options = new DocumentBuilder()
      .setTitle('Mealy')
      .setDescription('API of Mealy')
      .setVersion(process.env.npm_package_version || '1.0')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(process.env.PORT || 3000, process.env.HOST);
};

bootstrap().then();
