import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GameCardProps {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
  delay?: number;
}

export const GameCard = ({
  id,
  bannerUrl,
  title,
  adsCount,
  delay = 0.1,
}: GameCardProps) => {
  return (
    <Link to={`${id}`} className="keen-slider__slide">
      <motion.div
        className="relative rounded-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
      >
        <img src={bannerUrl} alt="" className="w-full" />

        <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute inset-x-0 bottom-0">
          <strong className="font-bold text-white block whitespace-nowrap truncate">
            {title}
          </strong>
          <span className="text-sm text-zinc-300 block mt-1">
            {adsCount} anúncio(s)
          </span>
        </div>
      </motion.div>
    </Link>
  );
};
