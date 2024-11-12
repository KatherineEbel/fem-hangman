import { Link } from '@remix-run/react'

import PlayButton from '~/components/play-button'

export default function MainMenu() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center justify-center rounded-[48px] bg-opacity-80 bg-gradient-to-b from-[#344ABA] to-[#001479] px-8 shadow-main-menu md:max-w-md">
      <div className="relative -translate-y-[70px]">
        <h1 className="sr-only">The Hangman Game</h1>
        <img src="/images/logo.svg" alt="The Hangman Game" />
      </div>
      <PlayButton />
      <Link
        to="how-to-play"
        className="btn-hover-overlay heading-sm relative my-14 rounded-full bg-primary px-16 py-3 uppercase shadow-how-to-play-btn before:pointer-events-none before:absolute before:inset-0 before:rounded-full"
      >
        How to Play
      </Link>
    </div>
  )
}
