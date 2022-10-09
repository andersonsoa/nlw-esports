import * as ToggleGroup from "@radix-ui/react-toggle-group";

type Option = {
  title: string;
  label: string;
  value: string;
};

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
}

export function GroupButtons({ value, onChange, options }: Props) {
  return (
    <ToggleGroup.Root
      type="multiple"
      className="grid grid-cols-5 gap-1"
      value={value}
      onValueChange={onChange}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option.value}
          className="h-8 grid place-items-center rounded bg-zinc-900"
          title={option.title}
          value={option.value}
        >
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
