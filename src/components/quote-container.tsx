import { useState, ChangeEvent } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { TypedCharacters } from "./typed-characters";

export function QuoteContainer() {
    const { quote, author } = useQuotes();
    const [type, setType] = useState<string>("");
  
    function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
      const typedText = event.target.value;
      setType(typedText);
    }
    
    return (
        <main className="w-4/5 p-32">
        <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed break-all italic">
          <p className="text-zinc-500">{quote}</p>

          <p className="text-xl font-bold text-right p-16"> - {author}</p>
          <TypedCharacters typedText={type} isWrong={false} quote={quote} /> {/* o isWrong vai ser o retorno da funcao compareTexts */}
        </div>
        <textarea
          onChange={handleType}
          name="typingTeste"
          id="typingTeste"
          className="mx-auto w-full rounded-lg outline-none bg-gray-800 text-zinc-300 focus-visible:ring-2 focus-visible:ring-sky-600 p-2"
        />
      </main>
    )
}