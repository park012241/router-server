import { config, NodeEnv } from '@app/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (config.NODE_ENV === NodeEnv.development) {
    const options = new DocumentBuilder()
      .setTitle('Router APIs')
      .setDescription('SLoWMoTIoN Router API description')
      .setVersion(process.env.npm_package_version)
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(config.PORT, config.HOST);
}

bootstrap().then();
