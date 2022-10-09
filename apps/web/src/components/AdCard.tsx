import { GameController } from "phosphor-react";
import { useState } from "react";
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
  onConnect?: (adId: string) => void;
}

export const AdCard = ({ data, onConnect = () => {} }: Props) => {
  const [isDicordModalOpen, setIsDiscordModalOpen] = useState(false);
  return (
    <>
      <div className="bg-zinc-800/50 rounded-lg p-5 backdrop-blur-sm keen-slider__slide">
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
          <button
            className="flex gap-2 items-center justify-center text-sm bg-[#8B5CF6] rounded w-full text-white h-9"
            onClick={() => onConnect(data.id)}
          >
            <GameController size={20} />
            Conectar
          </button>
        </div>
      </div>
    </>
  );
};
