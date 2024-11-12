import { redirect, Session } from '@remix-run/cloudflare'

import { GameStatus, MAX_HEALTH } from '~/lib/types'
import { commitSession, destroySession } from '~/services/session.server'
import { DrizzleD1Database } from 'drizzle-orm/d1'
import { categories, hangmanWords, sessions, sessionWords } from '~/drizzle/schema.server'
import { and, eq, notInArray } from 'drizzle-orm'

type DrizzleDB = DrizzleD1Database<Record<string, never>> & {   $client: D1Database }

export function deriveGameStatus(
  health: number,
  answer: string,
  guesses: string,
): GameStatus {
  if (health === 0) {
    return 'lost'
  }
  const letters = [...new Set(answer.replace(/ /g, '').toUpperCase())]
  const allLettersGuessed = letters.every((letter) => guesses.includes(letter))
  if (allLettersGuessed) {
    return 'won'
  }
  return 'playing'
}

export function getSessionData(session: Session) {
  const id = session.get('id') as string
  const answer = session.get('answer') as string
  const category = session.get('category') as string
  const guesses = session.get('guesses') ?? ''
  const health = session.get('health')
    ? Number(session.get('health'))
    : MAX_HEALTH
  return { answer, category, guesses, health, id }
}

export async function selectRandomWord(
  sessionId: string,
  categoryName: string,
  db:DrizzleDB,
): Promise<string | null> {
  const availableWords = await db.select({
    id: hangmanWords.id,
    name: hangmanWords.name,
  })
  .from(hangmanWords)
  .leftJoin(categories, eq(hangmanWords.categoryId, categories.id))
  .where(
      and(
          notInArray(
              hangmanWords.id, db.select({
                wordId: sessionWords.wordId,
              })
              .from(sessionWords)
              .where(eq(sessionWords.sessionId, sessionId))
          ),
          eq(categories.name, categoryName),
      )
  )
  .all()
  if (availableWords.length === 0) {
    console.log('No words available')
    return null
  }
  const randomIndex = Math.floor(Math.random() * availableWords.length)
  const selectedWord = availableWords[randomIndex]
  await db.insert(sessionWords).values({sessionId, wordId: selectedWord.id}).execute()
  return selectedWord.name
}

export async function handleGuess(guess: string, session: Session) {
  const sessionData = getSessionData(session)
  const isCorrect = sessionData.answer.toUpperCase().includes(guess)
  const health = Math.max(
    isCorrect ? sessionData.health : sessionData.health - 1,
    0,
  )
  session.set('health', health)
  const newGuesses = sessionData.guesses.includes(guess)
    ? sessionData.guesses
    : sessionData.guesses + guess
  session.set('guesses', newGuesses)
  session.set(
    'status',
    deriveGameStatus(health, sessionData.answer, newGuesses),
  )
  return redirect('/play', {
    headers: {
      'Set-Cookie': await commitSession(session, {
        expires: new Date(Date.now() + 60 * 60 * 24),
      }),
    },
  })
}

export async function handlePlayAgain(session: Session, db: DrizzleDB) {
  const { category, id } = getSessionData(session)
  const newAnswer = await selectRandomWord(id, category, db)
  session.set('answer', newAnswer)
  session.set('health', MAX_HEALTH)
  session.set('guesses', '')
  session.set('status', 'playing')

  return redirect('/play', {
    headers: {
      'Set-Cookie': await commitSession(session, {
        expires: new Date(Date.now() + 60 * 60 * 24),
      }),
    },
  })
}

export async function handleQuit(session: Session, db: DrizzleDB) {
  const { id } = getSessionData(session)
  try {
    await db.delete(sessions).where(eq(sessions.id, id))
  } catch (e) {
    console.log(e)
  }
  return redirect('/', {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  })
}

export async function togglePaused(session: Session) {
  const paused = session.get('status') === 'paused'
  session.set('status', paused ? 'playing' : 'paused')
  return redirect('/play', {
    headers: {
      'Set-Cookie': await commitSession(session, {
        expires: new Date(Date.now() + 60 * 60 * 24),
      }),
    },
  })
}
