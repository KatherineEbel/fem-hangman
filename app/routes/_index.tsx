import { MetaFunction } from '@remix-run/cloudflare'

import MainMenu from '~/components/main-menu'

export const meta: MetaFunction = () => {
  return [
    { title: 'The Hangman Game' },
    { name: 'description', content: 'The Hangman Game' },
  ]
}

export default function Index() {
  return (
    <main className="grid h-screen place-items-center px-6">
      <MainMenu />
    </main>
  )
}
