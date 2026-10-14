"use client";

import { motion } from "framer-motion";
import { EditSection } from "@/components/edit/edit-section";
import type { EditSelection, Product } from "@/lib/content";

type Props = {
  edits: Array<{ edit: EditSelection; products: Product[] }>;
};

// Closing beat on the category page — pulls the relevant editorial picks
// from /edit directly into the bottom of the category page so visitors
// landing here get the magazine-style take without a separate navigation
// step. Prefaced by a small, centred header; then the same EditSection
// layout the main /edit page uses, with alternating mirror.
export function CategoryEditStrip({ edits }: Props) {
  if (edits.length === 0) return null;

  return (
    <>
      <section
        className="relative border-t border-chalk/10 bg-ink pt-24 text-chalk md:pt-32"
        aria-labelledby="category-edit-heading"
      >
        <div className="mx-auto max-w-3xl px-6 text-center md:px-14">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
          >
            From The Edit
          </motion.p>

          <motion.h2
            id="category-edit-heading"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-[1.1] tracking-[0.04em]"
          >
            This season, in context
          </motion.h2>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-10 block h-px w-14 origin-center bg-chalk/40"
          />
        </div>
      </section>

      {edits.map(({ edit, products }, i) => (
        <EditSection
          key={edit.slug}
          id={`category-edit-${edit.slug}`}
          number={edit.number}
          title={edit.title}
          intro={edit.intro}
          products={products}
          mirror={i % 2 === 1}
        />
      ))}
    </>
  );
}
