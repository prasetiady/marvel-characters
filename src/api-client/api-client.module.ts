import { HttpModule, Module } from '@nestjs/common';
import { ApiClientService } from './api-client.service';

@Module({
  imports: [HttpModule],
  providers: [ApiClientService],
  exports: [ApiClientService],
})
export class ApiClientModule {}
