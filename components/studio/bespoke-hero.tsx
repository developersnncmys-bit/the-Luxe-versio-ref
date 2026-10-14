"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Dark, cinematic hero — mirrors ExclusiveHero: left-aligned title, no scrim,
// a hairline rule beneath the mark, a short lede, and a quiet CTA pinned to
// the bottom-left corner. The piece is read as a continuation of the house's
// editorial register, not a departure.
export function BespokeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90svh] w-full overflow-hidden bg-ink text-chalk grain"
      aria-labelledby="bespoke-hero-heading"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/banners/sculpture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/40" />
      </motion.div>

      <div className="relative z-10 flex min-h-[90svh] flex-col items-start justify-center px-6 text-left md:px-14 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/70"
        >
          Studio Services · By the Hand
        </motion.p>

        <motion.h1
          id="bespoke-hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          Bespoke Commissions
        </motion.h1>

        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 block h-px w-14 origin-left bg-chalk/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[12px] leading-[1.85] text-chalk/80 md:text-[13px]"
        >
          Pieces designed and made for a single client. One of one — drawn to a
          room, a wall, a hand.
        </motion.p>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-6 z-10 md:bottom-14 md:left-14 lg:left-20"
      >
        <Link href="#process" className="cta-rule text-chalk">
          How it works
        </Link>
      </motion.div>
    </section>
  );
}
