import { useEffect, useState } from "react";
import { Character } from "../character";

interface TypedCharactersProps {
  typedText: string;
  quote: string;
  author: string;
}

interface Character {
  char: string;
  key: string;
}

export function TypedCharactersTest({
  typedText,
  quote,
  author,
}: TypedCharactersProps) {
  const splitedQuote = quote
    .split("")
    .map((char, index) => ({ char, key: `${char}_${index}` }));
  const [isTheWrongChar, setIsTheWrongChar] = useState<boolean[]>(
    new Array(typedText.length).fill(false)
  );


  function compareTexts(typedText: string) {
    const isWrongCharsLocal = new Array(typedText.length).fill(false);

    splitedQuote.forEach((character, index) => {
      const char = typedText[index];
      index < typedText.length
        ? (isWrongCharsLocal[index] = char !== character.char)
        : false;
    });

    setIsTheWrongChar(isWrongCharsLocal);
    return isWrongCharsLocal.some((isWrong) => isWrong);
  }

  useEffect(() => {
    compareTexts(typedText);
  }, [typedText]);

  return (
    <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed break-all italic">
      {splitedQuote.map((char, index) => (
        <Character
          key={char.key}
          char={char.char}
          isWrong={isTheWrongChar[index]}
        />
      ))}
      
      <p className="text-xl font-bold text-right p-16"> - {author}</p>
    </div>
  );
}
