import * as BaseCheckbox from "@radix-ui/react-checkbox";
import { Check } from "phosphor-react";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Checkbox({ value, onChange }: Props) {
  return (
    <BaseCheckbox.Root
      checked={value}
      onCheckedChange={(checked) => {
        if (checked === true) {
          onChange(true);
        } else {
          onChange(false);
        }
      }}
      className="w-6 h-6 p-1 rounded bg-zinc-900"
    >
      <BaseCheckbox.Indicator>
        <Check className="w-4 h-4 text-emerald-400" />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  );
}
