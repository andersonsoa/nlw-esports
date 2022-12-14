import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      className="text-sm bg-zinc-900 px-4 py-3 rounded placeholder:text-zinc-500 appearance-none"
      {...props}
      ref={ref}
    />
  );
});
