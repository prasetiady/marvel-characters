import { HttpService, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class ApiClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly host = 'https://gateway.marvel.com:443';

  async get<R>(path: string, ts: number = Date.now()): Promise<R> {
    const publicKey = this.configService.get('marvelAPI.publicKey');
    const privateKey = this.configService.get('marvelAPI.privateKey');
    const hash = createHash('md5')
      .update(`${ts}${privateKey}${publicKey}`)
      .digest('hex');
    const url = `${this.host}${path}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
    const response = await this.httpService.get<R>(url).toPromise();
    return response.data;
  }
}