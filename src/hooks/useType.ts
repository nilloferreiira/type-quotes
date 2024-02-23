import { useCallback, useEffect, useRef, useState } from "react"

export function useType(enabled: boolean) {
    const [cursor, setCursor] = useState(0)
    const [type, setType] = useState<string>("")
    const totalTyped = useRef(0);

    const keyDownHandler = useCallback(() => {}, []);

   
    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);

        return () => {
            window.removeEventListener("keydown", keyDownHandler);
        }
    }, [keyDownHandler])
}