// import { ChangeEvent, useState } from "react";
// import { useQuotes } from "../../hooks/useQuotes";
// import { Header } from "../header";
// import { TypedCharactersTest } from "./typed-characters-test";

// export default function MainTeste() {
//   const { quote, author } = useQuotes();
//   const [type, setType] = useState<string>("");

//   function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
//     const typedText = event.target.value;
//     setType(typedText);
//   }

//   return (
//     <main className="w-4/5 p-32">
//       <div className="relative max-w-full mt-3.5 text-3xl leading-relaxed break-all italic">
//         {/* <p className="text-zinc-500">{quote}</p> */}
//         <TypedCharactersTest typedText={type} quote={quote}  />
//         <p className="text-xl font-bold text-right p-16"> - {author}</p>
//         <TypedCharactersTest
//           typedText={type}
//           quote={quote}
//         />{" "}
//         {/* o isWrong vai ser o retorno da funcao compareTexts */}
//       </div>
//       <textarea
//         onChange={handleType}
//         name="typingTeste"
//         id="typingTeste"
//         className="z-0 w-full bg-gray-800 text-zinc-300"
//       />
//     </main>
//   );
// }


import { ChangeEvent, useState } from "react";
import { useQuotes } from "../../hooks/useQuotes"; // Assuming you have this hook
// import { Header } from "../header";
import { TypedCharactersTest } from "./typed-characters-test"; 
export default function MainTeste() {
  const { quote, author } = useQuotes();
  const [type, setType] = useState<string>("");

  function handleType(event: ChangeEvent<HTMLTextAreaElement>) {
    const typedText = event.target.value;
    setType(typedText);
  }

  return (
    <main className="w-4/5 p-32">
      <TypedCharactersTest typedText={type} quote={quote} author={author} />
      <textarea
        onChange={handleType}
        name="typingTeste"
        id="typingTeste"
        className="z-0 w-full bg-gray-800 text-zinc-300"
      />
    </main>
  );
}