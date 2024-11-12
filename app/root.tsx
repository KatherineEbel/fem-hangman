import type { LinksFunction } from '@remix-run/cloudflare'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'

import './tailwind.css'
import fonts from './fonts.css?url'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: fonts,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
      <div className="relative flex min-h-svh w-full max-w-screen-desktop flex-col justify-center bg-mobile bg-auto bg-center md:bg-tablet lg:mx-auto lg:bg-desktop">
        {children}
        <a
            className="mx-auto flex-grow-0 pb-2"
            rel="noreferrer"
            target="_blank"
            href="https://www.flaticon.com/free-icons/hangman"
            title="hangman icons"
        >
            <span className="text-center text-sm tracking-[3px] md:text-base">
              Hangman icons created by Smashicons - Flaticon
            </span>
        </a>
      </div>
      <ScrollRestoration />
      <Scripts />
      </body>
      </html>
  )
}

export default function App() {
  return <Outlet />
}
