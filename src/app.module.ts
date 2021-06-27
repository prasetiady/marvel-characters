import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CharactersModule } from './characters/characters.module';
import { ApiClientModule } from './api-client/api-client.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CharactersModule,
    ApiClientModule,
  ],
})
export class AppModule {}
