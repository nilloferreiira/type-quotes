import { useCallback, useEffect, useState } from "react";
import { Character } from "./character";

interface TypedCharactersProps {
  typedText: string;
  quote: string;
  author: string;
  handleNewQuote: () => void;
  resetTypedText: () => void;
}

interface Character {
  char: string;
  key: string;
}

export function TypedCharacters({typedText, quote, author, handleNewQuote, resetTypedText}: TypedCharactersProps) {
  // spliting the quote
  const splitedQuote = quote
    .split("")
    .map((char, index) => ({ char, key: `${char}_${index}` }));
  
  //states
    const initialIsTheWrongCharState = new Array(quote.length).fill(false);

    const [isTheWrongChar, setIsTheWrongChar] = useState<boolean[]>(initialIsTheWrongCharState);
    const[prevTypedTextLength, setPrevTypedTextLength] = useState<number>(0)
    const [mistakes, setMistakes] = useState<number>(0)
    const [cpm, setCpm] = useState<number>(0)
    const [wpm, setWpm] = useState<number>(0)


  // functions
  const compareTexts = useCallback((typedText: string) => {
      const isWrongCharsLocal = new Array(typedText.length).fill(false);
      let mistakesCount = 0;
      let cpmCount = typedText.length;
      // let wpmCount = (((typedText.length / 5) / time) * 60) // create the startTiming and finish it
  
      splitedQuote.forEach((character, index) => {
        const char = typedText[index];
        
        if(index < typedText.length) {
          if(isWrongCharsLocal[index] = char !== character.char) {
            isWrongCharsLocal[index] = true; // verify if it's the correct chat 
            mistakesCount++ // increment the mistakes
          } else {
            isWrongCharsLocal[index] = false;
          }
          //cpmCount++  // ele ta resetando o cpm quando eu apago algum caracter
        } 
      });
  
      // updating the states
      setIsTheWrongChar(isWrongCharsLocal);
      setMistakes(mistakesCount)
      setCpm(cpmCount)
      return isWrongCharsLocal.some((isWrong) => isWrong);
    
  },[typedText])

  function reset() {
    setIsTheWrongChar(new Array(typedText.length).fill(undefined));
    // setIsTheWrongChar(initialIsTheWrongCharState);
    setPrevTypedTextLength(0);
    setMistakes(0);
    setCpm(0);
    setWpm(0);
    resetTypedText()
    handleNewQuote();
    // Adicione futuros estados para redefinir
  }

  const allCorrect = quote && typedText === quote;

  useEffect(() => {
    if (typedText.length > prevTypedTextLength) {
      compareTexts(typedText);
    }
  
    setPrevTypedTextLength(typedText.length);
  
    if (allCorrect) {
      console.log(allCorrect);
      reset();
    }
  }, [typedText, prevTypedTextLength, compareTexts, allCorrect]);

  return (
    <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed italic">
      {splitedQuote.map((char, index) => (
        <Character
          key={char.key}
          char={char.char}
          isWrong={isTheWrongChar[index]}
        />
      ))}
      <p className="text-xl font-bold text-right p-16"> - {author}</p>
      {/* results */}
        {/* remember to create a new component for this  */}
      <div className="w-4/5 flex justify-around text-lg font-normal text-zinc-400 mx-auto mb-10 text-center">
        <div>
          <p>Mistakes:</p>
          <span className="font-semibold">{mistakes}</span>
        </div>
        <div>
          <p>WPM:</p>
          <span className="font-semibold">{wpm}</span>
        </div>
        <div>
          <p>CPM:</p>
          <span className="font-semibold">{cpm}</span>
        </div>
        <div>
          <p>Accurency</p>
          <span className="font-semibold">98%</span>
        </div>
      </div>
    </div>
  );
}
