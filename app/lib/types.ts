export const MAX_HEALTH = 8

export type GameStatus = 'playing' | 'won' | 'lost' | 'paused'

export type GameState = {
  answer: string
  category: string
  guesses: string
  health: number
}

export interface HangmanWord {
  name: string
  selected: boolean
}

export interface Category {
  [categoryName: string]: HangmanWord[]
}

export interface WordData {
  [category: string]: Category
}

export type PlayGameResponse = {
  answer: string
  guesses: string
  health: number
}

export type PlayGameErrorResponse = {
  error: string
}

export type GuessResponse = PlayGameResponse | PlayGameErrorResponse
