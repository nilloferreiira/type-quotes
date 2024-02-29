import { useCallback, useEffect, useState } from "react";
import { Character } from "./character";
import useTypingTimer from "../hooks/useTypingTimer";
import { Results, ResultsProps } from "./results";
import { IterationCw } from "lucide-react";

interface TypedCharactersProps {
  typedText: string;
  quote: string;
  author: string;
  isTyping: boolean;
  activeIndex: number | undefined;
  handleEndTyping: () => void;
  handleNewQuote: () => void;
  resetTypedText: () => void;
}

interface Character {
  char: string;
  key: string;
}

export function TypedCharacters({
  typedText,
  quote,
  author,
  isTyping,
  activeIndex,
  handleEndTyping,
  handleNewQuote,
  resetTypedText,
}: TypedCharactersProps) {
  // spliting the quote
  const splitedQuote = quote
    .split("")
    .map((char, index) => ({ char, key: `${char}_${index}` }));

  //states
  const initialIsTheWrongCharState = new Array(quote.length).fill(false);
  const [isTheWrongChar, setIsTheWrongChar] = useState<boolean[]>(
    initialIsTheWrongCharState
  );
  const [prevTypedTextLength, setPrevTypedTextLength] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [allErrors, setAllErrors] = useState<number[]>([]);
  const [cpm, setCpm] = useState<number>(0);
  const [wpm, setWpm] = useState<number>(0);
  const [accurency, setAccurency] = useState<number>(0);
  const [results, setResults] = useState<ResultsProps | undefined>();

  const { startTimer, elapsedTime, stopTimer } = useTypingTimer();

  const timeInMinutes = elapsedTime / 1000 / 60;

  // functions
  const compareTexts = useCallback(
    (typedText: string) => {
      const isWrongCharsLocal = new Array(typedText.length).fill(false);
      let mistakesCount = 0;
      let cpmCount = Math.floor(typedText.length / timeInMinutes);
      let wpmCount = Math.floor(typedText.length / 5 / timeInMinutes);
      let accurencyCount: number;

      //loop comparing the typedText to the quote
      splitedQuote.forEach((character, index) => {
        const char = typedText[index];

        if (index < typedText.length) {
          if ((isWrongCharsLocal[index] = char !== character.char)) {
            isWrongCharsLocal[index] = true; // verify if it's the correct chat
            mistakesCount++; // increment the mistakes

            setAllErrors((prevErrors) => [...prevErrors, index]);
          } else {
            isWrongCharsLocal[index] = false;
          }
        }
      });

      // updating the states
      setIsTheWrongChar(isWrongCharsLocal);
      setMistakes(mistakesCount);
      setCpm(cpmCount);
      setWpm(wpmCount);

      accurencyCount = Math.floor(
        ((quote.length - allErrors.length) / quote.length) * 100
      );
      setAccurency(accurencyCount);
      return isWrongCharsLocal.some((isWrong) => isWrong);
    },
    [typedText]
  );

  function reset() {
    stopTimer();
    setIsTheWrongChar(new Array(typedText.length).fill(undefined));
    setPrevTypedTextLength(0);
    setMistakes(0);
    setAllErrors([]);
    setCpm(0);
    setWpm(0);
    setAccurency(0);
    resetTypedText();
    handleNewQuote();
    handleEndTyping();
    setResults(undefined);
    // Adicione futuros estados para redefinir
  }

  function saveResults() {
    const result: ResultsProps = {
      results: {
        cpm,
        wpm,
        accurency,
      },
    };
    setResults(result);
  }

  const allCorrect = quote && typedText === quote;
  // check if isTyping is true and start the timer
  useEffect(() => {
    if (isTyping) {
      startTimer();
    }
  }, [isTyping]);

  // check if the typedText is correct
  useEffect(() => {
    if (typedText.length > prevTypedTextLength) {
      compareTexts(typedText);
    }

    setPrevTypedTextLength(typedText.length);
    if (allCorrect) {
      saveResults();
      handleEndTyping();
    }
  }, [typedText, prevTypedTextLength, compareTexts, allCorrect]);

  return (
    <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed italic">
      {isTyping && (
        <p
          className={`not-italic text-base ${
            mistakes !== 0 ? "text-red-500" : "text-gray-400"
          }`}
        >
          mistakes: {mistakes}
        </p>
      )}

      {splitedQuote.map((char, index) => (
        <Character
          key={char.key}
          char={char.char}
          isWrong={isTheWrongChar[index]}
          activeIndex={index === activeIndex}
        />
      ))}
      <p className="text-xl font-bold text-right p-16"> - {author}</p>
      {/* results */}

      {results !== undefined && <Results results={results?.results} />}

      <div className="flex items-center justify-center ">
        <button
          onClick={reset}
          className="p-4 text-zinc-400 hover:text-zinc-100 outline-none"
        >
          <IterationCw />
        </button>
      </div>
    </div>
  );
}
