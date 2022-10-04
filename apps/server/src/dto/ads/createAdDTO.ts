import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

export class CreateAdDTO {
  @IsString()
  name: string;

  @IsInt()
  yearsPlaying: number;

  @IsString()
  discord: string;

  @IsArray()
  weekDays: string[];

  @IsString()
  hourStart: string;

  @IsString()
  hourEnd: string;

  @IsBoolean()
  useVoiceChannel: boolean;
}
