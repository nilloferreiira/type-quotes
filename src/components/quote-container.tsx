import { ChangeEvent, useState } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { TypedCharacters } from "./typed-characters";

export default function QuoteContainer() {
  const { quote, author, handleNewQuote } = useQuotes();
  const [type, setType] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  // const [isTypingStarted, setIsTypingStarted] = useState<boolean>(false);
  
  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    const typedText = event.target.value;
   
    // if (!isTypingStarted) {
    //   setIsTypingStarted(true);
    // }

    setType(typedText);
    setIsTyping(true)
  }

  function resetTypedText() {
    setType("");
    // setIsTypingStarted(false);
  }

  function handleEndTyping() {
    setIsTyping(false);
  }

  const textarea = document.getElementById("textarea");

  document.addEventListener("keydown", () => textarea?.focus());

  return (
    <main className="w-4/5 p-32">
      <TypedCharacters
        typedText={type}
        quote={quote}
        author={author}
        handleNewQuote={handleNewQuote}
        resetTypedText={resetTypedText}
        isTyping={isTyping}
        handleEndTyping={handleEndTyping}

      />
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
