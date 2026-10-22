#!/usr/bin/env node
/**
 * Generate .webp sidecars for every .png / .jpg in a public folder.
 *
 * Why sidecars (not replace): the source files are still referenced by
 * absolute path across the codebase (lib/content.ts, hero posters, etc.).
 * SafeImage swaps the extension to .webp at render time; if the WebP is
 * missing it falls back gracefully through Next's optimizer path.
 *
 * Why skip the Next optimizer: Vercel's /_next/image endpoint runs sharp
 * in a cold serverless function (500ms–2s per unique URL on first hit).
 * A pre-generated .webp served as a plain CDN asset bypasses that entirely.
 *
 * Idempotent: skips files whose .webp already exists and is newer than
 * the source.
 *
 * Run with:
 *   node scripts/generate-webp.mjs                 # default: public
 *   node scripts/generate-webp.mjs public/Studio   # scoped
 */
import { readdir, stat, access, utimes } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const TARGET_ARG = process.argv[2] ?? "public";
const ROOT_DIR = path.resolve(PROJECT_ROOT, TARGET_ARG);

const QUALITY = 78;      // visibly identical to the source PNG on dark bg
const MAX_WIDTH = 2000;  // enough headroom for retina-2x on any realistic viewport
const EFFORT = 5;        // 0..6 — 5 is a reasonable size/time trade

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

async function exists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function needsRegen(src, dest) {
  if (!(await exists(dest))) return true;
  const [s, d] = await Promise.all([stat(src), stat(dest)]);
  return s.mtimeMs > d.mtimeMs;
}

function fmtKb(bytes) { return `${Math.round(bytes / 1024).toLocaleString()} KB`; }

async function makeWebp(src) {
  const ext = path.extname(src).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) return null;
  const dest = src.replace(/\.(png|jpe?g)$/i, ".webp");
  if (!(await needsRegen(src, dest))) return { src, dest, skipped: true };

  await sharp(src, { failOnError: false })
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: EFFORT })
    .toFile(dest);

  const [srcStat, destStat] = await Promise.all([stat(src), stat(dest)]);
  return { src, dest, before: srcStat.size, after: destStat.size };
}

async function main() {
  console.log(`\n→ Generating .webp sidecars under ${path.relative(PROJECT_ROOT, ROOT_DIR)}`);
  console.log(`  quality: ${QUALITY} · max-width: ${MAX_WIDTH}px · effort: ${EFFORT}\n`);

  let generated = 0, skipped = 0, totalBefore = 0, totalAfter = 0;
  for await (const f of walk(ROOT_DIR)) {
    try {
      const r = await makeWebp(f);
      if (!r) continue;
      if (r.skipped) { skipped++; continue; }
      generated++;
      totalBefore += r.before;
      totalAfter += r.after;
      const rel = path.relative(PROJECT_ROOT, r.src);
      const pct = Math.round((1 - r.after / r.before) * 100);
      console.log(`  ok    ${rel}  ${fmtKb(r.before)} → ${fmtKb(r.after)}  (-${pct}%)`);
    } catch (err) {
      console.error(`  err   ${f}  ${err.message}`);
    }
  }

  console.log(`\n─ Summary ─`);
  console.log(`  generated:  ${generated}`);
  console.log(`  skipped:    ${skipped} (webp already up to date)`);
  if (generated) {
    const saved = totalBefore - totalAfter;
    console.log(`  before:     ${fmtKb(totalBefore)} (${(totalBefore / 1024 / 1024).toFixed(1)} MB)`);
    console.log(`  after:      ${fmtKb(totalAfter)} (${(totalAfter / 1024 / 1024).toFixed(1)} MB)`);
    console.log(`  saved:      ${fmtKb(saved)} (${Math.round((saved / totalBefore) * 100)}%)`);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
