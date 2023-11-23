import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import * as hbs from 'express-handlebars'
import { join } from 'path'
import { CustomHelper } from './helpers/hbs';
import * as cookieParser from 'cookie-parser';
import { urlencoded, json } from 'express'
import * as express from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io'
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );

  app.enableCors()

  app.useStaticAssets(join(__dirname, '..', '..', 'uploads'), { prefix: `/images/` })
  app.useStaticAssets(join(__dirname, '..', '..', 'public'), { prefix: '/public/' })
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'))

  app.use(cookieParser());

  app.engine('hbs', hbs({
    defaultLayout: `main`,
    extname: `hbs`,
    helpers: CustomHelper
  }))

  const corsOptions = {
    origin: ['http://localhost:3001', 'https://example.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  app.setViewEngine('hbs')
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  //app.use(cors(corsOptions))

  app.useWebSocketAdapter(new IoAdapter(app))

  await app.listen(3000);
}
bootstrap();
