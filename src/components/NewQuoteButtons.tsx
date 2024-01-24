type NewQuoteButton = {
  setQuote: (data: string) => void;
};

function NewQuoteButton({ setQuote }: NewQuoteButton) {
  async function getQuote() {
    await fetch("https://api.api-ninjas.com/v1/quotes?category=", {
      headers: {
        "X-Api-Key": "qcqfQblrmvj2NdzmgUtq0g==vuuViBuKa9S28JOQ",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((quote) => setQuote(quote[0].quote));
  }

  return <button onClick={getQuote}>Change the quote you are typing</button>;
}

export default NewQuoteButton;
