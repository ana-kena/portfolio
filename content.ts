/**
 * ALL the text on the site lives in this file.
 *
 * Text inside [[double brackets]] is a GUESS that needs confirming.
 * It shows up highlighted in yellow on the site, with a "Draft" bar at the top.
 * Ship the site only when no brackets are left (run `npm run check`).
 */

export const person = {
  name: "Vanelle Baneaken",
  role: "Full-stack developer",
  location: "Yaoundé, Cameroon",
  email: "anaisvanelle@gmail.com",
  github: { label: "github.com/ana-kena", href: "https://github.com/ana-kena" },
};

export const hero = {
  headline: "I build web apps that stay fast on slow networks and older Android phones.",
  intro:
    "For three years at dancycodes I built production platforms, live products and open-source Laravel packages for users in Cameroon, who pay for every megabyte.",
};

/**
 * The meter in the hero shows what THIS page costs to load.
 * The numbers are measured from the production build with `npm run weigh`.
 * Re-run it after big changes and paste the new figures here.
 */
export const pageWeight = {
  budgetKB: 200,
  readableKB: 23, // HTML + CSS + font: what the phone needs before it can show the page
  totalKB: 123, // everything, including JavaScript, compressed as it travels
};

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  period?: string;
  problem?: string;
  built?: string;
  forSlowNetworks?: string[];
  results?: string[];
  links: { label: string; href: string }[];
};

export const work: CaseStudy[] = [
  {
    id: "gale-hyper",
    title: "Gale and Hyper",
    summary:
      "Open-source Laravel packages for reactive interfaces without a JavaScript framework or a separate API. MIT licensed, installed through Composer.",
    role: "Creator",
    stack: ["Laravel", "PHP", "Alpine.js", "Datastar", "Packagist"],
    problem:
      "Making a Laravel page interactive usually means adopting React or Vue and building a JSON API for it. That doubles the code and the JavaScript a phone has to download.",
    built:
      "Gale lets a controller update the page directly: change Alpine.js state, swap Blade fragments, navigate without full reloads and stream progress for long jobs. Hyper does the same with Datastar. Gale now powers DancyMeals and DancyGifts.",
    results: ["Gale: 159+ installs", "Hyper: 114+ installs"],
    links: [
      { label: "Gale docs", href: "https://dancycodes.com/gale" },
      { label: "Gale on GitHub", href: "https://github.com/dancycodes/gale" },
      { label: "Hyper docs", href: "https://laravel-hyper.com" },
    ],
  },
  {
    id: "dancygifts",
    title: "DancyGifts",
    summary:
      "A community gifting platform: participants pool money in a session, and one of them receives the total.",
    role: "Full stack",
    stack: ["Laravel", "Gale", "Alpine.js", "Mobile Money"],
    period: "2026",
    built:
      "Participants join a session with a contribution and a lucky number. When the session closes, a verifiable formula picks the recipient, so nobody can manipulate the result, and the payout goes out by Mobile Money.",
    links: [{ label: "Visit dancygifts.com", href: "https://www.dancygifts.com" }],
  },
  {
    id: "jangirde",
    title: "Jangirde",
    summary:
      "An online platform for learning Fulfulde, the Adamawa dialect spoken in Cameroon. Built by dancycodes for Fufulde Class, with lessons, audio, exercises and paid subscription plans.",
    role: "Full stack, including payments",
    stack: ["Flutterwave API", "Mobile Money", "Webhooks"],
    problem:
      "Learners buy plans from 9,900 FCFA for a month to 96,000 FCFA for a year. In Cameroon they pay with MTN Mobile Money or Orange Money; abroad, with Visa, Mastercard or PayPal. A Mobile Money payment is approved on the learner's phone, outside the website, so the platform has to wait for that approval before unlocking the plan.",
    built:
      "I built the platform end to end, including a single Flutterwave checkout for all five payment methods. Each payment is verified on the server through Flutterwave's webhooks before the plan is unlocked, so nobody gets access without paying and nobody pays without getting access.",
    forSlowNetworks: [
      "The server confirms each payment, so a learner's access never depends on the page staying open on a weak connection",
    ],
    results: ["500+ active learners", "5 payment methods in one checkout"],
    links: [{ label: "Visit jangirde.com", href: "https://jangirde.com" }],
  },
  {
    id: "dancymeals",
    title: "DancyMeals",
    summary:
      "A marketplace for homemade meals: customers order from local cooks for delivery or pickup and pay with Mobile Money; cooks manage their dishes and orders online.",
    role: "Front end",
    stack: ["Gale", "Alpine.js", "Mobile Money"],
    period: "2026",
    links: [{ label: "Visit dancymeals.com", href: "https://dancymeals.com" }],
  },
  {
    id: "in-mboa",
    title: "IN-MBOA",
    summary: "A live web platform, installable to the phone's home screen.",
    role: "Full stack",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [{ label: "Visit in-mboa.com", href: "https://in-mboa.com" }],
  },
];

export const approach = {
  title: "How I build for slow connections",
  items: [
    {
      title: "Keep pages light",
      text: "This page is readable after 23 KB. Every kilobyte costs a user on mobile data time and money.",
    },
    {
      title: "Let the server do the work",
      text: "Gale and Hyper send small HTML updates from the server instead of shipping a large JavaScript app to the phone.",
    },
    {
      title: "Use the payments people have",
      text: "Jangirde, DancyGifts and DancyMeals all take Mobile Money, the way most people in Cameroon pay online.",
    },
    {
      title: "Confirm money on the server",
      text: "Payments are verified through webhooks, so a dropped connection never loses a payment or an order.",
    },
  ],
};

export const experience = [
  {
    period: "Mar 2023 – Jul 2026",
    title: "Web developer",
    org: "dancycodes",
    text: "Built the studio's own products (DancyGifts, DancyMeals' front end), its open-source packages Gale and Hyper, its website dancycodes.com, and client platforms including Jangirde and IN-MBOA. Worked directly with clients to turn their feedback into features.",
  },
];

export const education = [
  { period: "2021 – 2023", title: "Master's degree in Software Engineering", org: "IAI Cameroun" },
  { period: "2018 – 2021", title: "Bachelor's degree in Software Engineering", org: "IAI Cameroun" },
];

export const skills = [
  { group: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Alpine.js"] },
  { group: "Mobile", items: ["React Native"] },
  { group: "Back end", items: ["Laravel", "PHP", "Blade", "Livewire", "Filament", "REST APIs"] },
  { group: "Payments", items: ["Flutterwave", "MTN Mobile Money", "Orange Money"] },
  { group: "Tools", items: ["Git", "GitHub", "Composer", "Packagist"] },
  { group: "Languages", items: ["French (fluent)", "English (fluent)"] },
];
