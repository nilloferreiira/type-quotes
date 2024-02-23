import { Header } from "./components/header";
import { useQuotes } from "./hooks/useQuotes";
import { TypedCharacters } from "./components/typed-characters";

export default function App() {
  const { quote, author } = useQuotes();

  let type: string = '';

  return (
    <div className="w-full flex flex-col items-center justify-center text-zinc-100 p-16">
      <Header />

      <main className="w-4/5 p-32">
        <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed break-all italic">

        <p className="text-zinc-500">
          {quote}
          </p>

        <p className="text-xl font-bold text-right p-16"> - {author}</p>
        
        <TypedCharacters typedText={type} isWrong={false} />
          
        </div>
      </main>
    </div>
  );
}
