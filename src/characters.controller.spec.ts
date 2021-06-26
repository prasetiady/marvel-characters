import { BadRequestException } from '@nestjs/common';
import { ApiClientService } from './api-client.service';
import { CharactersController } from './characters.controller';
import {
  Character,
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';

describe('CharactersController', () => {
  const apiClientService = ApiClientService.prototype;
  const controller = new CharactersController(apiClientService);

  const character: Character = {
    id: 1009407,
    name: 'Loki',
    description: '',
  };

  const characterData: CharacterDataWrapper = {
    data: { results: [character] },
  };

  beforeEach(async () => {
    jest
      .spyOn(apiClientService, 'get')
      .mockReturnValue(Promise.resolve(characterData));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw exception when characterId missing', async () => {
    const expectedError = new BadRequestException('missing characterId');
    await expect(controller.getCharacter({})).rejects.toThrow(expectedError);
  });

  it('should return CharacterResponse', async () => {
    const expectedResult: CharacterResponse = {
      id: character.id,
      name: character.name,
      description: character.description,
    };
    const result = await controller.getCharacter({ characterId: character.id });
    expect(result).toEqual(expectedResult);
  });
});
