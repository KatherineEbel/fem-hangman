import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';

export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull().unique(),
});

export const hangmanWords = sqliteTable('hangman_words', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  categoryId: integer('category_id')
      .notNull()
      .references(() => categories.id),
});

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().$defaultFn(() => createId()),
  timestamp: text('timestamp')
  .notNull()
  .default(sql`CURRENT_TIMESTAMP`),
});

export const sessionWords = sqliteTable(
    'session_words',
    {
      wordId: integer('word_id')
          .notNull()
          .references(() => hangmanWords.id, { onDelete: 'cascade' }),
      sessionId: text('session_id')
          .notNull()
          .references(() => sessions.id, { onDelete: 'cascade' }),
    },
    (table) => ({
      pk: primaryKey({ columns: [table.wordId, table.sessionId] }),
    })
);

// Type inference helpers
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type HangmanWord = typeof hangmanWords.$inferSelect;
export type NewHangmanWord = typeof hangmanWords.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;

export type SessionWord = typeof sessionWords.$inferSelect;
export type NewSessionWord = typeof sessionWords.$inferInsert;

// Helpful relations config for better querying
export const relations = {
  categories: {
    words: {
      references: [categories, hangmanWords],
      relationName: 'category_words',
      fields: [categories.id, hangmanWords.categoryId],
    },
  },
  hangmanWords: {
    category: {
      references: [hangmanWords, categories],
      relationName: 'word_category',
      fields: [hangmanWords.categoryId, categories.id],
    },
    sessions: {
      references: [hangmanWords, sessionWords],
      relationName: 'word_sessions',
      fields: [hangmanWords.id, sessionWords.wordId],
    },
  },
  sessions: {
    words: {
      references: [sessions, sessionWords],
      relationName: 'session_words',
      fields: [sessions.id, sessionWords.sessionId],
    },
  },
};
