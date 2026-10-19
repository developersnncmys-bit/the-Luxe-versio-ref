"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  eyebrow: string;
  title: string;
  lede: string;
  image: string;
  // Pin href + label for the floating bottom CTA. Usually jumps to a #anchor
  // further down the page (e.g. "#process").
  cta: { href: string; label: string };
  // Visual id used only for aria. Keep short + kebab.
  id: string;
};

// Parameterised cousin of BespokeHero. Same cinematic register — dark
// background, left-aligned editorial copy, parallax backdrop, hairline rule,
// floating corner CTA — but every piece of copy and the image is injected.
// Shared across the three Studio Services pages (Appointment / Bespoke /
// Interior) so each sits in the same visual family without duplicating the
// motion wiring.
export function ServiceHero({ eyebrow, title, lede, image, cta, id }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const headingId = `${id}-hero-heading`;

  return (
    <section
      ref={ref}
      className="relative min-h-[90svh] w-full overflow-hidden bg-ink text-chalk grain"
      aria-labelledby={headingId}
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
        <div className="absolute inset-0 bg-ink/45" />
      </motion.div>

      <div className="relative z-10 flex min-h-[90svh] flex-col items-start justify-center px-6 text-left md:px-14 lg:px-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.38em] text-chalk/70"
        >
          {eyebrow}
        </motion.p>

        <motion.h1
          id={headingId}
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
          className="mt-8 block h-px w-14 origin-left bg-chalk/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-[12px] leading-[1.85] text-chalk/80 md:text-[13px]"
        >
          {lede}
        </motion.p>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-6 z-10 md:bottom-14 md:left-14 lg:left-20"
      >
        <Link href={cta.href} className="cta-rule text-chalk">
          {cta.label}
        </Link>
      </motion.div>
    </section>
  );
}
