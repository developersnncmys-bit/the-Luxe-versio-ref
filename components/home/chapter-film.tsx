"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ChapterFilm() {
  return (
    <section
      className="relative bg-ink pt-24 pb-40 md:pt-32 md:pb-56"
      aria-labelledby="chapter-film-heading"
    >
      <motion.figure
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-3xl px-6 md:px-10"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-onyx">
          <Image
            src="/images/Home/studio.png"
            alt="A conversation at the studio"
            fill
            sizes="(min-width: 768px) 48rem, 100vw"
            className="object-cover"
          />
        </div>

        <figcaption className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-3 text-center text-chalk md:mt-10">
          <p className="text-[10px] uppercase tracking-[0.28em] text-chalk/60 md:text-[11px]">
            Film
          </p>
          <h3
            id="chapter-film-heading"
            className="font-display text-[clamp(1.25rem,2vw,2rem)] font-bold uppercase tracking-[0.02em]"
          >
            A Conversation at the Studio
          </h3>
          <p className="text-[11px] uppercase tracking-[0.28em] text-chalk/70">
            With the Artisan
          </p>
          <p className="mt-4 max-w-lg text-[13px] leading-[1.8] text-chalk/70">
            An evening at the studio with the artisan who shaped this collection — on the pieces
            that never date, and the quiet work of making them.
          </p>
        </figcaption>
      </motion.figure>
    </section>
  );
}
