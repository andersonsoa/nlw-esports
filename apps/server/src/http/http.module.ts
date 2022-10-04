import { Module } from '@nestjs/common';
import { AdsService } from 'src/services/ads.service';
import { GamesService } from 'src/services/games.service';
import { HttpController } from './http.controller';

@Module({
  imports: [],
  controllers: [HttpController],
  providers: [AdsService, GamesService],
})
export class HttpModule {}
