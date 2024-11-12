import { clsx } from 'clsx'
import React from 'react'

const Letter = ({
  letter,
  disabled,
}: {
  letter: string
  disabled: boolean
}) => {
  return (
    <div
      className={clsx(
        `playable-letter duration- grid h-16 w-10 place-items-center rounded-xl bg-primary text-4xl uppercase transition-transform duration-500 md:h-28 md:w-[88px] md:rounded-[40px] md:text-heading-lg lg:h-32 lg:w-28`,
        disabled ? 'bg-primary/25' : 'animate-flipIn',
      )}
    >
      {disabled ? '' : letter}
      {!disabled ? (
        <>
          <div className="absolute inset-0 -z-10 before:absolute before:h-1 before:w-1 before:animate-sparkle before:rounded-full before:bg-white before:opacity-0 after:absolute after:h-1 after:w-1 after:animate-sparkle2 after:rounded-full after:bg-white after:opacity-0"></div>
        </>
      ) : null}
    </div>
  )
}

export default function PlayableLetters({
  answer,
  guesses,
}: {
  answer: string
  guesses: string
}) {
  const words = React.useMemo(() => answer.split(' '), [answer])

  return (
    <div className="flex flex-wrap gap-x-28 gap-y-3">
      {words.map((word, index) => (
        <div key={index} className="flex flex-1 justify-center gap-1">
          {word.split('').map((letter, index) => (
            <Letter
              key={index}
              letter={letter}
              disabled={!guesses.includes(letter.toUpperCase())}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
