import { Caret } from "./caret"

interface TypedCharactersProps {
    typedText: string,
    // className: string,
    isWrong: boolean
}

export function TypedCharacters({typedText, isWrong}: TypedCharactersProps) {
    const TypedCharacters = typedText.split("")
    
    return (
        <div className="absolute inset-0">
            {TypedCharacters.map((char: any, index: any) => {
                return (
                    <Character key={`${char}_${index}`} char={char} isWrong={isWrong} />
                )
            })}
            
            <Caret wrongChar={isWrong} />
        </div>
    )
}

const Character = ({char, isWrong}: {char: string, isWrong: boolean}) => {
    return (
        <span className={`${isWrong ? 'text-red-500 underline': 'text-zinc-100'}`}>{char}</span>
    )
}