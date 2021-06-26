import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { ApiClientService } from './api-client.service';

describe('ApiClientService', () => {
  const httpService = HttpService.prototype;
  const configService = ConfigService.prototype;
  const service: ApiClientService = new ApiClientService(
    httpService,
    configService,
  );

  it('should create http request with correct url', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of({ data: '' } as AxiosResponse<any>));
    jest.spyOn(configService, 'get').mockReturnValue('value');
    const path = '/v1/public/characters';
    const ts = 1;
    await service.get(path, {}, ts);
    expect(httpService.get).toBeCalledWith(
      'https://gateway.marvel.com:443/v1/public/characters',
      {
        params: {
          apikey: 'value',
          hash: '027e8e4da71b25fae41f7e49884b336b',
          ts: 1,
        },
      },
    );
  });
});
