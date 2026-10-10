// Lists every [[guess]] still left in content.ts. Ship only when this prints none.
import { readFileSync } from "node:fs";

const lines = readFileSync("content.ts", "utf8").split("\n");
let count = 0;
lines.forEach((line, i) => {
  if (line.trim().startsWith("*") || line.trim().startsWith("//")) return;
  for (const m of line.matchAll(/\[\[(.+?)\]\]/g)) {
    count++;
    console.log(`line ${i + 1}: ${m[1]}`);
  }
});
console.log(count ? `\n${count} guesses left to confirm.` : "No guesses left. Ready to ship.");
process.exitCode = count ? 1 : 0;
