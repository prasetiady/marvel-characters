import {
  BadRequestException,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import {
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';

const ONE_DAY_IN_SECONDS = 86400;

@Controller('characters')
export class CharactersController {
  constructor(private readonly apiClientService: ApiClientService) {}

  @Get(':characterId')
  @CacheTTL(ONE_DAY_IN_SECONDS)
  @UseInterceptors(CacheInterceptor)
  async getCharacter(@Param() params) {
    if (!params.characterId) {
      throw new BadRequestException('missing characterId');
    }

    const path = `/v1/public/characters/${params.characterId}`;
    const response = await this.apiClientService.get<CharacterDataWrapper>(
      path,
    );
    const character = response.data.results[0];

    return {
      id: character.id,
      name: character.name,
      description: character.description,
    } as CharacterResponse;
  }
}
