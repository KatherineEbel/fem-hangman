import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import {
  data,
  LoaderFunctionArgs,
  MetaFunction,
  redirect,
} from '@remix-run/cloudflare'
import { Form, useActionData, useLoaderData, useSubmit } from '@remix-run/react'
import { clsx } from 'clsx'
import React from 'react'

import GameMenu from '~/components/game-menu'
import HealthBar from '~/components/health-bar'
import Keyboard from '~/components/keyboard'
import PlayableLetters from '~/components/playable-letters'
import { hangmanSchema } from '~/lib/constants'
import { GameStatus, MAX_HEALTH } from '~/lib/types'
import {
  handleGuess,
  handlePlayAgain,
  handleQuit,
  togglePaused,
} from '~/services/hangman.server'
import { getSession } from '~/services/session.server'
import connection from '~/drizzle/client'

export const meta: MetaFunction = () => {
  return [
    { title: 'Play Hang Man' },
    { name: 'description', content: 'Hangman App' },
  ]
}

function isGameStatus(s: string): s is GameStatus {
  return ['playing', 'won', 'lost', 'paused'].includes(s)
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get('Cookie'))
  const category = session.get('category') as string
  const answer = session.get('answer') as string
  const status = session.get('status') as string

  if (!category || !answer || !isGameStatus(status)) {
    return redirect('/')
  }

  const guesses = String(session.get('guesses')) ?? ''
  const health = Number(session.get('health')) ?? MAX_HEALTH
  return data({ answer, category, health, guesses, status })
}

export const action = async ({ request, context }: LoaderFunctionArgs) => {
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: hangmanSchema })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const db = connection(context)
  const session = await getSession(request.headers.get('Cookie'))
  switch (submission.value.intent) {
    case 'guess':
      return handleGuess(submission.value.guess, session)
    case 'playAgain':
      return handlePlayAgain(session, db)
    case 'quit':
      return handleQuit(session, db)
    case 'pause':
      return togglePaused(session)
  }
}

export default function Play() {
  const lastResult = useActionData<typeof action>()
  const id = React.useId()
  const submit = useSubmit()
  const [form] = useForm({
    id,
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: hangmanSchema })
    },
  })

  const { category, health, guesses, answer, status } =
    useLoaderData<typeof loader>()
  const pulseClass =
    status !== 'playing'
      ? ''
      : health > 3
        ? 'animate-pulseHeartSlow'
        : 'animate-pulseHeartFast'

  return (
    <Form
      method="post"
      {...getFormProps(form)}
      className="flex flex-1 flex-col"
    >
      <div className="overlay absolute inset-0" />
      <GameMenu gameStatus={status} />
      <div className="relative z-10 flex flex-1 flex-col px-6 py-8 md:px-12">
        <header className="flex items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={() => submit({ intent: 'pause' }, { method: 'post' })}
              className="purple-btn-sm h-14 w-14 rounded-full md:h-16 md:w-16 lg:h-24 lg:w-24"
            >
              <span className="sr-only">Pause Menu</span>

              <img src="/images/icon-menu.svg" alt="menu" className="w-1/3" />
            </button>
            <h1 className="text-nowrap text-4xl md:text-heading-md md:tracking-wide">
              {category}
            </h1>
          </div>
          <div className="ml-auto flex items-center gap-4">
            <HealthBar health={health} />
            <img
              src="/images/icon-heart.svg"
              alt="heart"
              className={clsx('h-6 md:h-auto', pulseClass)}
            />
          </div>
        </header>
        <main className="mt-8 grid flex-1 place-items-center gap-y-8 pb-8">
          <PlayableLetters guesses={guesses} answer={answer} />
          <Keyboard guesses={guesses} />
        </main>
      </div>
    </Form>
  )
}
