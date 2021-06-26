import { Injectable } from '@nestjs/common';
import { ApiClientService } from '../api-client/api-client.service';
import {
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';

const GET_CHARACTERS_LIMIT = 100;

@Injectable()
export class CharactersService {
  constructor(private readonly apiClientService: ApiClientService) {}

  async getCharacter(characterId: number): Promise<CharacterResponse> {
    const path = `/v1/public/characters/${characterId}`;
    const response = await this.apiClientService.get<CharacterDataWrapper>(
      path,
      {},
    );
    const character = response.data.results[0];

    return {
      id: character.id,
      name: character.name,
      description: character.description,
    } as CharacterResponse;
  }

  async getCharacters(): Promise<number[]> {
    const result: number[] = [];
    let offset = 0;
    let characterIds = await this.getCharacterIds(GET_CHARACTERS_LIMIT, offset);
    characterIds.forEach((characterId) => {
      result.push(characterId);
    });
    while (characterIds.length === GET_CHARACTERS_LIMIT) {
      offset += GET_CHARACTERS_LIMIT;
      characterIds = await this.getCharacterIds(GET_CHARACTERS_LIMIT, offset);
      characterIds.forEach((characterId) => {
        result.push(characterId);
      });
    }
    console.log(result.length);
    return result;
  }

  private async getCharacterIds(
    limit: number,
    offset: number,
  ): Promise<number[]> {
    const path = '/v1/public/characters';
    const response = await this.apiClientService.get<CharacterDataWrapper>(
      path,
      { limit, offset },
    );
    return response.data.results.map((result) => result.id);
  }
}
