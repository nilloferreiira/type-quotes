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
  const [started, setStarted] = useState<boolean>(true)
  const [stats, setStats] = useState<Stats>({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    time: 0,
  });
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    };
    getQuote();
  }, []);

  useEffect(() => {
    function calculateStats() {
      const words = typedText.split(" ");
      const time = (Date.now() - startTimeRef.current!) / 1000;
      const wpm = Math.floor((words.length / time) * 60);
      const cpm = Math.floor((typedText.length / time) * 60);
      const accuracy = Math.floor(
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
    }
    calculateStats();
  }, [typedText, quote]);

  function handleStart() {
    startTimeRef.current = Date.now();
    setTypedText("");
    setStarted(!started)
  }

  function handleType(event: ChangeEvent<HTMLInputElement>) {
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
    <div className="flex flex-col items-center justify-center h-screen w-3/5 mx-auto">
      <div>
        <div className="mb-4">
          <h1>Teste de Digitação com Citações</h1>
          <h2></h2>
        </div>
        <blockquote className="mb-4">
          {quote} - <strong>{author}</strong>
        </blockquote>
        <input
          type="text"
          value={typedText}
          onChange={handleType}
          className="p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <div className="mt-4 flex justify-between">
          <button onClick={handleStart} className={`text-lg  ${started ? 'text-green-500' : 'text-red-500'}`}>
            {started ? <span>Começar</span> : <span>Reiniciar</span> }
          </button>
          <div className="flex flex-col items-center">
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
              {Number.isNaN(stats.accuracy) ? 0 : stats.accuracy}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
