import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Logo from "../assets/logo.svg";
import { AdCard } from "../components/AdCard";
import { NoAds } from "../components/NoAds";
import { api } from "../services/api";

interface Ad {
  id: string;
  name: string;
  yearsPlaying: number;
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
  weekDays: string[];
}

interface Game {
  id: string;
  bannerUrl: string;
  title: string;
  ads: Ad[];
}

export const Ad = () => {
  const [game, setGame] = useState<Game>();
  const params = useParams();

  useEffect(() => {
    api.get(`game/${params.gameId}`).then((response) => {
      setGame(response.data);
    });
  }, []);
  return (
    <div className="px-4">
      <header className="flex justify-between pt-12 mx-auto max-w-4xl">
        <Link to="/" className="w-28 flex items-center text-2xl text-white">
          <CaretLeft size={28} className="mr-1" />
          Home
        </Link>

        <img src={Logo} className="w-32" />

        <div className="w-28" />
      </header>

      <div className="flex mt-20 gap-8 mx-auto max-w-4xl">
        <img
          src={game?.bannerUrl}
          className="w-96 h-48 object-cover rounded-2xl"
        />

        <div>
          <h2 className="text-white text-5xl font-bold">{game?.title}</h2>
          <p className="text-zinc-400 text-lg">
            Selecione o game que deseja jogar...
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 mt-12 mx-auto max-w-4xl">
        {game &&
          (game?.ads.length ? (
            game.ads.map((ad) => <AdCard key={ad.id} data={ad} />)
          ) : (
            <NoAds />
          ))}
      </div>
    </div>
  );
};
