"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { JOURNAL_ENTRIES } from "@/lib/content";

type Entry = (typeof JOURNAL_ENTRIES)[number];

export function JournalFeatured({ entry }: { entry: Entry }) {
  return (
    <section
      className="relative bg-ink py-16 text-chalk md:py-24"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55 md:mb-10"
        >
          <span className="inline-block h-px w-10 bg-chalk/50" />
          01 · The Featured Note
        </motion.p>

        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="group"
        >
          <Link href={`/the-studio/${entry.slug}`} className="block">
            {/* Wide feature image — 16/9 letterbox to differentiate from the
                4/5 portrait cards in the article rows below. */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-onyx">
              <SafeImage
                src={entry.image}
                alt={entry.title}
                fallbackSeed={entry.slug}
                fill
                priority
                sizes="100vw"
                className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.03]"
              />
            </div>

            <div className="mt-10 grid grid-cols-12 gap-6 md:mt-14 md:gap-8">
              <p className="col-span-12 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55 md:col-span-3">
                <span className="inline-block h-px w-8 bg-chalk/50" />
                {entry.kicker}
              </p>
              <h2
                id="featured-heading"
                style={{ fontFamily: "var(--font-serif-display)" }}
                className="col-span-12 text-[clamp(1.75rem,4vw,3.25rem)] font-normal italic leading-[1.1] text-chalk md:col-span-9"
              >
                {entry.title}
              </h2>
              <p className="col-span-12 max-w-xl text-[14px] leading-[1.8] text-chalk/80 md:col-span-6 md:col-start-4 md:text-[15px]">
                {entry.excerpt}
              </p>
              <span className="col-span-12 md:col-span-6 md:col-start-4">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors group-hover:decoration-chalk">
                  Read the essay
                </span>
              </span>
            </div>
          </Link>
        </motion.article>
      </div>
    </section>
  );
}
