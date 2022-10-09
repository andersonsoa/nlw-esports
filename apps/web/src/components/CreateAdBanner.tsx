import { MagnifyingGlassPlus } from "phosphor-react";

interface Props {
  handleCreateAd: () => void;
}

export function CreateAdBanner({ handleCreateAd }: Props) {
  return (
    <div className="mt-8 pt-1 self-stretch bg-nlw-gradient rounded-lg overflow-hidden antialiased">
      <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
        <div>
          <strong className="text-2xl text-white font-black block">
            Não encontrou seu duo?
          </strong>
          <span className="text-zinc-400 block">
            Publique um anúncio para encontrar novos players!
          </span>
        </div>

        <button
          onClick={handleCreateAd}
          className="py-3 px-4 bg-violet-500 text-white rounded flex gap-3 hover:bg-violet-600"
        >
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </button>
      </div>
    </div>
  );
}
