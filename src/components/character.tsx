import { Caret } from "./caret";

interface CharacterProps {
  char: string;
  isWrong: boolean;
  activeIndex: boolean;
}

export function Character({ char, isWrong, activeIndex }: CharacterProps) {
  const defaultColor = "text-zinc-500";
  const color = isWrong === undefined ? defaultColor : isWrong ? "text-red-500 underline" : "text-zinc-100";

  // const activeColor = activeIndex && !isWrong ? "underline" : ""; // caso o Caret bug usa isso

  return (
    <span
      className={`font-normal font-Open-sans italic ${color} relative`}
    >
      {char}
      {activeIndex && <Caret className={"absolute top-0.5 left-0.5"} />}
      
    </span>
  );
}

