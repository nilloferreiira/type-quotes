interface CharacterProps {
  char: string;
  isWrong: boolean;
}

export function Character({ char, isWrong }: CharacterProps) {
  return (
    <span className={`${isWrong ? "text-red-500 underline" : "text-zinc-100"}`}>
      {char}
    </span>
  );
}
