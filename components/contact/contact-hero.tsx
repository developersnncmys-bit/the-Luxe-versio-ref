"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Quieter hero — shorter than product/exclusive heroes. The contact page is
// transactional in spirit, so the title gets presence but doesn't dominate
// the viewport. Left-aligned title block, hairline rule, lede.
export function ContactHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section
      ref={ref}
      className="relative min-h-[90svh] w-full overflow-hidden bg-ink text-chalk grain"
      aria-labelledby="contact-hero-heading"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="/images/banners/vase.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-ink/50" />
      </motion.div>

      <div className="relative z-10 flex min-h-[90svh] flex-col items-start justify-center px-6 text-left md:px-14 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/70"
        >
          Reach the Studio
        </motion.p>

        <motion.h1
          id="contact-hero-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light uppercase leading-[1.05] tracking-[0.03em]"
        >
          Contact
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
          Write to the studio with a question, a piece, or a visit. We respond
          within two working days.
        </motion.p>
      </div>
    </section>
  );
}
