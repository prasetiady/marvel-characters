import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Marvel Characters')
    .setDescription(
      'Data provided by Marvel. © 2021 [Marvel](https://marvel.com)',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document);

  const configService = app.get('ConfigService');
  await app.listen(configService.get('port'));
}
bootstrap();
