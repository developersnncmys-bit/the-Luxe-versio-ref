"use client";

import { motion } from "framer-motion";

export function EditIntro() {
  return (
    <section
      className="relative bg-ink py-28 text-chalk md:py-40"
      aria-labelledby="edit-intro-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center md:px-14">
        <motion.p
          id="edit-intro-heading"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          In-house · Made by the House
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(0.9rem,1.2vw,1.125rem)] font-light leading-[1.6] text-chalk/85 md:leading-[1.7]"
        >
          The Edit is not a curation of outside work. Every piece here is designed and
          made in-house — carved by the studio, shaped by our hands, signed by the house.
          Each season, a handful of these in-house pieces sit at the front of the collection.
        </motion.p>
      </div>
    </section>
  );
}
