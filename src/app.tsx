import { Header } from "./components/header";
import { useQuotes } from "./hooks/useQuotes";
import { TypedCharacters } from "./components/typed-characters";
import { ChangeEvent, useEffect, useState } from "react";

export default function App() {
  const { quote, author } = useQuotes();
  const [type, setType] = useState<string>("");

  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    const typedText = event.target.value;
    setType(typedText);
  }

  function compareTexts(quote: string, typedText: string) {
    const quoteChars = quote.split("");
    const typedChars = typedText.split("");


    quoteChars.forEach((character, index) => {
      const char = typedChars[index];
      if (char !== null) {
        if (char != character) {
          return console.log("é diferente");
        } else {
          return console.log("é engual");
        }
      }
    });

    //  for(let i = 0; i < quoteChars.length; i++) {
    //    console.log('quote ' + quoteChars[i])
    //    console.log('typed ' + typedChars[i])
    //    if(quoteChars[i] != typedChars[i]) {
    //      return false
    //    }
    //  }
    //
    //  return true
  }


  // se pa q é um useCallBack
  useEffect(() => {
    const compareResponse = compareTexts(quote, type);
    console.log(compareResponse);
  }, [type]);

  return (
    <div className="w-full flex flex-col items-center justify-center text-zinc-100 p-16 overflow-hidden">
      <Header />

      <main className="w-4/5 p-32">
        <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed break-all italic">
          <p className="text-zinc-500">{quote}</p>

          <p className="text-xl font-bold text-right p-16"> - {author}</p>
          <TypedCharacters typedText={type} isWrong={false} /> {/* o isWrong vai ser o retorno da funcao compareTexts */}
        </div>
        <textarea
          onChange={handleType}
          name="typingTeste"
          id="typingTeste"
          className="z-0 w-full bg-gray-800 text-zinc-300"
        />
      </main>
    </div>
  );
}
