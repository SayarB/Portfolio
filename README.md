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
