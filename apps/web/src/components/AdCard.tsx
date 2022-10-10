import { motion } from "framer-motion";
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
  onConnect?: (adId: string) => void;
  delay?: number;
}

export const AdCard = ({ data, onConnect = () => {}, delay = 0.1 }: Props) => {
  return (
    <div className="keen-slider__slide">
      <motion.div
        className="bg-zinc-800/50 rounded-lg p-5 backdrop-blur-sm"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
      >
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
      </motion.div>
    </div>
  );
};
