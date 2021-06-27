import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { ApiClientModule } from './api-client/api-client.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    CharactersModule,
    ApiClientModule,
  ],
  providers: [AppService],
})
export class AppModule {}
