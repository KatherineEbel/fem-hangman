import { WordData } from '~/lib/types'
import data from './seed-data.json'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OUTPUT_FILE_PATH = path.join(__dirname, 'seed.sql')
const wordData: WordData = data

function generateSqlStatements(wordData: WordData): string {
  const categories = Object.keys(wordData.categories)
  const categorySqlStatements: string[] = []
  const hangmanWordSqlStatements: string[] = []
  const categoryIdMap: Record<string, number> = {}

  categories.forEach((categoryName, index) => {
    const categorySql = `INSERT INTO categories (name) VALUES ('${categoryName}');`
    categorySqlStatements.push(categorySql)
    const categoryId = index + 1
    categoryIdMap[categoryName] = categoryId

    wordData.categories[categoryName].forEach((wordObj) => {
      const wordSql = `INSERT INTO hangman_words (name, category_id) VALUES ('${wordObj.name}', ${categoryId});`
      hangmanWordSqlStatements.push(wordSql)
    })
  })

  return categorySqlStatements.concat(hangmanWordSqlStatements).join('\n')
}

fs.writeFileSync(OUTPUT_FILE_PATH, generateSqlStatements(wordData))
