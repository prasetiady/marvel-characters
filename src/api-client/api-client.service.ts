import {
  HttpException,
  HttpService,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class ApiClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly host = 'https://gateway.marvel.com:443';

  async get<R>(
    path: string,
    params: Record<string, any>,
    ts: number = Date.now(),
  ): Promise<R> {
    const publicKey = this.configService.get('marvelAPI.publicKey');
    const privateKey = this.configService.get('marvelAPI.privateKey');
    const hash = createHash('md5')
      .update(`${ts}${privateKey}${publicKey}`)
      .digest('hex');
    params.ts = ts;
    params.apikey = publicKey;
    params.hash = hash;
    const url = `${this.host}${path}`;
    return this.httpService
      .get<R>(url, { params })
      .toPromise()
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        const response = error.response;
        if (response && response.data) {
          throw new HttpException(response.data.status, response.data.code);
        } else {
          throw new InternalServerErrorException();
        }
      });
  }
}
