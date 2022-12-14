import "keen-slider/keen-slider.min.css";
import { KeenSliderOptions, useKeenSlider } from "keen-slider/react";
import { useCallback, useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import { CreateAdBanner } from "../components/CreateAdBanner";
import { CreateAdModal } from "../components/CreateAdModal";
import { GameCard } from "../components/GameCard";
import { MotionPage } from "../components/MotionPage";
import { api } from "../services/api";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export const Home = () => {
  const [createAdModalOpen, setCreateAdModalOpen] = useState(false);
  const [options, setOptions] = useState<KeenSliderOptions>({});
  const [games, setGames] = useState<Game[]>([]);

  const [ref] = useKeenSlider<HTMLDivElement>(options, []);

  const loadGames = useCallback(() => {
    api.get("games").then((response) => {
      setGames(response.data);
      setOptions({
        breakpoints: {
          "(min-width: 724px)": {
            slides: { perView: 4, spacing: 14 },
          },
          "(min-width: 1024px)": {
            slides: { perView: 6, spacing: 24 },
          },
        },
        slides: { perView: 1 },
      });
    });
  }, []);

  const onCreateAd = useCallback(() => {
    setCreateAdModalOpen(false);
    loadGames();
  }, []);

  const handleOpenCreateAdModal = () => setCreateAdModalOpen(true);
  const handleCloseCreateAdModal = () => setCreateAdModalOpen(false);

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <MotionPage>
      <div className="max-w-[1344px] mx-auto flex flex-col items-center py-20 px-8">
        <img src={Logo} />

        <h1 className="text-6xl text-white font-black mt-20">
          Seu{" "}
          <span className="text-transparent bg-nlw-gradient bg-clip-text">
            duo
          </span>{" "}
          está aqui.
        </h1>

        <div ref={ref} className="mt-16 keen-slider">
          {games.map((game, idx) => {
            return (
              <GameCard
                key={game.id}
                id={game.id}
                title={game.title}
                bannerUrl={game.bannerUrl}
                adsCount={game._count.ads}
                delay={idx / 10}
              />
            );
          })}
        </div>

        <CreateAdBanner handleCreateAd={handleOpenCreateAdModal} />

        <CreateAdModal
          createAdModalOpen={createAdModalOpen}
          handleCloseCreateAdModal={handleCloseCreateAdModal}
          onCreate={onCreateAd}
        />
      </div>
    </MotionPage>
  );
};
