// One-off: convert every PNG under public/Studio2 to WebP in place.
// WebP at q=82 drops these sculpture photos ~70% without visible quality loss
// on a 2k display. Original PNGs are deleted after conversion. Delete this
// script after running — it is not part of the build pipeline.

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/Studio2";
const QUALITY = 82;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (extname(e.name).toLowerCase() === ".png") files.push(full);
  }
  return files;
}

const pngs = await walk(ROOT);
console.log(`Found ${pngs.length} PNGs under ${ROOT}`);

let totalBefore = 0;
let totalAfter = 0;

for (const src of pngs) {
  const dest = src.replace(/\.png$/i, ".webp");
  const beforeStat = await stat(src);
  totalBefore += beforeStat.size;

  await sharp(src)
    .webp({ quality: QUALITY, effort: 5 })
    .toFile(dest);

  const afterStat = await stat(dest);
  totalAfter += afterStat.size;

  await unlink(src);

  const pct = Math.round((1 - afterStat.size / beforeStat.size) * 100);
  console.log(
    `  ${src}  ${(beforeStat.size / 1024).toFixed(0)}kB → ${(afterStat.size / 1024).toFixed(0)}kB (${pct}% smaller)`
  );
}

const mbBefore = (totalBefore / 1024 / 1024).toFixed(1);
const mbAfter = (totalAfter / 1024 / 1024).toFixed(1);
const savedPct = Math.round((1 - totalAfter / totalBefore) * 100);
console.log(`\nTotal: ${mbBefore}MB → ${mbAfter}MB (${savedPct}% smaller)`);
