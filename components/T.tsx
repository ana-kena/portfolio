import { Fragment } from "react";

/**
 * Renders a string from content.ts. Any part written as [[...]] is a guess
 * that still needs confirming, so it is highlighted on the page.
 */
export function T({ children }: { children: string }) {
  const parts = children.split(/\[\[(.+?)\]\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="proposal" title="Guess: confirm or correct in content.ts">
            {part}
          </mark>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

/** Plain text with the brackets removed, for places a highlight can't go (titles, alt text). */
export const plain = (s: string) => s.replace(/\[\[(.+?)\]\]/g, "$1");

export const hasProposals = (s: string) => /\[\[.+?\]\]/.test(s);
