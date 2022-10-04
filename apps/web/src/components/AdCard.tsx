import { GameController } from "phosphor-react";
import { AdInfo } from "./AdInfo";

interface Ad {
  id: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: string[];
}

interface Props {
  data: Ad;
}

export const AdCard = ({ data }: Props) => {
  return (
    <div className="bg-[#2A2634] rounded-lg p-5">
      <AdInfo label="Nome" value={data.name} />
      <AdInfo label="Tempo de jogo" value={`${data.yearsPlaying} ano(s)`} />
      <AdInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dias ● ${data.hourStart} - ${data.hourEnd}`}
      />
      <AdInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? "Sim" : "Não"}
        color={data.useVoiceChannel ? "text-emerald-500" : "text-red-500"}
      />

      <div className="mt-5">
        <button className="flex gap-2 items-center justify-center text-sm bg-[#8B5CF6] rounded w-full text-white h-9">
          <GameController size={20} />
          Conectar
        </button>
      </div>
    </div>
  );
};
