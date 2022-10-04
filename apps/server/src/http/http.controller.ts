import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateAdDTO } from 'src/dto/ads/createAdDTO';
import { AdsService } from 'src/services/ads.service';
import { GamesService } from 'src/services/games.service';

@Controller()
export class HttpController {
  constructor(
    private adsService: AdsService,
    private gameService: GamesService,
  ) {}

  @Get('games')
  async listGames() {
    return this.gameService.listGames();
  }

  @Get('game/:gameId')
  getGameById(@Param('gameId') gameId: string) {
    return this.gameService.getGameById(gameId);
  }

  @Get('game/:gameId/ads')
  listAdsByGame(@Param('gameId') gameId: string) {
    return this.adsService.listAdsByGame(gameId);
  }

  @Post('game/:gameId/ads')
  createAds(@Param('gameId') gameId: string, @Body() ad: CreateAdDTO) {
    return this.adsService.createAd(gameId, ad);
  }

  @Get('ads/:id/discord')
  getDiscordByAd(@Param('id') id: string) {
    return this.adsService.getDiscordByAd(id);
  }
}
