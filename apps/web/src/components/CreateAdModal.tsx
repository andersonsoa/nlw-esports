import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { GameController } from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../services/api";
import { Checkbox } from "./Form/Checkbox";
import { FormControll } from "./Form/FormControll";
import { GroupButtons } from "./Form/GroupButtons";
import { Input } from "./Form/Input";
import { Select } from "./Form/Select";

interface Props {
  createAdModalOpen: boolean;
  handleCloseCreateAdModal: () => void;
  onCreate: () => void;
}

interface Game {
  id: string;
  title: string;
}

interface FormData {
  name: string;
  selectedGame: Game;
  yearsPlaying: string;
  discord: string;
  weekDays: string[];
  hourStart: string;
  hourEnd: string;
  useVoiceChannel: boolean;
}

const OPTIONS = [
  {
    value: "0",
    label: "D",
    title: "Domingo",
  },
  {
    value: "1",
    label: "S",
    title: "Segunda",
  },
  {
    value: "2",
    label: "T",
    title: "Terça",
  },
  {
    value: "3",
    label: "Q",
    title: "Quarta",
  },
  {
    value: "4",
    label: "Q",
    title: "Quinta",
  },
  {
    value: "5",
    label: "S",
    title: "Sexta",
  },
  {
    value: "6",
    label: "S",
    title: "Sábado",
  },
];

const schema = z.object({
  name: z.string().min(1, { message: "Informe seu nome ou nickname" }),
  selectedGame: z.object(
    {
      id: z.string(),
      title: z.string(),
    },
    { required_error: "Escolha o jogo que deseja jogar" },
  ),
  yearsPlaying: z.string().min(1, { message: "Informe há quanto tempo joga" }),
  discord: z
    .string()
    .min(1, { message: "Informe seu discord" })
    .regex(/.+#[0-9]{4}/, {
      message: "Usuário do discord inválido",
    }),
  weekDays: z
    .array(z.string())
    .min(1, { message: "Escolha ao menos 1 dia da semana" }),
  hourStart: z
    .string()
    .regex(/\d{2}:\d{2}/, { message: "Horário do dia inválido" }),
  hourEnd: z
    .string()
    .regex(/\d{2}:\d{2}/, { message: "Horário do dia inválido" }),
  useVoiceChannel: z.boolean(),
});

export function CreateAdModal({
  createAdModalOpen,
  handleCloseCreateAdModal,
  onCreate,
}: Props) {
  const [games, setGames] = useState<Game[]>([]);

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      useVoiceChannel: false,
      weekDays: [],
    },
  });

  const handleCreateAd = async (data: FormData) => {
    try {
      await api.post(`game/${data.selectedGame.id}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: data.weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: data.useVoiceChannel,
      });

      reset();
      onCreate();
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
    <Transition appear show={createAdModalOpen} as={Fragment}>
      <Dialog
        onClose={handleCloseCreateAdModal}
        as="div"
        className="relative z-10"
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="bg-black/60 inset-0 fixed overflow-hidden" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-[560px] w-full shadow-black/25">
              <Dialog.Title className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>

              <form
                className="mt-8 flex flex-col gap-4"
                onSubmit={handleSubmit(handleCreateAd)}
              >
                <FormControll
                  label="Qual game?"
                  error={errors.selectedGame?.message}
                >
                  <Controller
                    name="selectedGame"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        options={games}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControll>

                <FormControll
                  label="Seu nome (ou nickname)"
                  error={errors.name?.message}
                  htmlFor="name"
                >
                  <Input
                    id="name"
                    type="text"
                    placeholder="Como te chamar dentro do game?"
                    {...register("name")}
                  />
                </FormControll>

                <div className="grid grid-cols-2 gap-6">
                  <FormControll
                    label="Joga há quantos anos?"
                    error={errors.yearsPlaying?.message}
                    htmlFor="yearsPlaying"
                  >
                    <Input
                      id="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                      {...register("yearsPlaying")}
                    />
                  </FormControll>

                  <FormControll
                    label="Qual seu discord?"
                    error={errors.discord?.message}
                    htmlFor="discord"
                  >
                    <Input
                      id="discord"
                      type="text"
                      placeholder="usuario#0000"
                      {...register("discord")}
                    />
                  </FormControll>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormControll
                    label="Quando costuma jogar?"
                    error={errors.weekDays?.message}
                  >
                    <Controller
                      name="weekDays"
                      control={control}
                      render={({ field: { value, onChange } }) => (
                        <GroupButtons
                          value={value}
                          onChange={onChange}
                          options={OPTIONS}
                        />
                      )}
                    />
                  </FormControll>
                  <FormControll
                    label="Qual horário do dia ?"
                    error={errors.hourStart?.message || errors.hourEnd?.message}
                    htmlFor="hourStart"
                  >
                    <div className="grid grid-cols-2 gap-2 justify-items-stretch">
                      <Input
                        id="hourStart"
                        type="time"
                        placeholder="De"
                        {...register("hourStart")}
                      />
                      <Input
                        id="hourEnd"
                        type="time"
                        placeholder="Até"
                        {...register("hourEnd")}
                      />
                    </div>
                  </FormControll>
                </div>

                <label className="mt-2 flex gap-2 items-center text-sm cursor-pointer">
                  <Controller
                    name="useVoiceChannel"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Checkbox value={value} onChange={onChange} />
                    )}
                  />
                  Costumo me conectar ao chat de voz
                </label>

                <footer className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={handleCloseCreateAdModal}
                    type="button"
                    className="bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold"
                  >
                    Cancelar
                  </button>
                  <button className="bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3">
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
