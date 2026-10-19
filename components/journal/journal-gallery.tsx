"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue
} from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import type { JOURNAL_ENTRIES } from "@/lib/content";

type Entry = (typeof JOURNAL_ENTRIES)[number];

export function JournalGallery({ entries }: { entries: readonly Entry[] }) {
  // Grid-wide scroll progress — each tile taps into this to drift with a
  // slightly different amplitude, so the whole wall breathes as you scroll.
  const gridRef = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"]
  });

  return (
    <section
      id="intro"
      className="relative bg-ink py-40 text-chalk md:py-56"
      aria-labelledby="journal-gallery-heading"
    >
      {/* Wide container, generous horizontal padding for strong negative space
          around the whole grid. */}
      <div className="mx-auto max-w-editorial px-6 md:px-24 lg:px-40">
        {/* Centred header cluster — matches Collection/Edit/House pattern. */}
        <div className="mx-auto mb-28 flex max-w-3xl flex-col items-center text-center md:mb-40">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
          >
            <span className="inline-block h-px w-10 bg-chalk/50" />
            Notes from the House
            <span className="inline-block h-px w-10 bg-chalk/50" />
          </motion.p>

          <motion.h2
            id="journal-gallery-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.06em]"
          >
            The Studio
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-md text-[11px] uppercase leading-[1.9] tracking-[0.18em] text-chalk/80 md:text-[12px]"
          >
            Essays, guides and portraits — quiet notes on the pieces.
          </motion.p>
        </div>

        {/* Portrait tiles, wide horizontal gaps for negative space. Small
            tiles get a subtle scroll-driven Y drift that alternates direction
            column-by-column — the whole wall breathes like the Studio 99 ref. */}
        <ul
          ref={gridRef}
          className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-24"
        >
          {entries.map((entry, i) => (
            <GalleryTile
              key={entry.slug}
              entry={entry}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function GalleryTile({
  entry,
  index,
  scrollYProgress
}: {
  entry: Entry;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Column-driven parallax amplitude — left col drifts up, middle sits close
  // to neutral, right col drifts down. Alternating on every row keeps the
  // wall from reading as three uniform columns.
  const col = index % 3;
  const amp = col === 0 ? 40 : col === 1 ? 16 : 32;
  const dir = (index + col) % 2 === 0 ? 1 : -1;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${amp * dir}px`, `${-amp * dir}px`]
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.65,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ y }}
    >
      <Link
        href={`/the-studio/${entry.slug}`}
        className="group relative block aspect-square w-full overflow-hidden bg-onyx"
      >
        {/* Image — slow scale on hover for the cinematic reveal. */}
        <SafeImage
          src={entry.image}
          alt={entry.title}
          fallbackSeed={entry.slug}
          fill
          sizes="(min-width: 1024px) 26vw, (min-width: 640px) 42vw, 100vw"
          className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.06]"
        />

        {/* Dark wash — fades in on hover to hold the text. */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent opacity-0 transition-opacity duration-500 ease-silk group-hover:opacity-100" />

        {/* Text overlay — kicker + title slide up together from the bottom edge
            only on hover. Fully hidden at rest. */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-6 md:p-8">
          <div className="translate-y-6 opacity-0 transition-[transform,opacity] duration-500 ease-silk group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/75">
              {entry.kicker}
            </p>
            <h3 className="mt-3 font-display text-[clamp(1rem,1.25vw,1.25rem)] font-semibold uppercase leading-[1.15] tracking-[0.06em] text-chalk">
              {entry.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.li>
  );
}
