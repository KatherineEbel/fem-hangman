import { useSubmit } from '@remix-run/react'
import React from 'react'

import { alphabet } from '~/lib/constants'

export default function Keyboard({ guesses }: { guesses: string }) {
  const submit = useSubmit()

  React.useEffect(() => {
    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      const letter = event.key.toUpperCase()
      if (alphabet.includes(letter) && !guesses.includes(letter)) {
        submit({ intent: 'guess', guess: letter }, { method: 'post' })
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [guesses, submit])

  return (
    <div className="keyboard grid grid-cols-9 gap-x-2 gap-y-6 md:gap-6">
      {alphabet.map((letter, index) => (
        <button
          key={index}
          className="keyboard-btn grid h-14 w-7 place-items-center rounded-lg bg-white text-2xl uppercase text-accent transition-colors duration-300 enabled:hover:bg-primary enabled:hover:text-white disabled:pointer-events-none disabled:bg-opacity-25 md:h-16 md:w-20 md:rounded-3xl md:text-heading-md lg:h-20 lg:w-28"
          disabled={guesses.includes(letter.toUpperCase())}
          type="button"
          onClick={() =>
            submit({ intent: 'guess', guess: letter }, { method: 'post' })
          }
          tabIndex={guesses.includes(letter.toUpperCase()) ? -1 : 0}
        >
          {letter}
        </button>
      ))}
    </div>
  )
}
