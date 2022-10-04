import { Listbox, Transition } from "@headlessui/react";
import { CaretDown } from "phosphor-react";
import { Fragment } from "react";

type Option = {
  title: string;
  id: string;
};

interface Props<Value extends Option> {
  options: Value[];
  value?: Value;
  onChange: (option: Value) => void;
  mapLabel?: (option: Value) => string;
}

export function Select<Value extends Option>({
  options,
  value,
  onChange,
  mapLabel,
}: Props<Value>) {
  const getLabel = (option: Value) => {
    if (mapLabel) return mapLabel(option);
    return option.title;
  };

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="text-sm bg-zinc-900 px-4 py-3 rounded placeholder:text-zinc-500 w-full flex items-center">
          <span className="flex-grow text-left">
            {value ? getLabel(value) : "Selecione o game que deseja jogar"}
          </span>
          <CaretDown size={20} className="pointer-events-none" />
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute rounded mt-1 w-full bg-zinc-900 p-2 pr-1 ring-1 ring-purple-500">
            <Listbox.Options className="max-h-60 overflow-auto text-zinc-200 focus:outline-none text-sm scrollbar-thumb-violet-500 scrollbar-track-transparent scrollbar-thin">
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className="relative cursor-pointer select-none py-2 pl-4 pr-4 rounded hover:bg-zinc-800"
                  value={option}
                >
                  <span className={`block truncate`}>{option.title}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Transition>
      </div>
    </Listbox>
  );
}
