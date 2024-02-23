interface caretProps {
    wrongChar: boolean
}

export function Caret({wrongChar}: caretProps) {
    return (
        <div className={`w-0.5 h-7 ml-1 inline-block animate-pulse ${wrongChar ? 'bg-red-600' : 'bg-sky-600' }`} />
    )
}