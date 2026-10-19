"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  kicker: string;
  title: string;
  body: string;
  href?: string;
  ctaLabel?: string;
  videoSrc?: string;
  poster: string;
  posterAlt: string;
};

export function CategorySavoirFaire({
  kicker,
  title,
  body,
  href,
  ctaLabel = "Discover",
  videoSrc,
  poster,
  posterAlt
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  // Derive a per-instance id from the title so pages that render more than
  // one savoir-faire block (e.g. Sculptures highlighting both Majesté and
  // Sillage) don't produce duplicate ids.
  const headingId = `savoir-faire-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

  // Lazy-load the video (~7–30 MB per file). Only mount the <video> element
  // once the media block is within ~500px of the viewport. Until then, we
  // render just the still poster — an average visitor scrolling past a
  // category page never pays the video download cost.
  const [videoActive, setVideoActive] = useState(false);
  useEffect(() => {
    if (!videoSrc || !mediaRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px 0px" }
    );
    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-chalk"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center md:px-14 md:pt-32 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 text-[10px] uppercase tracking-[0.32em] text-chalk/55"
        >
          {kicker}
        </motion.p>
        <motion.h2
          id={headingId}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-md font-semibold uppercase leading-[1.05] tracking-[0.03em]"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-[14px] leading-[1.8] text-chalk/80 md:text-[15px]"
        >
          {body}
        </motion.p>
        {href && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex justify-center"
          >
            <Link href={href} className="cta-rule text-chalk">
              {ctaLabel}
            </Link>
          </motion.div>
        )}
      </div>

      <div className="mx-auto max-w-2xl px-6 pb-24 md:px-14 md:pb-32">
        <div
          ref={mediaRef}
          className="relative aspect-[4/5] w-full overflow-hidden bg-onyx md:aspect-[3/4]"
        >
          {/* Poster is always rendered — it acts as the placeholder before the
              video mounts, and remains as the visual for the no-video case. */}
          <motion.div style={{ scale }} className="absolute inset-0">
            <Image
              src={poster}
              alt={posterAlt}
              fill
              sizes="(min-width: 1280px) 1200px, 92vw"
              className="object-cover"
            />
          </motion.div>
          {videoSrc && videoActive && (
            <video
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    </section>
  );
}
