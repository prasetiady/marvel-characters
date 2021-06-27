import {
  BadRequestException,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CharacterResponse } from './characters.interface';
import { CharactersService } from './characters.service';

const ONE_DAY_IN_SECONDS = 86400;

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @CacheTTL(ONE_DAY_IN_SECONDS)
  @UseInterceptors(CacheInterceptor)
  async getCharacters(): Promise<number[]> {
    return this.charactersService.getCharacters();
  }

  @Get(':characterId')
  @CacheTTL(ONE_DAY_IN_SECONDS)
  @UseInterceptors(CacheInterceptor)
  async getCharacter(
    @Param('characterId') characterId: number,
  ): Promise<CharacterResponse> {
    if (!characterId) {
      throw new BadRequestException('missing characterId');
    }
    return this.charactersService.getCharacter(characterId);
  }
}
