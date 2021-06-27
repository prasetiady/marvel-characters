import { ApiClientService } from '../api-client/api-client.service';
import {
  Character,
  CharacterDataWrapper,
  CharacterResponse,
} from './characters.interface';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  const apiClientService = ApiClientService.prototype;
  const service = new CharactersService(apiClientService);

  const character: Character = {
    id: 1009407,
    name: 'Loki',
    description: '',
  };

  const characterData: CharacterDataWrapper = {
    data: {
      results: [character],
    },
  };

  const characterResponse: CharacterResponse = {
    id: character.id,
    name: character.name,
    description: character.description,
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  beforeEach(async () => {
    jest
      .spyOn(apiClientService, 'get')
      .mockReturnValue(Promise.resolve(characterData));
  });

  describe('getCharacter', () => {
    it('should convert CharacterDataWrapper into CharacterResponse', async () => {
      const result = await service.getCharacter(1);
      expect(result).toEqual(characterResponse);
    });
  });

  describe('getCharacters', () => {
    it('should convert CharacterDataWrapper into number[]', async () => {
      const result = await service.getCharacters();
      expect(result).toEqual([character.id]);
    });
  });
});
