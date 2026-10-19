"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";
import { JOURNAL_ENTRIES } from "@/lib/content";

type Entry = (typeof JOURNAL_ENTRIES)[number];

export function JournalArticleRow({
  entry,
  index,
  mirror = false
}: {
  entry: Entry;
  index: number;
  mirror?: boolean;
}) {
  // The featured entry is 01; article rows begin at 02.
  const displayNumber = String(index + 2).padStart(2, "0");

  return (
    <section
      className="relative bg-ink py-20 text-chalk md:py-28"
      aria-labelledby={`entry-${entry.slug}-heading`}
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="group grid grid-cols-1 items-center gap-10 md:grid-cols-12 md:gap-16"
        >
          {/* Image column — 7 cols wide, position flips on `mirror`. */}
          <Link
            href={`/the-studio/${entry.slug}`}
            className={clsx(
              "relative block aspect-[4/5] w-full overflow-hidden bg-onyx md:col-span-7",
              mirror ? "md:col-start-6" : "md:col-start-1"
            )}
          >
            <SafeImage
              src={entry.image}
              alt={entry.title}
              fallbackSeed={entry.slug}
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
            />
          </Link>

          {/* Text column — 4 cols, anchored opposite the image. */}
          <div
            className={clsx(
              "md:col-span-4",
              mirror ? "md:col-start-1 md:row-start-1" : "md:col-start-9"
            )}
          >
            <p className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55">
              <span className="inline-block h-px w-10 bg-chalk/50" />
              {displayNumber} · {entry.kicker}
            </p>

            <h3
              id={`entry-${entry.slug}-heading`}
              style={{ fontFamily: "var(--font-serif-display)" }}
              className="mt-6 text-[clamp(1.5rem,2.75vw,2.5rem)] font-normal italic leading-[1.15] text-chalk"
            >
              <Link
                href={`/the-studio/${entry.slug}`}
                className="transition-opacity hover:opacity-70"
              >
                {entry.title}
              </Link>
            </h3>

            <p className="mt-6 max-w-md text-[13px] leading-[1.8] text-chalk/75 md:text-[14px]">
              {entry.excerpt}
            </p>

            <Link
              href={`/the-studio/${entry.slug}`}
              className="mt-8 inline-block text-[11px] font-semibold uppercase tracking-[0.24em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors hover:decoration-chalk"
            >
              Read the essay
            </Link>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
