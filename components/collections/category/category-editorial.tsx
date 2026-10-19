"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  kicker: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  href: string;
  ctaLabel?: string;
  mirror?: boolean;
};

export function CategoryEditorial({
  kicker,
  title,
  body,
  image,
  imageAlt,
  href,
  ctaLabel = "Discover",
  mirror = false
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <section
      ref={ref}
      className="relative bg-ink py-24 text-chalk md:py-32 lg:py-40"
      aria-labelledby="category-editorial-heading"
    >
      <div className="mx-auto grid max-w-editorial grid-cols-1 items-center gap-y-16 px-6 md:grid-cols-12 md:gap-x-8 md:px-14 lg:gap-x-12">
        {/* Image — contained, portrait. On desktop it's aligned to the inner
            edge of its column so it sits close to the text (not floating in
            centered dead space). */}
        <div
          className={`relative mx-auto w-full max-w-[520px] md:col-span-6 ${
            mirror ? "md:order-2 md:ml-0 md:mr-auto" : "md:ml-auto md:mr-0"
          }`}
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-onyx">
            <motion.div style={{ y }} className="absolute inset-0 scale-[1.08]">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 46vw, 92vw"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Text panel — pinned to the inner edge of its column so it sits close
            to the image, then the block itself is tightly max-widthed. */}
        <div
          className={`flex md:col-span-6 ${
            mirror ? "md:order-1 md:justify-end" : "md:justify-start"
          } justify-center`}
        >
          <div className="flex max-w-[22rem] flex-col items-center text-center">
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
              id="category-editorial-heading"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.75rem,3vw,2.4rem)] font-semibold uppercase leading-[1.05] tracking-[0.03em]"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 text-[14px] leading-[1.8] text-chalk/80"
            >
              {body}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12"
            >
              <Link href={href} className="cta-rule text-chalk">
                {ctaLabel}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
