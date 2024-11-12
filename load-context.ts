import { type PlatformProxy } from "wrangler";
import { AppLoadContext } from '@remix-run/cloudflare'
import { drizzle } from 'drizzle-orm/d1'
import connection from '~/drizzle/client'

type Cloudflare = Omit<PlatformProxy<Env>, "dispose">;

declare module "@remix-run/cloudflare" {
  interface AppLoadContext {
    cloudflare: Cloudflare;
  }
}

type GetLoadContext = (args: {
  request: Request
  context: {
    cloudflare: Cloudflare
    db: ReturnType<typeof drizzle>
  }
}) => Promise<AppLoadContext>

// Shared implementation compatible with Vite, Wrangler, and Cloudflare Pages
export const getLoadContext: GetLoadContext = async ({ context }) => {
  return {
    ...context,
    db: connection(context),
  }
}
