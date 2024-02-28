export interface ResultsProps {
  results: {
    mistakes: number;
    wpm: number;
    cpm: number;
    accurency: number;
  };
}

export function Results({
  results: { accurency, cpm, mistakes, wpm },
}: ResultsProps) {
  return (
    <div className="w-4/5 flex justify-around text-lg font-normal text-zinc-400 mx-auto mb-10 text-center">
      <div>
        <p>Mistakes:</p>
        <span className="font-semibold">{mistakes}</span>
      </div>
      <div>
        <p>WPM:</p>
        <span className="font-semibold">{wpm}</span>
      </div>
      <div>
        <p>CPM:</p>
        <span className="font-semibold">{cpm}</span>
      </div>
      <div>
        <p>Accurency</p>
        <span className="font-semibold">{accurency}%</span>
      </div>
    </div>
  );
}
