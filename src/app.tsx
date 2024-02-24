import MainTeste from "./components/components-test/main-test";
import { Header } from "./components/header";
// import { QuoteContainer } from "./components/quote-container";

export default function App() {


  return (
    <div className="w-full flex flex-col items-center justify-center text-zinc-100 p-16 overflow-hidden">
      <Header />
      {/* <QuoteContainer /> */}
      <MainTeste />
    </div>
  );
}
