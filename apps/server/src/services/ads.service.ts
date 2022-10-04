import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateAdDTO } from 'src/dto/ads/createAdDTO';
import { convertHoursToMinutes } from 'src/utils/convert-houer-to-minutes';
import { convertMinutesToHours } from 'src/utils/convert-minutes-to-hours';

@Injectable()
export class AdsService {
  constructor(private prismaService: PrismaService) {}

  async listAdsByGame(gameId: string) {
    const ads = await this.prismaService.ad.findMany({
      where: {
        gameId: gameId,
      },
      select: {
        id: true,
        name: true,
        yearsPlaying: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true,
        weekDays: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return ads.map((ad) => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHours(ad.hourStart),
      hourEnd: convertMinutesToHours(ad.hourEnd),
    }));
  }

  async getDiscordByAd(adId: string) {
    return this.prismaService.ad.findUniqueOrThrow({
      where: {
        id: adId,
      },
      select: {
        discord: true,
      },
    });
  }

  async createAd(gameId: string, adDto: CreateAdDTO) {
    const data = {
      ...adDto,
      weekDays: adDto.weekDays.join(','),
      hourStart: convertHoursToMinutes(adDto.hourStart),
      hourEnd: convertHoursToMinutes(adDto.hourEnd),
    };

    const ad = await this.prismaService.ad.create({
      data: {
        ...data,
        gameId,
      },
    });

    return ad;
  }
}
