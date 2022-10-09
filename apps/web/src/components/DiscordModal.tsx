import { Dialog, Transition } from "@headlessui/react";
import { CheckCircle } from "phosphor-react";
import { Fragment } from "react";

interface Props {
  discord?: string;
  isDiscordModalOpen: boolean;
  handleCloseDiscordModal: () => void;
}

export function DiscordModal({
  discord,
  isDiscordModalOpen,
  handleCloseDiscordModal,
}: Props) {
  return (
    <Transition appear show={isDiscordModalOpen} as={Fragment}>
      <Dialog
        onClose={handleCloseDiscordModal}
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
            <Dialog.Panel className="fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-xs w-full shadow-black/25 flex flex-col items-center gap-6">
              <CheckCircle className="text-emerald-400 w-16 h-16" />

              <div className="text-center">
                <Dialog.Title className="text-2xl font-black">
                  Let's play!
                </Dialog.Title>
                <h2 className="text-zinc-400 text-sm">
                  Agora é só começar a jogar!
                </h2>
              </div>

              <div className="w-full">
                <p className="text-center text-sm">Adicione no Discord</p>
                <div className="grid place-items-center bg-zinc-900 rounded h-12 mt-1">
                  {discord}
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
