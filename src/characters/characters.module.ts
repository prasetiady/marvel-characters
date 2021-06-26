import { CacheModule, Module } from '@nestjs/common';
import { ApiClientModule } from 'src/api-client/api-client.module';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

@Module({
  imports: [ApiClientModule, CacheModule.register()],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
