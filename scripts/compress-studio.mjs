// One-shot: transcode .png/.jpg/.jpeg → .webp (q=82) under the given roots,
// then delete the originals. Idempotent — safe to re-run.
// Usage:  node scripts/compress-studio.mjs public/Studio public/images/sculptures ...
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOTS = process.argv.slice(2).length > 0 ? process.argv.slice(2) : ["public/Studio"];
const EXTS = new Set([".png", ".jpg", ".jpeg"]);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (EXTS.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = ROOTS.flatMap((r) => (existsSync(r) ? walk(r) : []));
let totalIn = 0;
let totalOut = 0;

for (const f of files) {
  const inSize = statSync(f).size;
  const outPath = f.replace(/\.(png|jpe?g)$/i, ".webp");
  if (existsSync(outPath) && outPath !== f) {
    // Already converted — remove the stale original and skip.
    unlinkSync(f);
    continue;
  }
  await sharp(f).webp({ quality: 82, effort: 6 }).toFile(outPath);
  const outSize = statSync(outPath).size;
  totalIn += inSize;
  totalOut += outSize;
  unlinkSync(f);
  console.log(
    `${f.padEnd(60)}  ${(inSize / 1024).toFixed(0).padStart(5)}K -> ${(outSize / 1024).toFixed(0).padStart(5)}K`
  );
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB (${totalIn ? (100 - (totalOut / totalIn) * 100).toFixed(1) : "0"}% smaller)`
);
