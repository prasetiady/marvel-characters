import { Injectable } from '@nestjs/common';
import { ApiClientService } from 'src/api-client/api-client.service';
import {
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';

@Injectable()
export class CharactersService {
  constructor(private readonly apiClientService: ApiClientService) {}

  async getCharacter(characterId: number): Promise<CharacterResponse> {
    const path = `/v1/public/characters/${characterId}`;
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
