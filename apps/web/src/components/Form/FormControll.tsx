interface Props {
  children: React.ReactNode;
  label: string;
  error?: string;
  htmlFor?: string;
}

export function FormControll({ children, label, error, htmlFor }: Props) {
  return (
    <div className="pb-5 flex flex-col gap-2">
      <label
        className="font-semibold text-sm flex flex-col gap-2"
        htmlFor={htmlFor}
      >
        {label}
      </label>

      {children}

      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
}
