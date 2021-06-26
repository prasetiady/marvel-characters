import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiClientService } from './api-client.service';

describe('ApiClientService', () => {
  const httpService = HttpService.prototype;
  const configService = ConfigService.prototype;
  const service: ApiClientService = new ApiClientService(
    httpService,
    configService,
  );

  it('should create http request with correct url', () => {
    jest.spyOn(httpService, 'get').mockImplementation();
    jest.spyOn(configService, 'get').mockReturnValue('value');
    const path = '/v1/public/characters';
    const ts = 1;
    service.get(path, ts);
    const expectedUrl =
      'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=value&hash=027e8e4da71b25fae41f7e49884b336b';
    expect(httpService.get).toBeCalledWith(expectedUrl);
  });
});
