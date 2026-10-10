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
const size = (buf, path) => (/\.woff2?$/.test(path) ? buf.length : gzipSync(buf, { level: 9 }).length);

let readable = size(html, "index.html");
let js = 0;
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
console.log("\nPaste into content.ts → pageWeight: readableKB:", Math.round(kb(readable)), " totalKB:", Math.round(kb(readable + js)));
