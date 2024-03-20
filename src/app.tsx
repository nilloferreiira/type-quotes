import { Header } from "./components/header";
import QuoteContainer from "./components/quote-container";

export default function App() {


  return (
    <div className="w-full flex flex-col items-center justify-center text-zinc-100 p-4 md:p-16  space-y-10 lg:space-y-5 overflow-hidden">
      <Header />
      <QuoteContainer />
    </div>
  );
}
