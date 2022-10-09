import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { convertMinutesToHours } from 'src/utils/convert-minutes-to-hours';

@Injectable()
export class GamesService {
  constructor(private prismaService: PrismaService) {}

  async listGames() {
    return this.prismaService.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        },
      },
    });
  }

  async getGameById(gameId: string) {
    const game = await this.prismaService.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        ads: true,
      },
    });

    return {
      ...game,
      ads: game.ads.map((ad) => ({
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHours(ad.hourStart),
        hourEnd: convertMinutesToHours(ad.hourEnd),
      })),
    };
  }
}
