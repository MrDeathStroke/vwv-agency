# vwv.agency

The Muscle of VWV — productized sprint shop. Fixed-scope, fixed-price AI
and automation sprints with weekly receipts on Cycle Time, OPEX, and
Manual Error Rate.

**Stack:** Vite · React 19 · TypeScript · Tailwind v4 · GSAP · Motion · Resend

## Run

```bash
npm install
npm run dev   # http://localhost:5174
```

## Deploy

Wired to Vercel via git. Pushes to `main` auto-deploy.

```bash
npx vercel --prod
```

## Environment

See `.env.example`. Required for the inquiry form:
- `RESEND_API_KEY`
- `RESEND_FROM` (must use a verified Resend domain)
- `RESEND_INBOX` (where inquiries land)

## Architecture

```
vwv-agency/
├── api/
│   └── inquiry.ts          Edge function — POST /api/inquiry
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          Nav, Footer, VMark, AnimatedVMark, ScrollToHash
│   ├── hooks/useSystemTheme System prefers-color-scheme tracker
│   ├── lib/gsap.ts
│   ├── sections/            Hero, SprintTiers, Process, Receipts, Stack, Faq, BookCall
│   ├── index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── vercel.json
└── vite.config.ts
```

## Difference from valuewithvelocity.com

| | valuewithvelocity.com (Mind) | vwv.agency (Muscle) |
|---|---|---|
| Default theme | Dark | Light |
| Voice | Editorial, philosophical | Direct, product-led |
| Sections | Hero · Thesis · Principles · Dispatches | Hero · Sprints · Process · Receipts · Stack · FAQ · Book |
| Purpose | High-intent lead capture via dispatches | Conversion via sprint config |
