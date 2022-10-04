interface Props {
  label: string;
  value: string;
  color?: string;
}

export const AdInfo = ({ label, value, color = "text-white" }: Props) => {
  return (
    <div className="mb-3">
      <span className="text-zinc-400 text-xs">{label}</span>
      <p className={`${color} font-semibold text-sm`}>{value}</p>
    </div>
  );
};
