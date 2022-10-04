import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

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
    return this.prismaService.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        ads: true,
      },
    });
  }
}
