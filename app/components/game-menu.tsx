import { Link, useSubmit } from '@remix-run/react'
import React from 'react'

import { GameStatus } from '~/lib/types'

const titleMap: Record<GameStatus, string> = {
  won: 'You win',
  lost: 'You lose',
  paused: 'Paused',
  playing: '',
}

export default function GameMenu({ gameStatus }: { gameStatus: GameStatus }) {
  const submit = useSubmit()

  React.useEffect(() => {
    const handleKeyPress = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        submit({ intent: 'pause' }, { method: 'post' })
      }
    }
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [submit])

  if (['playing'].includes(gameStatus)) return null

  return (
    <div className="game-menu absolute inset-0 grid min-h-svh w-full place-items-center px-4">
      <div className="overlay absolute inset-0 z-20" />
      <div className="z-30 flex w-full max-w-sm animate-bounceIn flex-col items-center rounded-[48px] bg-opacity-80 bg-gradient-to-b from-[#344ABA] to-[#001479] px-6 shadow-main-menu md:max-w-md">
        <div className="relative -translate-y-[70px] md:-translate-y-[100px]">
          <h1 className="text-stroke capitalize text-nowrap bg-gradient-to-b from-[#67b6ff] to-white bg-clip-text text-[94px] text-transparent md:text-heading-xl md:tracking-tight">
            {titleMap[gameStatus]}
          </h1>
        </div>
        <div className="relative flex -translate-y-16 flex-col gap-y-8">
          {gameStatus === 'paused' ? (
            <button
              className="btn-hover-overlay rounded-full bg-primary px-16 py-3 text-heading-sm uppercase tracking-wide shadow-how-to-play-btn hover:bg-opacity-25"
              onClick={() => submit({ intent: 'pause' }, { method: 'post' })}
              tabIndex={0}
            >
              Continue
            </button>
          ) : (
            <button
              name="intent"
              value="playAgain"
              className="btn-hover-overlay text-nowrap rounded-full bg-primary px-16 py-3 text-heading-sm uppercase tracking-wide shadow-how-to-play-btn"
              type="submit"
              tabIndex={0}
            >
              Play Again!
            </button>
          )}
          <Link
            to="/select-category"
            className="btn-hover-overlay heading-sm rounded-full bg-primary px-16 py-3 uppercase shadow-how-to-play-btn"
            tabIndex={0}
          >
            New Category
          </Link>
          <button
            tabIndex={0}
            name="intent"
            value="quit"
            className="btn-hover-overlay rounded-full bg-gradient-to-b from-[#FE71FE] to-[#7199FF] px-16 py-3 text-heading-sm uppercase tracking-wide shadow-quit-btn"
          >
            Quit Game
          </button>
        </div>
      </div>
    </div>
  )
}
