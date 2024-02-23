import { useEffect, useState } from "react";

interface QuoteProps {
    quote: string,
    author: string,
    //function handleNewQuote()
}

export function useQuotes(): QuoteProps {
    const [quote, setQuote] = useState<string>("");
    const [author, setAuthor] = useState<string>("");

    useEffect(()=> {
        const getQuote = async () => {
            const response  = await fetch("https://api.quotable.io/random");
            const data =  await response.json()
            setAuthor(data.author)
            setQuote(data.content)
        }

        getQuote()
    }, [])

    //function handleNewQuote()

    return { quote, author }
}