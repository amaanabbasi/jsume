# amaanabbasi.me

Personal portfolio of Amaan Abbasi. The landing page is a chat: visitors see a Claude-style prompt box under the name, pick a suggested question (or type one), and get an answer that streams in as if typed by me. The rest of the page covers focus areas, selected work, experience, testimonials and contact.

Built with Next.js 14 (App Router), TypeScript, Tailwind CSS and Framer Motion. Deployed on Netlify.

## Run it locally

Requires Node.js 18.17+ and pnpm 8.

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

Production check (the same build Netlify runs):

```bash
pnpm build && pnpm start
```

Lint with the repo's ESLint config:

```bash
npx eslint app components data lib        # add --fix to auto-format
```

## Editing content

Everything visitors read lives in two files:

| File | What it holds |
| --- | --- |
| `data/profile.ts` | Name, tagline, email and social links, focus areas, projects and metrics, experience, education, skills, testimonials |
| `data/chat.ts` | Chat categories, the pre-written questions and answers, follow-up suggestions, and the rotating placeholder prompts |

Answers support a small markdown subset: blank-line paragraphs, `- ` and `1. ` lists, `**bold**` and `[links](url)`. Typed questions are matched to the closest answer by the `keywords` on each entry (`lib/chat.ts`); anything without a confident match gets the fallback answer.

## Project structure

```
app/
  layout.tsx          fonts, metadata (Open Graph, JSON-LD), theme bootstrap
  page.tsx            page composition
  globals.css         color tokens (light + dark), chat typography, illustration animations
components/
  chat/ChatHero.tsx   greeting, conversation state, follow-ups
  chat/Composer.tsx   prompt box, suggestion panel, keyboard navigation
  chat/Messages.tsx   user bubble and streaming assistant answer
  chat/RichText.tsx   renders a partially streamed answer
  sections.tsx        Focus, Work, Experience, Testimonials, Contact, Footer
  Nav.tsx             sticky nav and theme toggle
  Glyphs.tsx          small animated illustrations for the focus cards
  ui.tsx              Reveal, CountUp, SectionHeading, AskChatButton
data/                 site content (see above)
lib/chat.ts           question matching and answer parsing
public/               favicon, social preview image (og.png), robots.txt, sitemap.xml
```

Animations respect `prefers-reduced-motion`. The theme follows the system setting until the visitor picks one with the toggle.

## Deployment

`netlify.toml` builds with `pnpm run build` using `@netlify/plugin-nextjs`. The Netlify project deploys `main` automatically, so merging to `main` publishes the site.

The legacy Vue résumé app under `src/` (with `vite.config.ts` and `index.html`) is not part of the Next.js build.

## License

[MIT](LICENSE)
