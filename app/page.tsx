import { person, hero, work, approach, experience, education, skills, type CaseStudy } from "@/content";
import { T, hasProposals, plain } from "@/components/T";
import { WeightMeter } from "@/components/WeightMeter";

// True while any [[guess]] is left in content.ts. Shows a reminder bar so a draft never ships unnoticed.
const isDraft = hasProposals(JSON.stringify({ person, hero, work, approach, experience, skills }));

export default function Home() {
  return (
    <div className="mx-auto max-w-[68rem] px-4 sm:px-8">
      {isDraft && (
        <p className="mt-4 border border-dashed border-ink/50 px-3 py-2 text-sm">
          Draft. <mark className="proposal">Highlighted text</mark> is a guess about your work. Confirm or
          correct it in <code>content.ts</code>, then remove the brackets. This bar disappears when none are
          left.
        </p>
      )}
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line py-5">
        <p className="font-display text-xl">
          <T>{person.name}</T>
        </p>
        <nav aria-label="Sections" className="flex gap-5 text-sm">
          <a href="#work">Work</a>
          <a href="#approach">Approach</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="pt-14 pb-16 sm:pt-20">
          <p className="text-muted">
            {person.role}, <T>{person.location}</T>
          </p>
          <h1 className="mt-3 max-w-[18ch] font-display text-[2.6rem] leading-[1.02] tracking-[-0.01em] sm:text-[4.25rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-[38rem] text-lg">
            <T>{hero.intro}</T>
          </p>
          <WeightMeter />
        </section>

        <section id="work" aria-labelledby="work-title" className="border-t border-ink py-14">
          <h2 id="work-title" className="font-display text-3xl">
            Selected work
          </h2>
          <div className="mt-4 divide-y divide-line">
            {work.map((c) => (
              <Case key={c.id} c={c} />
            ))}
          </div>
        </section>

        <section id="approach" aria-labelledby="approach-title" className="border-t border-ink py-14">
          <h2 id="approach-title" className="font-display text-3xl">
            {approach.title}
          </h2>
          <dl className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {approach.items.map((a) => (
              <div key={a.title} className="min-w-0 max-w-[30rem]">
                <dt className="font-semibold">{a.title}</dt>
                <dd className="mt-1 text-muted">
                  <T>{a.text}</T>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="experience" aria-labelledby="exp-title" className="border-t border-ink py-14">
          <h2 id="exp-title" className="font-display text-3xl">
            Experience
          </h2>
          <ol className="mt-8 grid gap-8">
            {experience.map((e) => (
              <li key={e.org} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <p className="text-sm text-muted tabular-nums sm:pt-1">
                  <T>{e.period}</T>
                </p>
                <div className="min-w-0 max-w-[40rem]">
                  <h3 className="text-lg font-semibold">
                    <T>{e.title}</T>, <T>{e.org}</T>
                  </h3>
                  <p className="mt-1">
                    <T>{e.text}</T>
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-display text-2xl">Education</h3>
          <ol className="mt-4 grid gap-3">
            {education.map((e) => (
              <li key={e.title} className="grid gap-1 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <p className="text-sm text-muted tabular-nums sm:pt-0.5">{e.period}</p>
                <p className="min-w-0">
                  <span className="font-semibold">{e.title}</span>, {e.org}
                </p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-display text-2xl">Skills</h3>
          <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-[11rem_1fr]">
            {skills.map((s) => (
              <div key={s.group} className="contents">
                <dt className="text-sm text-muted sm:pt-0.5">{s.group}</dt>
                <dd className="mb-2 min-w-0 sm:mb-0">
                  {s.items.map((it, i) => (
                    <span key={it}>
                      <T>{it}</T>
                      {i < s.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="contact" aria-labelledby="contact-title" className="border-t border-ink py-14">
          <h2 id="contact-title" className="font-display text-3xl">
            Contact
          </h2>
          <p className="mt-4 max-w-[36rem]">
            I&apos;m looking for a remote role on a small team building for users like the ones I already
            serve. The fastest way to reach me is email.
          </p>
          <ul className="mt-6 grid gap-2 text-lg">
            <li>
              <a href={`mailto:${person.email.replace(/\[|\]/g, "")}`}>
                <T>{person.email}</T>
              </a>
            </li>
            <li>
              <a href={person.github.href}>
                <T>{person.github.label}</T>
              </a>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

function Case({ c }: { c: CaseStudy }) {
  const hasDetail = Boolean(c.problem || c.built || c.forSlowNetworks?.length || c.results?.length);
  return (
    <article id={c.id} className="grid gap-6 py-10 lg:grid-cols-[17rem_1fr] lg:gap-12">
      <div className={hasDetail ? "min-w-0" : "min-w-0 lg:col-span-2 lg:max-w-[42rem]"}>
        <h3 className="font-display text-[2rem] leading-tight">{c.title}</h3>
        <p className="mt-2">
          <T>{c.summary}</T>
        </p>
        <dl className="mt-5 grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-sm">
          <dt className="text-muted">Role</dt>
          <dd className="min-w-0">
            <T>{c.role}</T>
          </dd>
          {c.period && (
            <>
              <dt className="text-muted">When</dt>
              <dd className="tabular-nums">
                <T>{c.period}</T>
              </dd>
            </>
          )}
          <dt className="text-muted">Stack</dt>
          <dd className="min-w-0">
            {c.stack.map((s, i) => (
              <span key={s}>
                <T>{s}</T>
                {i < c.stack.length - 1 ? ", " : ""}
              </span>
            ))}
          </dd>
        </dl>
        {c.links.length > 0 && (
          <p className="mt-5 flex flex-wrap gap-4 font-semibold">
            {c.links.map((l) => (
              <a key={l.href} href={plain(l.href)}>
                <T>{l.label}</T>
              </a>
            ))}
          </p>
        )}
      </div>

      {hasDetail && (
        <div className="grid min-w-0 max-w-[42rem] content-start gap-5">
          {c.problem && (
            <Block label="The problem">
              <T>{c.problem}</T>
            </Block>
          )}
          {c.built && (
            <Block label="What I built">
              <T>{c.built}</T>
            </Block>
          )}
          {c.forSlowNetworks && c.forSlowNetworks.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">For slow networks</h4>
              <ul className="mt-1 grid gap-1.5 pl-5 [list-style-type:square] marker:text-signal">
                {c.forSlowNetworks.map((f) => (
                  <li key={f}>
                    <T>{f}</T>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {c.results && c.results.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-muted">Results</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {c.results.map((r) => (
                  <li key={r} className="border border-ink/60 px-2.5 py-1 text-sm">
                    <T>{r}</T>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-muted">{label}</h4>
      <p className="mt-1">{children}</p>
    </div>
  );
}
