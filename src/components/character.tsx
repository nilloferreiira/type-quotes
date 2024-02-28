interface CharacterProps {
  char: string;
  isWrong: boolean;
}

export function Character({ char, isWrong }: CharacterProps) {
  const defaultColor = "text-zinc-500";
  const color = isWrong === undefined ? defaultColor : isWrong ? "text-red-500 underline" : "text-zinc-100";
  // missing get active index
  return (
    <span className={`font-normal font-Open-sans italic ${color}`}>{char}</span>
  );
}
