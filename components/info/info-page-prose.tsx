"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export type ProseSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: Array<string | { label: string; body: string }>;
};

type Props = {
  sections: ProseSection[];
  // Optional closing CTA — e.g. "Still have a question? Write to the studio."
  closing?: {
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
  // Optional last-updated stamp shown above the first section — relevant for
  // policy / legal pages where currency of the document matters.
  lastUpdated?: string;
  // Treats `{ label, body }` bullets as full Q&A pairs: question becomes the
  // dominant line (sentence case, display face), answer flows beneath, each
  // pair separated by a hairline. Other info pages keep the small-caps
  // "term/definition" treatment, which is correct for shipping zones,
  // return reasons, care steps, etc.
  variant?: "default" | "faq";
};

// Shared body for footer-linked info pages. Takes a list of sections and
// renders them as an editorial two-column reading experience: section
// heading on the left (sticky on wide viewports), prose and bullets on the
// right. Section bodies accept either plain strings for bullets, or
// `{ label, body }` for term/definition pairs (returns reasons, FAQ-style
// mini-items, shipping zones, etc.).
export function InfoPageProse({
  sections,
  closing,
  lastUpdated,
  variant = "default"
}: Props) {
  const isFaq = variant === "faq";
  return (
    <section className="bg-ink py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-14 lg:px-20">
        {lastUpdated && (
          <p className="mb-16 text-[10px] uppercase tracking-[0.32em] text-chalk/50 md:mb-20">
            Last updated · {lastUpdated}
          </p>
        )}

        <div className="space-y-24 md:space-y-28">
          {sections.map((section, i) => (
            <motion.div
              key={(section.heading ?? "section") + i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14"
            >
              {section.heading && (
                <div className="md:col-span-4">
                  <h2 className="font-display text-[clamp(1.25rem,2.2vw,1.75rem)] font-light uppercase leading-[1.15] tracking-[0.04em] text-chalk md:sticky md:top-28">
                    {section.heading}
                  </h2>
                </div>
              )}

              <div
                className={
                  section.heading
                    ? "md:col-span-7 md:col-start-6"
                    : "md:col-span-10 md:col-start-2"
                }
              >
                {section.paragraphs?.map((p, pi) => (
                  <p
                    key={pi}
                    className="mb-6 text-[14px] leading-[1.85] text-chalk/80 last:mb-0 md:text-[15px]"
                  >
                    {p}
                  </p>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul
                    className={
                      isFaq
                        ? section.paragraphs && section.paragraphs.length > 0
                          ? "mt-10 divide-y divide-chalk/10 border-t border-chalk/10"
                          : "divide-y divide-chalk/10 border-y border-chalk/10"
                        : section.paragraphs && section.paragraphs.length > 0
                          ? "mt-8 space-y-5"
                          : "space-y-5"
                    }
                  >
                    {section.bullets.map((b, bi) =>
                      typeof b === "string" ? (
                        <li
                          key={bi}
                          className="flex gap-4 text-[14px] leading-[1.85] text-chalk/80 md:text-[15px]"
                        >
                          <span
                            aria-hidden
                            className="mt-[0.65em] inline-block h-px w-5 shrink-0 bg-chalk/50"
                          />
                          <span>{b}</span>
                        </li>
                      ) : isFaq ? (
                        <li key={bi} className="py-7 md:py-8">
                          <p className="font-display text-[clamp(1rem,1.4vw,1.2rem)] font-light leading-[1.35] tracking-[0.005em] text-chalk">
                            {b.label}
                          </p>
                          <p className="mt-4 text-[13.5px] leading-[1.9] text-chalk/75 md:text-[14.5px]">
                            {b.body}
                          </p>
                        </li>
                      ) : (
                        <li key={bi}>
                          <p className="text-[10px] uppercase tracking-[0.28em] text-chalk/60">
                            {b.label}
                          </p>
                          <p className="mt-2 text-[14px] leading-[1.85] text-chalk/80 md:text-[15px]">
                            {b.body}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {closing && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-28 border-t border-chalk/15 pt-16 text-left md:mt-32"
          >
            <p className="max-w-xl text-[14px] leading-[1.85] text-chalk/80 md:text-[15px]">
              {closing.body}
            </p>
            <Link
              href={closing.ctaHref}
              className="cta-rule mt-8 inline-block text-chalk"
            >
              {closing.ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
