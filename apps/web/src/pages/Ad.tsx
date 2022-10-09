import { KeenSliderOptions } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import { CaretLeft } from "phosphor-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Logo from "../assets/logo.svg";
import { AdCard } from "../components/AdCard";
import { DiscordModal } from "../components/DiscordModal";
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
  const params = useParams();

  const [game, setGame] = useState<Game>();
  const [sliderOptions, setSliderOptions] = useState<KeenSliderOptions>({});
  const [isDicordModalOpen, setIsDiscordModalOpen] = useState(false);
  const [discord, setDiscord] = useState("");

  const [sliderRef] = useKeenSlider(sliderOptions);

  const handleConnect = async (adId: string) => {
    try {
      const { data } = await api.get(`ads/${adId}/discord`);
      setDiscord(data.discord);
      setIsDiscordModalOpen(true);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCloseDiscordModal = () => {
    setDiscord("");
    setIsDiscordModalOpen(false);
  };

  useEffect(() => {
    api.get(`game/${params.gameId}`).then((response) => {
      setGame(response.data);
      setSliderOptions({
        slides: { perView: 1, spacing: 12 },
        breakpoints: {
          "(min-width: 724px)": {
            slides: { perView: 2, spacing: 14 },
          },
          "(min-width: 1024px)": {
            slides: { perView: 3, spacing: 16 },
          },
          "(min-width: 1280px)": {
            slides: { perView: 4, spacing: 24 },
          },
        },
      });
    });
  }, []);
  return (
    <>
      <div className="max-w-[1344px] mx-auto py-20 px-8">
        <header className="flex justify-between pt-12">
          <Link to="/" className="w-28 flex items-center text-2xl text-white">
            <CaretLeft size={28} className="mr-1" />
            Voltar
          </Link>

          <img src={Logo} className="w-32" />

          <div className="w-28" />
        </header>

        <div className="flex mt-20 gap-8">
          <img
            src={game?.bannerUrl}
            className="max-w-[315px] w-full object-cover rounded-2xl"
          />

          <div className="flex-grow grid">
            <div>
              <h2 className="text-white text-5xl font-bold">{game?.title}</h2>
              <p className="text-zinc-400 text-lg flex-grow">
                Encontre o duo perfeito e comece a jogar!
              </p>
            </div>
            <div ref={sliderRef} className="keen-slider">
              {game &&
                (game.ads.length ? (
                  game.ads.map((ad) => (
                    <AdCard key={ad.id} data={ad} onConnect={handleConnect} />
                  ))
                ) : (
                  <NoAds />
                ))}
            </div>
          </div>
        </div>
      </div>

      <DiscordModal
        discord={discord}
        isDiscordModalOpen={isDicordModalOpen}
        handleCloseDiscordModal={handleCloseDiscordModal}
      />
    </>
  );
};
