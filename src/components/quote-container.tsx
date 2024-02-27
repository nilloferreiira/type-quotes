import { ChangeEvent, useState } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { TypedCharacters } from "./typed-characters";
export default function QuoteContainer() {
  const { quote, author, handleNewQuote } = useQuotes();
  const [type, setType] = useState<string>("");

  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    const typedText = event.target.value;
    setType(typedText);
  }

  function resetTypedText() {
    setType("")
  }

  const textarea = document.getElementById('textarea')

  document.addEventListener("keydown", () => textarea?.focus())

  return (
    <main className="w-4/5 p-32">
      <TypedCharacters typedText={type} quote={quote} author={author} handleNewQuote={handleNewQuote} resetTypedText={resetTypedText}/>
      <textarea
        onChange={handleType}
        value={type}
        name="typingTeste"
        id="textarea"
        className="z-0 w-full bg-gray-800 text-zinc-300 opacity-100"
      />
    </main>
  );
}