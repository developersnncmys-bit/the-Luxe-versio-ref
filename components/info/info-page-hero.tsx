"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  kicker: string;
  title: string;
  lede?: string;
  image: string;
};

// Shared hero for the quieter footer-linked pages (care, returns, policy,
// etc.). Shorter than product/exclusive heroes — these pages are reference
// material, not a brand moment. Same parallax rig as ContactHero so the
// animation vocabulary stays consistent across the site.
export function InfoPageHero({ kicker, title, lede, image }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  return (
    <section
      ref={ref}
      className="relative min-h-[78svh] w-full overflow-hidden bg-ink text-chalk grain"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Directional scrim — darker on the left where the text sits,
            fading to barely-tinted on the right so the banner image reads
            through. Avoids the uniform near-black wash that was swallowing
            both the kicker and the top of the frame. */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/55 to-ink/25" />
        {/* Thin top gradient so the translucent navbar sits over a slightly
            graded surface rather than a flat tone — gives the banner a
            visible "top edge" even behind the nav. */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/50 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex min-h-[78svh] flex-col items-start justify-center px-6 pt-28 text-left md:px-14 md:pt-32 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 text-[10px] uppercase tracking-[0.38em] text-chalk/90"
        >
          {kicker}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          {title}
        </motion.h1>

        <motion.span
          aria-hidden
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 block h-px w-14 origin-left bg-chalk/60"
        />

        {lede && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-md text-[12px] leading-[1.85] text-chalk/80 md:text-[13px]"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </section>
  );
}
