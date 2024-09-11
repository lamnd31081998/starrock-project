import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Wisedu Log Service');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });
  app.enableCors({
    origin: [process.env.FE_APP_URL],
    methods: 'GET,POST',
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  if (process.env.APP_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('WisEdu')
      .setDescription('The WisEdu Log Service API description')
      .setVersion('1.0')
      .addServer(process.env.SWAGGER_API_URL || '')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.APP_PORT || 5002);
  logger.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
