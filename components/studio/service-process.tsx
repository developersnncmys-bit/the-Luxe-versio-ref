"use client";

import { motion } from "framer-motion";

export type ServiceStep = {
  label: string;
  body: string;
};

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  steps: ServiceStep[];
};

// Parameterised cousin of BespokeProcess — the three-step numbered editorial
// card. Shared across Studio Services pages. Big italic serif numeral, a
// vertical hairline, a growing underline on hover, kicker + body.
export function ServiceProcess({ id, eyebrow, title, steps }: Props) {
  const headingId = `${id}-process-heading`;
  return (
    <section
      id={`${id}-process`}
      className="relative bg-ink py-28 text-chalk md:py-40"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.32em] text-chalk/70"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase leading-[1.15] tracking-[0.04em]"
          >
            {title}
          </motion.h2>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-16 origin-center bg-chalk/40"
          />
        </div>

        <ul className="mx-auto mt-20 grid max-w-6xl grid-cols-1 gap-x-10 gap-y-20 md:mt-28 md:grid-cols-3 md:gap-x-16">
          {steps.map((step, i) => (
            <StepCard key={step.label} index={i} step={step} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function StepCard({ step, index }: { step: ServiceStep; index: number }) {
  const stagger = index * 0.1;
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="group relative flex flex-col text-left"
    >
      <div className="relative flex items-start gap-6">
        <div className="relative overflow-hidden leading-[0.8]">
          <motion.span
            aria-hidden
            variants={{
              hidden: { y: "100%" },
              visible: { y: "0%" }
            }}
            transition={{
              duration: 0.9,
              delay: 0.1 + stagger,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="block font-[family-name:var(--font-serif-display)] text-[clamp(2.5rem,3.6vw,3.75rem)] font-light italic leading-[0.85] text-chalk/25 transition-colors duration-700 ease-silk group-hover:text-chalk/45"
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
        </div>

        <motion.span
          aria-hidden
          variants={{
            hidden: { scaleY: 0 },
            visible: { scaleY: 1 }
          }}
          transition={{
            duration: 0.7,
            delay: 0.35 + stagger,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mt-2 block h-[clamp(2rem,3vw,2.75rem)] w-px origin-top bg-chalk/30 transition-colors duration-500 group-hover:bg-chalk/60"
        />
      </div>

      <motion.span
        aria-hidden
        variants={{
          hidden: { scaleX: 0 },
          visible: { scaleX: 1 }
        }}
        transition={{
          duration: 0.7,
          delay: 0.45 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-8 block h-px w-12 origin-left bg-chalk/50 transition-[width] duration-500 ease-silk group-hover:w-20"
      />

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{
          duration: 0.7,
          delay: 0.55 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk"
      >
        {step.label}
      </motion.p>

      <motion.p
        variants={{
          hidden: { opacity: 0, y: 12 },
          visible: { opacity: 1, y: 0 }
        }}
        transition={{
          duration: 0.75,
          delay: 0.65 + stagger,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mt-4 text-[13px] leading-[1.75] text-chalk/75 md:text-[14px]"
      >
        {step.body}
      </motion.p>
    </motion.li>
  );
}
