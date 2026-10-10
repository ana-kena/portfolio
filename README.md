# Portfolio

Next.js 15 (App Router) + TypeScript + Tailwind CSS 4, exported as a static site.
No images, no tracking scripts, one self-hosted font. The home page is readable after 24 KB.

## 1. Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

## 2. Fill in your details

All text is in **`content.ts`**. Anything written as `[[like this]]` is a guess and shows
highlighted in yellow on the page, with a "Draft" bar at the top.

- Guess is right: delete the brackets.
- Guess is wrong: rewrite the text, then delete the brackets.

```bash
npm run check      # lists every guess still left
```

The Draft bar disappears on its own once no brackets remain.

## 3. Re-measure the page weight

The meter in the hero uses real numbers from the production build. After big changes:

```bash
npm run build
npm run weigh      # prints readableKB and totalKB
```

Paste the two numbers into `pageWeight` in `content.ts`, then build again.

## 4. Deploy (free)

1. Push this folder to a new GitHub repository.
2. On vercel.com, choose **Add New → Project**, import the repository, keep the defaults, deploy.
3. Optional: add your own domain in the project settings.

## 5. Before you send the link

- Run Google PageSpeed Insights (mobile) on the live URL and on in-mboa.com. Note the scores;
  they make strong numbers for the case studies, the CV and the cover letter.
- Open the site on an older Android phone over mobile data.
- Make the GitHub repo public: the code itself is part of the portfolio.

## Files

| File | What it is |
| --- | --- |
| `content.ts` | Every word on the site |
| `app/page.tsx` | Page layout and the case study component |
| `components/WeightMeter.tsx` | The page-weight meter (pure HTML/CSS, no JavaScript) |
| `components/T.tsx` | Renders text and highlights `[[guesses]]` |
| `app/globals.css` | Colour tokens (light and dark) and the font setup |
| `scripts/weigh.mjs` | Measures the compressed download size of the built page |
| `scripts/check.mjs` | Lists guesses left to confirm |
