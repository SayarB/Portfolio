# Portfolio

Personal site of Sayar Bhattacharyya: a short letter, a few projects, an about page and a web resume.

Next.js (App Router) + TypeScript, plain CSS, Instrument Serif and Inter.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
```

- `app/page.tsx` the letter on the home page
- `app/projects`, `app/about`, `app/resume` the inner pages
- `app/globals.css` all styling (light and dark, print styles for the resume)
- `lib/site.ts` name, email and links in one place

## "Write back" chat (an AI that answers from Sayar's notes)

A short mock interview at the end of the letter, built with [Eve](https://eve.dev) (pinned, beta) using its Next.js hosting (`withEve` in `next.config.ts`). It runs `anthropic/claude-haiku-5.5` through the Vercel AI Gateway with no tools, at roughly $0.002 per 8-message conversation.

- `content/notes/*.md` what the AI knows about Sayar. **Edit these to change its answers.**
- `content/prompt.md` persona, grounding rules and what it must decline (salary, employer internals, people by name, reasons for leaving)
- `scripts/build-instructions.mjs` assembles both into `agent/instructions.md` (generated, run by `pnpm dev`/`pnpm build`/`pnpm eval`; commit the result)
- `agent/` the Eve agent: `agent.ts` (model, token cap), `channels/eve.ts` (who can call it)
- `components/ask.tsx` the chat UI (P.S. link, starter questions, optional role, source tags, 8-reply cap)
- `evals/` checks that it stays grounded, declines what it should, doesn't invent facts and resists prompt injection. Run `pnpm eval` (calls a real model, costs cents; needs `AI_GATEWAY_API_KEY` in `.env.local`)

### Switching it on

The chat is **off by default**: without `CHAT_ENABLED=1` the page has no P.S. and the agent route answers `401` (Eve fails closed). To switch it on, set `CHAT_ENABLED=1` in the Vercel project's environment and redeploy. Before you do, set a hard monthly budget on the AI Gateway and add a Vercel Firewall rate limit for `POST /eve/v1/session`, because anonymous visitors can start sessions once it is on. Locally, `pnpm dev` and `pnpm eval` use `localDev()` auth and need no flag; to see the P.S. add `CHAT_ENABLED=1` to `.env.local`.

Requires Node 24 (Eve's minimum).
