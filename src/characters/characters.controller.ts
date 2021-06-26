import {
  BadRequestException,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiClientService } from 'src/api-client/api-client.service';
import {
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';
import { CharactersService } from './characters.service';

const ONE_DAY_IN_SECONDS = 86400;

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getCharacters() {
    const characterIds = [];
    return characterIds;
  }

  @Get(':characterId')
  @CacheTTL(ONE_DAY_IN_SECONDS)
  @UseInterceptors(CacheInterceptor)
  async getCharacter(@Param() params) {
    if (!params.characterId) {
      throw new BadRequestException('missing characterId');
    }
    return this.charactersService.getCharacter(params.characterId);
  }
}
