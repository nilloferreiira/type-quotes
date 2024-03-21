import { ChangeEvent, useRef, useState } from "react";
import { useQuotes } from "../hooks/useQuotes";
import { TypedCharacters } from "./typed-characters";

export default function QuoteContainer() {
  const { quote, author, handleNewQuote } = useQuotes();
  const [type, setType] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  function focusTextarea() {
    if(textareaRef.current) {
      textareaRef.current.focus();
    }
  }

  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    const typedText = event.target.value;
   
    setType(typedText);
    setIsTyping(true)
    setActiveIndex(typedText.length)
  }

  function resetTypedText() {
    setType("");
    setActiveIndex(undefined)
  }

  function handleEndTyping() {
    setIsTyping(false);
  }

  const textarea = document.getElementById("textarea");

  document.addEventListener("keydown", () => textarea?.focus());

  return (
    <main className="w-full md:w-4/5 p-2 md:p-32">
      <TypedCharacters
        typedText={type}
        quote={quote}
        author={author}
        handleNewQuote={handleNewQuote}
        resetTypedText={resetTypedText}
        isTyping={isTyping}
        handleEndTyping={handleEndTyping}
        activeIndex={activeIndex} 
        focusTextarea={focusTextarea}      />
      <textarea
        onChange={handleType}
        value={type}
        name="typingTeste"
        id="textarea"
        ref={textareaRef}
        className="z-0 w-10 h-20 opacity-0 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-full"
      />
    </main>
  );
}
