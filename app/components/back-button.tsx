import { Link } from '@remix-run/react'

export default function BackButton() {
  return (
    <Link
      className="purple-btn-sm h-10 w-10 rounded-full pb-1 md:h-16 md:w-16 lg:h-24 lg:w-24"
      to="/"
    >
      <span className="sr-only">Go Back</span>
      <img
        src="/images/icon-back.svg"
        alt="back arrow"
        className="h-4 md:h-7"
      />
    </Link>
  )
}
