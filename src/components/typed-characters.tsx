import { useEffect, useState } from "react";
import { Caret } from "./caret"
import { Character } from "./character";

interface TypedCharactersProps {
    typedText: string,
    quote: string,
    isWrong: boolean
    // className: string,
}

export function TypedCharacters({typedText, quote}: TypedCharactersProps) {
    const TypedCharacters = typedText.split("")
    
    const [isTheWrongChar, setIsTheWrongChar] = useState<boolean[]>(new Array(typedText.length).fill(false))

    
    function compareTexts(quote: string, typedChars: string) {
        const quoteChars = quote.split("");
        const isWrongCharsLocal = new Array(typedText.length).fill(false);

        quoteChars.forEach((character, index) => {
          const char = typedChars[index];
          isWrongCharsLocal[index] = char !== character;
        //   if (char !== null) {
        //     if (char != character) {
        //       setIsTheWrongChar(false);
        //     } else {
        //        setIsTheWrongChar(true);
        //     }
        //   }
        });

        setIsTheWrongChar(isWrongCharsLocal);
        return isWrongCharsLocal.some(isWrong => isWrong);
    }
    useEffect(()=> {
        compareTexts(quote, typedText)
    },[typedText])
    return (
        <div className="absolute inset-0">
            {TypedCharacters.map((char: any, index: any) => {
                
                return (
                    <Character key={`${char}_${index}`} char={char} isWrong={isTheWrongChar[index]} />
                )
            })}
            
            <Caret />
        </div>
    )
}
