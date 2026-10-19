"use client";

import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/safe-image";

export type PromiseRow = { label: string; value: string };

type Props = {
  id: string;
  image: string;
  imageAlt: string;
  fallbackSeed: string;
  eyebrow: string;
  title: string;
  body: string;
  rows: PromiseRow[];
  // Flip image + text sides so adjacent sections don't repeat the same
  // composition on long pages.
  mirror?: boolean;
};

// Parameterised cousin of BespokePromise. Image column + text column with
// an eyebrow / display heading / body paragraph / spec dl. One quiet beat
// between the process and the enquiry form on each Studio Services page.
export function ServicePromise({
  id,
  image,
  imageAlt,
  fallbackSeed,
  eyebrow,
  title,
  body,
  rows,
  mirror = false
}: Props) {
  const headingId = `${id}-promise-heading`;
  return (
    <section
      className="relative bg-ink text-chalk"
      aria-labelledby={headingId}
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-12 md:gap-16 md:px-14 md:py-32 lg:gap-24">
        <motion.figure
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className={
            mirror
              ? "relative aspect-[4/5] w-full overflow-hidden bg-onyx md:col-span-7 md:col-start-6"
              : "relative aspect-[4/5] w-full overflow-hidden bg-onyx md:col-span-7"
          }
        >
          <SafeImage
            src={image}
            alt={imageAlt}
            fallbackSeed={fallbackSeed}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            quality={72}
            className="object-cover"
          />
        </motion.figure>

        <div
          className={
            mirror
              ? "md:col-span-5 md:col-start-1 md:row-start-1"
              : "md:col-span-5"
          }
        >
          <motion.p
            id={headingId}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.38em] text-chalk/55"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light uppercase leading-[1.1] tracking-[0.015em]"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 text-[13px] leading-[1.9] text-chalk/75 md:text-[14px]"
          >
            {body}
          </motion.p>

          <motion.dl
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 0.6, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 divide-y divide-chalk/10 border-y border-chalk/10"
          >
            {rows.map((row) => (
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
