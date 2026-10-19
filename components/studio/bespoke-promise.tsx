"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";

// A quiet editorial beat between the process and the enquiry form. Image on
// one side, a few short facts on the other — timeline, scale, what we don't
// do. Settles expectations before anyone writes.
export function BespokePromise() {
  return (
    <section
      className="relative bg-ink text-chalk"
      aria-labelledby="bespoke-promise-heading"
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-14 md:py-32 lg:gap-24">
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-onyx md:col-span-7"
        >
          <SafeImage
            src="/images/sculptures/scu3.png"
            alt="A sculptural commission in progress at the studio"
            fallbackSeed="bespoke-promise"
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            quality={72}
            className="object-cover"
          />
        </motion.figure>

        <div className="md:col-span-5">
          <motion.p
            id="bespoke-promise-heading"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.38em] text-chalk/55"
          >
            The House Promise
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light uppercase leading-[1.1] tracking-[0.015em]"
          >
            Few pieces, finished slowly
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[13px] leading-[1.9] text-chalk/75 md:text-[14px]"
          >
            The studio accepts a limited number of private commissions each year.
            Each is drawn, agreed, and made by the same hands that author the
            house's regular line — bronze, marble, travertine, cast plaster,
            glass, wood. Pieces are typically finished in six to twelve months.
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 divide-y divide-chalk/10 border-y border-chalk/10"
          >
            {[
              { label: "Typical timeline", value: "6 – 12 months" },
              { label: "Minimum commission", value: "On application" },
              { label: "Materials", value: "Marble · Bronze · Travertine · Wood" },
              { label: "Delivery", value: "India + select international" }
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between gap-6 py-4"
              >
                <dt className="text-[10px] uppercase tracking-[0.3em] text-chalk/50">
                  {row.label}
                </dt>
                <dd className="text-right text-[12px] tracking-[0.04em] text-chalk/85">
                  {row.value}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  );
}
