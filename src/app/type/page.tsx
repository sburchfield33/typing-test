"use client";

import NewQuoteButton from "@/components/NewQuoteButtons";
import Typer from "@/components/Typer";
import { useState, useRef } from "react";

export default function Main() {
  const [quote, setQuote] = useState("Hello world");
  const [wordsTyped, setWordsTyped] = useState(0);
  const [currWordInput, setCurrWordInput] = useState("");
  const [activeWord, setActiveWord] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
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

  function beginNewGame() {
    setGameFinished(false);
    setWordsTyped(0);
    setActiveWord(0);
    console.log(gameFinished);
  }

  async function getQuote() {
    await fetch("https://api.api-ninjas.com/v1/quotes?category=", {
      headers: {
        "X-Api-Key": "qcqfQblrmvj2NdzmgUtq0g==vuuViBuKa9S28JOQ",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((quote) => setQuote(quote[0].quote));
      beginNewGame();
  }

  function nextWord() {
    setWordsTyped(activeWord + 1);
    setCurrWordInput("");
    setActiveWord(activeWord + 1);
    if (activeWord == quoteArr.length - 1) {
      setGameFinished(true);
    }
    if (inputRef.current != null) {
      inputRef.current.value = "";
    }
  }
  return (
    <div className="h-screen" onClick={focusInput}>
      {!gameFinished && (
        <div className="border-8 border-solid">
          {quoteArr.map((word, wordIndex) => {
            if (wordIndex == activeWord) {
              let error = false;
              return (
                <div
                  className="inline border-2 border-blue-500"
                  key={wordIndex}
                >
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
                <div
                  className="inline border-2 border-blue-500"
                  key={wordIndex}
                >
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
                <div
                  className="inline border-2 border-blue-500"
                  key={wordIndex}
                >
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
            autoFocus
            ref={inputRef}
            className="absolute pointer-events-none"
            onInput={(e) => {
              onInputdo(e);
            }}
          ></input>
        </div>
      )}
      <div> The amount of words you have typed {wordsTyped} </div>
      {gameFinished && (
        <button onClick={beginNewGame}>
          Begin a new typing game with the same words
        </button>
      )}
      {gameFinished && <button onClick={getQuote}>Change the quote you are typing</button>}
    </div>
  );
}
