interface CharacterProps {
  char: string;
  isWrong: boolean;
}

export function Character({ char, isWrong }: CharacterProps) {
  const defaultColor = "text-zinc-400";
  const color = isWrong === undefined ? defaultColor : isWrong ? "text-red-500 underline" : "text-zinc-100";

  return (
    <span className={color}>{char}</span>
  );
}
