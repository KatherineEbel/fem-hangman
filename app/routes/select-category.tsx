import { getFormProps, useForm } from '@conform-to/react'
import { parseWithZod } from '@conform-to/zod'
import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from '@remix-run/cloudflare'
import { Form, useActionData, useLoaderData } from '@remix-run/react'

import BackButton from '~/components/back-button'
import GradientHeading from '~/components/gradient-heading'
import { category } from '~/lib/constants'
import { MAX_HEALTH } from '~/lib/types'
import { selectRandomWord } from '~/services/hangman.server'
import {
  commitSession,
  ensureDbSession,
  getSession,
} from '~/services/session.server'
import { drizzle } from 'drizzle-orm/d1'
import { categories } from '~/drizzle/schema.server'
import { eq } from 'drizzle-orm'
import connection from '~/drizzle/client'

export const action = async ({request, context}: ActionFunctionArgs) => {
  const db = drizzle(context.cloudflare.env.DB)
  const formData = await request.formData()
  const submission = parseWithZod(formData, { schema: category })
  if (submission.status !== 'success') {
    return submission.reply()
  }
  const dbCategory = await db.select({name: categories.name}).from(categories).where(eq(categories.name, submission.value.category)).limit(1)
  if (!dbCategory) {
    return submission.reply({ formErrors: ['Category not found'] })
  }
  const session = await getSession(request.headers.get('Cookie'))
  const sessionId = await ensureDbSession(session, context.cloudflare.env)
  const randomWord = await selectRandomWord(sessionId, dbCategory[0].name, db)
  session.set('id', sessionId)
  session.set('category', dbCategory[0].name)
  session.set('answer', randomWord)
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

export const loader = async ({context}: LoaderFunctionArgs) => {
  const db = connection(context)
  const dbCategories = await db.select({name: categories.name}).from(categories).all()
  return dbCategories.map((category) => category.name)
}

export default function SelectCategory() {
  const categories = useLoaderData<typeof loader>()
  const lastResult = useActionData<typeof action>()
  const [form] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: category })
    },
  })

  return (
    <>
      <div className="overlay absolute inset-0" />
      <div className="relative z-10 flex flex-1 flex-col px-6 py-8">
        <header className="flex items-center">
          <BackButton />
          <div className="flex-1">
            <div className="text-right md:text-center">
              <GradientHeading>Pick a Category</GradientHeading>
            </div>
          </div>
        </header>
        <main className="my-20 flex flex-1">
          <Form
            {...getFormProps(form)}
            method="post"
            className="grid flex-1 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {form.errors ? (
              <div className="rounded-xl bg-red-100 p-4 text-red-600">
                {form.errors.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            ) : null}
            {categories.map((category) => (
              <button
                name="category"
                value={category}
                key={category}
                className="btn-hover-overlay heading-md grid place-items-center text-nowrap rounded-2xl bg-primary py-5 uppercase md:rounded-3xl md:py-6"
                type="submit"
              >
                {category}
              </button>
            ))}
          </Form>
        </main>
      </div>
    </>
  )
}
