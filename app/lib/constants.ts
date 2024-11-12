import { z } from 'zod'

export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const alphabet = letters.split('')

const pause = z.object({
  intent: z.literal('pause'),
})

const guessSchema = z.object({
  intent: z.literal('guess'),
  guess: z
    .string()
    .min(1, { message: 'Guess is required' })
    .max(1, { message: 'Guess can only be one letter' })
    .refine((value) => letters.includes(value.toUpperCase()), {
      message: 'Guess must be a letter',
    }),
})

const playAgainSchema = z.object({
  intent: z.literal('playAgain'),
})

const quitSchema = z.object({
  intent: z.literal('quit'),
})

export const hangmanSchema = z.discriminatedUnion('intent', [
  pause,
  guessSchema,
  playAgainSchema,
  quitSchema,
])

export const category = z.object({
  category: z.string(),
})
