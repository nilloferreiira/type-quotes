import { useState, useRef, useEffect, ChangeEvent } from "react";

interface Stats {
  wpm: number;
  cpm: number;
  accuracy: number;
  time: number;
}

export default function FullCode() {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [typedText, setTypedText] = useState<string>("");
  const [started, setStarted] = useState<boolean>(false);
  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    time: 0,
  });
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    async function getQuotes() {
    const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    }
    getQuotes()
  }, []);

  useEffect(() => {
    function calculateStats() {
      const words = typedText.split(" ");
      const time = (Date.now() - startTimeRef.current!) / 1000;
      const wpm = Math.floor((words.length / time) * 60);
      const cpm = Math.floor((typedText.length / time) * 60);
      const accuracy =
        typedText.length === 0
          ? 0
          : Math.floor(
              ((typedText.length - countErrors(typedText, quote)) /
                typedText.length) *
                100
            );

      setStats({
        wpm,
        cpm,
        accuracy,
        time,
      });

      console.log(accuracy);
    }
    calculateStats();
  }, [typedText, quote]);

  function handleStart() {
    startTimeRef.current = Date.now();
    setTypedText("");
    setStarted(!started);
  }

  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    setTypedText(event.target.value);
  }

  function countErrors(typed: string, original: string) {
    let errors = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] !== original[i]) {
        errors++;
      }
    }

    return errors;
  }


  return (
    <div className="w-full bg-gray-950">
      <div className="flex flex-col items-center justify-center h-screen w-3/5 gap-10 mx-auto">
        <div className="mb-4 text-left w-full">
          <h1 className="text-gray-200 font-bold text-3xl">
            Teste de Digitação com Citações
          </h1>
        </div>
        <div className="w-full flex flex-col gap-4 space-y-5">
          <blockquote className="text-gray-400 text-xl italic">
            {quote} - <strong>{author}</strong>
          </blockquote>
          <textarea
            value={typedText}
            onChange={handleType}
            className={`
                    p-4 border-2
                    w-full
                    h-20 
                    text-gray-100
                    border-sky-950
                    rounded-md
                    resize-none 
                    focus:outline-none -sky-950 
                    focus:border-gray-300/80 
                    bg-gray-900
                    `}
          />
        </div>

        <div className="mt-4 flex justify-center gap-10 w-full">
          {/* trocar para "ask for new quote" */}
          <button
            onClick={handleStart}
            className={`text-lg  
                        ${started ? "text-red-500" : "text-gray-100"}
                        bg-sky-700 rounded-xl px-4 focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none hover:bg-opacity-75 transition-all
            `}
          >
            {started ? <span>Reiniciar</span> : <span>Começar</span>}
          </button>
          {/* trocar para "ask for new quote" */}

          <div className="flex flex-col items-start justify-center text-gray-200">
            <p className="">
              {"WPM: "}
              {stats.wpm}
            </p>
            <p className="">
              {"CPM: "}
              {stats.cpm}
            </p>
            <p className="">
              {"Precisão: "}
              {Number.isNaN(stats.accuracy || stats.accuracy == -Infinity)
                ? 0
                : stats.accuracy}
              %
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
