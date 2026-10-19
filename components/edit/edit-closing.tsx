"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function EditClosing() {
  return (
    <section
      className="relative bg-ink pt-32 pb-16 text-chalk md:pt-44 md:pb-20"
      aria-labelledby="edit-closing-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center md:px-14">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          The Full House
        </motion.p>

        <motion.h2
          id="edit-closing-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-md font-semibold uppercase leading-[1.05] tracking-[0.005em]"
        >
          Beyond the edit
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[13px] leading-[1.8] text-chalk/70 md:text-[14px]"
        >
          The pieces above are a small window. The full collection lives on its own page —
          showpieces and mirrors, catalogued.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.2, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Link href="/collections" className="cta-outline text-chalk">
            Explore the collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
