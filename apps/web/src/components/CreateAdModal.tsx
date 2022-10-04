import * as Checkbox from "@radix-ui/react-checkbox";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import axios from "axios";
import { Check, GameController } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../services/api";
import { Input } from "./Form/Input";
import { Select } from "./Form/Select";

interface Game {
  id: string;
  title: string;
  teste: string;
}

export const CreateAdModal = () => {
  const [games, setGames] = useState<Game[]>([]);

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | undefined>();

  const handleSelectGame = (data: Game) => {
    setSelectedGame(data);
  };

  const handleCreateAd = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) return;

    try {
      await axios.post(`http://localhost:5000/game/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel,
      });

      alert("Anuncio criado com sucesso");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    api.get("games").then((response) => {
      setGames(response.data);
    });
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed overflow-hidden" />

      <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleCreateAd}>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm" htmlFor="game">
              Qual game?
            </label>
            <Select
              options={games}
              value={selectedGame}
              onChange={handleSelectGame}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm" htmlFor="name">
              Seu nome (ou nickname)
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamar dentro do game?"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="yearsPlaying">
                Joga há quantos anos?
              </label>
              <Input
                id="yearsPlaying"
                name="yearsPlaying"
                type="text"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="discord">
                Qual seu discord?
              </label>
              <Input
                id="discord"
                name="discord"
                type="text"
                placeholder="usuario#0000"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label className="font-semibold text-sm" htmlFor="weekDays">
                Quando costuma jogar?
              </label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-5 gap-1"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Domingo"
                  value="0"
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Segunda"
                  value="1"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Terça"
                  value="2"
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Quarta"
                  value="3"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Quinta"
                  value="4"
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Sexta"
                  value="5"
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  className="h-8 grid place-items-center rounded bg-zinc-900"
                  title="Sábado"
                  value="6"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-sm" htmlFor="hourStart">
                Qual horário do dia ?
              </label>
              <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                <Input
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
              </div>
            </div>
          </div>

          <label className="mt-2 flex gap-2 items-center text-sm cursor-pointer">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 p-1 rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
            >
              Cancelar
            </Dialog.Close>
            <button className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3">
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};
