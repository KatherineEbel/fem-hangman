import { Link } from '@remix-run/react'

export default function PlayButton() {
  return (
    <Link
      className="btn-hover-overlay purple-btn h-40 w-40 rounded-full md:h-48 md:w-48"
      to="/select-category"
    >
      <span className="sr-only">Play Game</span>
      <img src="/images/icon-play.svg" alt="play" className="h-auto w-1/3" />
    </Link>
  )
}
