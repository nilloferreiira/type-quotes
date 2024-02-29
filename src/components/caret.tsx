// export function Caret() {
//     return (
//         <div className={`w-0.5 h-7 ml-1 inline-block animate-pulse bg-sky-600`} />
//     )
// }

export function Caret({className}: {className: string}) {
    return (
      <div
        className={`w-0.5 h-7 inline-block animate-pulse bg-sky-600 absolute top-1.5 ${className}`}
      />
    );
  }
  