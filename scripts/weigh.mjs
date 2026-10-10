// Measures what the home page costs to download, compressed (gzip),
// the way a phone actually receives it. Run after `npm run build`.
import { readFileSync, existsSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { join } from "node:path";

const out = "out";
const html = readFileSync(join(out, "index.html"));
// Skip `noModule` scripts: only very old browsers download those.
const legacy = new Set([...html.toString().matchAll(/<script src="([^"]+)" noModule/g)].map((m) => m[1]));
const refs = [...html.toString().matchAll(/(?:href|src)="(\/_next\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((r) => !legacy.has(r));
const unique = [...new Set(refs)].filter((r) => existsSync(join(out, r)));

const kb = (b) => b / 1024;
// Fonts and images are already compressed; servers send them as they are.
const size = (buf, path) =>
  /\.(woff2?|webp|png|jpe?g|avif)$/.test(path) ? buf.length : gzipSync(buf, { level: 9 }).length;

let readable = size(html, "index.html");
let js = 0;
// Screenshots are lazy-loaded, so they are not part of the page weight. Count what a phone
// downloads for them: the smallest file in each srcset, or the plain src.
let shots = 0;
for (const tag of html.toString().match(/<img [^>]*>/g) ?? []) {
  const srcset = tag.match(/srcset="([^"]+)"/i)?.[1];
  const src = srcset
    ? srcset.split(",").map((c) => c.trim().split(/\s+/)).sort((x, y) => parseInt(x[1]) - parseInt(y[1]))[0][0]
    : tag.match(/src="([^"]+)"/)?.[1];
  if (src?.startsWith("/") && existsSync(join(out, src))) shots += readFileSync(join(out, src)).length;
}
const rows = [["index.html", readable]];
for (const r of unique) {
  const buf = readFileSync(join(out, r));
  const s = size(buf, r);
  rows.push([r, s]);
  if (r.endsWith(".js")) js += s;
  else readable += s;
}
for (const [p, s] of rows) console.log(kb(s).toFixed(1).padStart(7), "KB ", p);
console.log("\nreadable (HTML + CSS + font):", Math.round(kb(readable)), "KB");
console.log("JavaScript:", Math.round(kb(js)), "KB");
console.log("total:", Math.round(kb(readable + js)), "KB");
console.log("screenshots on a phone (load on scroll):", Math.round(kb(shots)), "KB");
console.log("\nPaste into content.ts → pageWeight: readableKB:", Math.round(kb(readable)), " totalKB:", Math.round(kb(readable + js)), " shotsPhoneKB:", Math.round(kb(shots)));
