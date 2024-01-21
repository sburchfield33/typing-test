interface ResultsProps {
  wordsTyped: number;
}

export default function Results({ wordsTyped }: ResultsProps) {
  return <h1>The amount of words typed: {wordsTyped}</h1>;
}
