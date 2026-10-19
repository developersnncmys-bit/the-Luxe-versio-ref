"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type SavoirFairePairItem = {
  // Piece-specific body copy and visual. The shared top heading / kicker is
  // taken from the first item and spans both.
  kicker: string;
  title: string;
  body: string;
  poster: string;
  posterAlt: string;
  href?: string;
  ctaLabel?: string;
};

// Diptych treatment for a category page that wants to highlight two pieces
// side by side (e.g. Sculptures showcasing Majesté and Sillage together as
// "Of The Luxe Version"). Shared eyebrow + heading on top; two editorial
// cards beneath. Falls back to a stacked column on mobile.
export function CategorySavoirFairePair({
  items
}: {
  items: SavoirFairePairItem[];
}) {
  if (items.length === 0) return null;
  // Shared header comes from the first entry so no extra config shape is
  // needed in the parent — both entries just need the same kicker/title.
  const [first] = items;

  return (
    <section
      className="relative bg-ink text-chalk"
      aria-labelledby="savoir-faire-pair-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-24 text-center md:px-14 md:pt-32">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          {first.kicker}
        </motion.p>

        <motion.h2
          id="savoir-faire-pair-heading"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-md font-semibold uppercase leading-[1.05] tracking-[0.03em]"
        >
          {first.title}
        </motion.h2>

        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 block h-px w-14 origin-center bg-chalk/40"
        />
      </div>

      <div className="mx-auto max-w-editorial px-6 pt-16 pb-24 md:px-14 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-2 md:gap-10 lg:gap-14">
          {items.map((item, i) => (
            <PairCard key={item.title + i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PairCard({
  item,
  index
}: {
  item: SavoirFairePairItem;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group flex flex-col"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx">
        <Image
          src={item.poster}
          alt={item.posterAlt}
          fill
          sizes="(min-width: 768px) 46vw, 100vw"
          className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-8 flex flex-col items-start gap-5">
        <p className="text-[13px] leading-[1.85] text-chalk/80 md:text-[14px]">
          {item.body}
        </p>
        {item.href && (
          <Link href={item.href} className="cta-rule mt-2 text-chalk">
            {item.ctaLabel ?? "Discover"}
          </Link>
        )}
      </div>
    </motion.article>
  );
}
