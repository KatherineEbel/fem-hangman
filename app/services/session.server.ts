import { createCookieSessionStorage, Session } from '@remix-run/cloudflare'
import {sessions} from '~/drizzle/schema.server'
import { drizzle } from 'drizzle-orm/d1'

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: 'hangman_session',
    sameSite: 'lax',
    path: '/',
    httpOnly: process.env.NODE_ENV === 'production',
    secrets: [process.env.SESSION_SECRET ?? 's3cr3t'],
    maxAge: 60 * 60 * 24,
  },
})

export async function ensureDbSession(session: Session, env: Env) {
  const db = drizzle(env.DB)
  let sessionId = session.get('id') as string
  if (!sessionId) {
    const dbSession = await db.insert(sessions).values({}).returning({id: sessions.id})
    sessionId = dbSession[0].id
  }
  return sessionId
}

export const { getSession, commitSession, destroySession } = sessionStorage
