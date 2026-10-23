// One-shot: transcode /public/Studio/**/*.png → .webp at q=82, delete the
// originals. Run with: node scripts/compress-studio.mjs
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/Studio";

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (extname(name).toLowerCase() === ".png") out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let totalIn = 0;
let totalOut = 0;

for (const f of files) {
  const inSize = statSync(f).size;
  const outPath = f.replace(/\.png$/i, ".webp");
  if (existsSync(outPath)) {
    // Skip anything already converted — makes the script idempotent.
    continue;
  }
  await sharp(f).webp({ quality: 82, effort: 6 }).toFile(outPath);
  const outSize = statSync(outPath).size;
  totalIn += inSize;
  totalOut += outSize;
  unlinkSync(f);
  console.log(
    `${f.padEnd(55)}  ${(inSize / 1024).toFixed(0).padStart(5)}K -> ${(outSize / 1024).toFixed(0).padStart(5)}K`
  );
}

console.log(
  `\nTotal: ${(totalIn / 1024 / 1024).toFixed(2)} MB -> ${(totalOut / 1024 / 1024).toFixed(2)} MB (${(100 - (totalOut / totalIn) * 100).toFixed(1)}% smaller)`
);
