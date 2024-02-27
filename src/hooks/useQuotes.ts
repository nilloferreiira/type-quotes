import { useEffect, useState } from "react";

interface QuoteProps {
    quote: string,
    author: string,
    handleNewQuote: () => void
}

export function useQuotes(): QuoteProps {
    const [quote, setQuote] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    const getQuote = async () => {
        const response  = await fetch("https://api.quotable.io/random");
        const data =  await response.json()
        setAuthor(data.author)
        setQuote(data.content)
    }

    useEffect(()=> {
        getQuote()
    }, [])

    function handleNewQuote() {
        getQuote()
    }

    return { quote, author, handleNewQuote }
}