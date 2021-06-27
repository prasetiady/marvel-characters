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

  beforeEach(async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(of({ data: '' } as AxiosResponse<any>));
    jest.spyOn(configService, 'get').mockReturnValue('value');
  });

  it('should create http request with correct url', async () => {
    const path = '/v1/public/characters';
    const ts = 1;
    await service.get(path, {}, ts);
    const expectedUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const expectedOptions = expect.objectContaining({});
    expect(httpService.get).toBeCalledWith(expectedUrl, expectedOptions);
  });

  it('should create http request with correct params', async () => {
    const path = '/v1/public/characters';
    const ts = 1;
    const expectedUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const expectedOptions = {
      params: {
        apikey: 'value',
        hash: '027e8e4da71b25fae41f7e49884b336b',
        ts: 1,
      },
    };
    await service.get(path, {}, ts);
    expect(httpService.get).toBeCalledWith(expectedUrl, expectedOptions);
  });

  it('should include input params in request params', async () => {
    const path = '/v1/public/characters';
    const ts = 1;
    const inputParams = {
      limit: 100,
      offset: 0,
    };

    await service.get(path, inputParams, ts);

    const expectedUrl = 'https://gateway.marvel.com:443/v1/public/characters';
    const expectedOptions = {
      params: {
        apikey: 'value',
        hash: '027e8e4da71b25fae41f7e49884b336b',
        ts: 1,
        limit: inputParams.limit,
        offset: inputParams.offset,
      },
    };
    expect(httpService.get).toBeCalledWith(expectedUrl, expectedOptions);
  });
});
