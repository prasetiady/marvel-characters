import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiClientService } from './api-client.service';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration], isGlobal: true })],
  controllers: [AppController],
  providers: [AppService, ApiClientService],
})
export class AppModule {}
