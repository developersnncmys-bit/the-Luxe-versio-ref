"use client";

import { motion } from "framer-motion";

export function JournalIntro() {
  return (
    <section
      id="intro"
      className="relative bg-ink py-28 text-chalk md:py-40"
      aria-labelledby="journal-intro-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-14">
        <motion.p
          id="journal-intro-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          From the Studio
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "var(--font-serif-display)" }}
          className="text-[clamp(1.125rem,1.75vw,1.5rem)] font-light leading-[1.6] text-chalk/85"
        >
          The studio publishes the writing behind the pieces — how a sculpture
          finds its plinth, why the mantel wants one object and not three,
          the small decisions that make a room feel resolved.
        </motion.p>
      </div>
    </section>
  );
}
