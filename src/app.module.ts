import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiClientService } from './api-client.service';
import { CharactersController } from './characters.controller';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    HttpModule,
  ],
  controllers: [AppController, CharactersController],
  providers: [AppService, ApiClientService],
})
export class AppModule {}
