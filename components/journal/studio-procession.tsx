"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { SafeImage } from "@/components/ui/safe-image";
import type { JournalEntry } from "@/lib/content";

// Cinematic vertical procession — one editorial feature per piece.
// Each feature shows the hero on one side (alternating left/right by index)
// and the entry's kicker + title + excerpt + a thumbnail swatch for every
// additional angle on the other side. Clicking a swatch cross-fades it into
// the hero slot in place — no modal, no page navigation.
export function StudioProcession({ entries }: { entries: JournalEntry[] }) {
  return (
    <section
      id="studio-procession"
      className="relative bg-ink pb-32 pt-32 text-chalk md:pb-56 md:pt-48"
      aria-labelledby="studio-procession-heading"
    >
      {/* Section header — matches the other collection pages. */}
      <div className="mx-auto mb-24 flex max-w-3xl flex-col items-center px-6 text-center md:mb-36 md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          <span className="inline-block h-px w-10 bg-chalk/50" />
          Notes from the House
          <span className="inline-block h-px w-10 bg-chalk/50" />
        </motion.p>

        <motion.h2
          id="studio-procession-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.06em]"
        >
          The Studio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[11px] uppercase leading-[1.9] tracking-[0.18em] text-chalk/80 md:text-[12px]"
        >
          Portraits of the pieces as they leave the floor — hero and every
          angle.
        </motion.p>
      </div>

      {/* The procession — one feature per entry, generous vertical rhythm. */}
      <div className="space-y-28 md:space-y-48">
        {entries.map((entry, i) => (
          <StudioFeature key={entry.slug} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}

function StudioFeature({
  entry,
  index
}: {
  entry: JournalEntry;
  index: number;
}) {
  // Hero + gallery into a single array so the hero appears first in the
  // thumbnail strip and tapping it reverts to the primary view.
  const allImages = [entry.image, ...(entry.gallery ?? [])];
  const [activeImage, setActiveImage] = useState(entry.image);
  const hasAngles = allImages.length > 1;

  // Alternate sides so the procession doesn't read as a column — odd rows
  // get the hero on the right, text on the left.
  const mirror = index % 2 === 1;

  return (
    <article
      aria-labelledby={`studio-feature-${entry.slug}`}
      className="relative"
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 gap-10 px-6 md:grid-cols-12 md:gap-14 md:px-14 lg:gap-20 lg:px-20">
        {/* Hero image column — ~58% viewport width on desktop, portrait
            aspect to flatter tall sculpture photography. Cross-fade on
            thumbnail click via AnimatePresence. */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className={clsx(
            "md:col-span-7",
            mirror ? "md:col-start-6" : "md:col-start-1"
          )}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx">
            <AnimatePresence>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <SafeImage
                  src={activeImage}
                  alt={entry.title}
                  fallbackSeed={`${entry.slug}-${activeImage}`}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  priority={index < 2}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Text + thumbnail swatches column. */}
        <div
          className={clsx(
            "md:col-span-5 md:self-center",
            mirror ? "md:col-start-1 md:row-start-1" : "md:col-start-8"
          )}
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
          >
            <span className="inline-block h-px w-10 bg-chalk/50" />
            {String(index + 1).padStart(2, "0")} · {entry.kicker}
          </motion.p>

          <motion.h3
            id={`studio-feature-${entry.slug}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1.1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="mt-6 font-display text-[clamp(1.5rem,2.75vw,2.75rem)] font-semibold uppercase leading-[1.08] tracking-[0.04em] text-chalk"
          >
            {entry.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 1.2,
              delay: 0.35,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="mt-6 max-w-md text-[13px] leading-[1.85] text-chalk/75 md:text-[14px]"
          >
            {entry.excerpt}
          </motion.p>

          {/* Thumbnail swatches — hero first, then each additional angle.
              Hidden entirely for single-image entries so they read as a
              quieter editorial feature. */}
          {hasAngles && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 1.2,
                delay: 0.45,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="mt-12"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-chalk/50">
                {allImages.length - 1}{" "}
                {allImages.length - 1 === 1 ? "other angle" : "other angles"}
              </p>
              <ul className="flex flex-wrap gap-3">
                {allImages.map((img, i) => {
                  const isActive = activeImage === img;
                  return (
                    <li key={img}>
                      <button
                        type="button"
                        onClick={() => setActiveImage(img)}
                        aria-pressed={isActive}
                        aria-label={
                          i === 0
                            ? `Show primary view of ${entry.title}`
                            : `Show angle ${i} of ${entry.title}`
                        }
                        className={clsx(
                          "relative block h-16 w-16 overflow-hidden bg-onyx transition-opacity md:h-20 md:w-20",
                          isActive ? "opacity-100" : "opacity-55 hover:opacity-100"
                        )}
                      >
                        <SafeImage
                          src={img}
                          alt=""
                          fallbackSeed={`${entry.slug}-thumb-${i}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                        {/* Active-state rule — bottom bar reads as "selected
                            tab" without a jittery ring. */}
                        <span
                          aria-hidden
                          className={clsx(
                            "absolute inset-x-0 bottom-0 h-[2px] transition-opacity",
                            isActive ? "bg-chalk opacity-100" : "opacity-0"
                          )}
                        />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </article>
  );
}
