#!/usr/bin/env node
/**
 * One-off compressor for image folders under /public.
 *
 * - Walks the given folder recursively.
 * - For every .png / .jpg / .jpeg over MIN_BYTES, resizes to MAX_WIDTH (only
 *   downscales — never upscales) and re-encodes with reasonable quality.
 * - Writes to a temp file first, verifies it's actually smaller, then
 *   overwrites the original. Skips files that don't win.
 *
 * Run with:
 *   node scripts/compress-images.mjs                   # default: public/images
 *   node scripts/compress-images.mjs public/Studio     # any subfolder
 *   node scripts/compress-images.mjs public            # entire public tree
 */
import { readdir, stat, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const TARGET_ARG = process.argv[2] ?? "public/images";
const IMAGES_DIR = path.resolve(PROJECT_ROOT, TARGET_ARG);

const MIN_BYTES = 500 * 1024; // only touch files >500KB
const MAX_WIDTH = 2400;       // downscale ceiling — enough for retina hero
const PNG_OPTS = { compressionLevel: 9, palette: true, quality: 82 };
const JPG_OPTS = { quality: 82, mozjpeg: true };

/** Recursively list files under `dir`. */
async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

function fmt(bytes) {
  return (bytes / 1024).toFixed(0) + " KB";
}

async function compressOne(file) {
  const s = await stat(file);
  if (s.size < MIN_BYTES) return null;

  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;

  const tmp = file + ".tmp";
  const pipeline = sharp(file, { failOnError: false })
    .rotate() // respect EXIF orientation
    .resize({ width: MAX_WIDTH, withoutEnlargement: true });

  if (ext === ".png") await pipeline.png(PNG_OPTS).toFile(tmp);
  else await pipeline.jpeg(JPG_OPTS).toFile(tmp);

  const newSize = (await stat(tmp)).size;
  if (newSize >= s.size) {
    await unlink(tmp);
    return { file, before: s.size, after: s.size, skipped: true };
  }
  await rename(tmp, file);
  return { file, before: s.size, after: newSize, skipped: false };
}

async function main() {
  const files = await walk(IMAGES_DIR);
  let totalBefore = 0, totalAfter = 0, touched = 0;
  for (const f of files) {
    try {
      const r = await compressOne(f);
      if (!r) continue;
      totalBefore += r.before;
      totalAfter += r.after;
      const rel = path.relative(IMAGES_DIR, r.file);
      if (r.skipped) {
        console.log(`  skip  ${rel}  (already optimal at ${fmt(r.before)})`);
      } else {
        touched++;
        const pct = (100 * (1 - r.after / r.before)).toFixed(0);
        console.log(`  ok    ${rel}  ${fmt(r.before)} -> ${fmt(r.after)}  (-${pct}%)`);
      }
    } catch (err) {
      console.error(`  err   ${f}`, err.message);
    }
  }
  const saved = totalBefore - totalAfter;
  console.log(
    `\nDone. Touched ${touched} file(s). Saved ${fmt(saved)} total (` +
    `${fmt(totalBefore)} -> ${fmt(totalAfter)}).`
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
