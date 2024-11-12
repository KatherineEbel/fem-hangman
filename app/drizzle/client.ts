import { AppLoadContext } from '@remix-run/cloudflare'
import { drizzle } from 'drizzle-orm/d1'

export default function connection(context: AppLoadContext) {
  return drizzle(context.cloudflare.env.DB)
}
