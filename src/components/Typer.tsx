"use client";

import { useRef, useState } from "react";

type TyperProps = {
  children: React.ReactNode;
  quote: string;
  wordsTyped: (data: number) => void;
};

export default function Typer({ quote, wordsTyped }: TyperProps) {
  const [currWordInput, setCurrWordInput] = useState("");
  const [activeWord, setActiveWord] = useState(0);
  //const [activeWordpos, setActiveWordpos] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const quoteArr = quote.split(" ");

  function onInputdo(event: any) {
    const curr_word = (event.target as HTMLInputElement).value;
    setCurrWordInput(curr_word);
  }

  function focusInput() {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }

  function nextWord() {
    wordsTyped(activeWord + 1);
    setCurrWordInput("");
    setActiveWord(activeWord + 1);
    if (inputRef.current != null) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="border-8 border-solid" onClick={focusInput}>
      {quoteArr.map((word, wordIndex) => {
        if (wordIndex == activeWord) {
          let error = false;
          return (
            <div className="inline border-2 border-blue-500" key={wordIndex}>
              {Array.from(word).map((value, index) => {
                if (currWordInput[index] == value) {
                  return (
                    <span className="border-x-2 opacity-30" key={index}>
                      {" "}
                      {value}{" "}
                    </span>
                  );
                } else if (currWordInput[index] == undefined) {
                  return (
                    <span className="border-x-2" key={index}>
                      {" "}
                      {value}{" "}
                    </span>
                  );
                } else {
                  error = true;
                  return (
                    <span className="border-x-2 text-red-500" key={index}>
                      {" "}
                      {value}{" "}
                    </span>
                  );
                }
              })}

              {Array.from(currWordInput)
                .slice(word.length)
                .map((value, index) => {
                  if (value == " " && index == 0 && !error) {
                    nextWord();
                  } else {
                    return (
                      <span className="border-x-2 text-red-500" key={index}>
                        {" "}
                        {value}{" "}
                      </span>
                    );
                  }
                })}
            </div>
          );
        } else if (wordIndex < activeWord) {
          return (
            <div className="inline border-2 border-blue-500" key={wordIndex}>
              {Array.from(word).map((value, index) => {
                return (
                  <span className="border-x-2 opacity-30" key={index}>
                    {" "}
                    {value}{" "}
                  </span>
                );
              })}
            </div>
          );
        } else {
          return (
            <div className="inline border-2 border-blue-500" key={wordIndex}>
              {Array.from(word).map((value, index) => {
                return (
                  <span className="border-x-2" key={index}>
                    {" "}
                    {value}{" "}
                  </span>
                );
              })}
            </div>
          );
        }
      })}

      {/* {{Array.from(userInput).map((value, index) => {
        if (quoteArr[index] == value)
          return (
            <div className="flex border-x-2 opacity-35" key={index}>
              {value}
            </div>
          );
        else if (index == count) {
          return (
            <div className="flex border-x-2 underline" key={index}>
              {value}
            </div>
          );
        } else {
          return (
            <div className="flex border-x-2 text-red-500" key={index}>
              {quoteArr[index]}
            </div>
          );
        }
      })}

      <div className="inline">|</div>

      {quoteArr.slice(count).map((value, index) => {
        return (
          <div className="flex border-x-2" key={index}>
            {value}
          </div>
        );
      })}
      <label> {count} </label>} */}
      <input
        ref={inputRef}
        className="absolute pointer-events-none"
        onInput={(e) => {
          onInputdo(e);
        }}
      ></input>
    </div>
  );
}
