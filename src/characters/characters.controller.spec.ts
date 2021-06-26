import { BadRequestException } from '@nestjs/common';
import { CharactersController } from './characters.controller';
import { Character, CharacterResponse } from './characters.interface';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  const characterService = CharactersService.prototype;
  const controller = new CharactersController(characterService);

  const character: Character = {
    id: 1009407,
    name: 'Loki',
    description: '',
  };

  const characterResponse: CharacterResponse = {
    id: character.id,
    name: character.name,
    description: character.description,
  };

  beforeEach(async () => {
    jest
      .spyOn(characterService, 'getCharacter')
      .mockReturnValue(Promise.resolve(characterResponse));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should throw exception when characterId missing', async () => {
    const expectedError = new BadRequestException('missing characterId');
    await expect(controller.getCharacter({})).rejects.toThrow(expectedError);
  });

  it('should return CharacterResponse', async () => {
    const result = await controller.getCharacter({ characterId: character.id });
    expect(result).toEqual(characterResponse);
  });
});
