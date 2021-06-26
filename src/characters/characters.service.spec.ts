import { ApiClientService } from '../api-client/api-client.service';
import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  const apiClientService = ApiClientService.prototype;
  const service = new CharactersService(apiClientService);

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
