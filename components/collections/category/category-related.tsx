"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export type RelatedCard = {
  title: string;
  image: string;
  imageAlt: string;
  href: string;
};

type Props = {
  kicker?: string;
  cards: RelatedCard[];
};

export function CategoryRelated({ kicker = "Also from the house", cards }: Props) {
  if (cards.length === 0) return null;

  return (
    <section
      className="relative bg-ink py-24 text-chalk md:py-32"
      aria-labelledby="category-related-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.p
          id="category-related-heading"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center text-[10px] uppercase tracking-[0.32em] text-chalk/55 md:mb-20"
        >
          {kicker}
        </motion.p>

        <div
          className={
            cards.length === 1
              ? "mx-auto w-full max-w-xl"
              : "grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 md:gap-x-12"
          }
        >
          {cards.map((card, i) => (
            <RelatedTile key={card.href} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedTile({ card, index }: { card: RelatedCard; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <Link href={card.href} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-onyx">
          <Image
            src={card.image}
            alt={card.imageAlt}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>
        <div className="mt-8 flex flex-col items-center gap-5 text-center">
          <h3 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold uppercase leading-[1.1] tracking-[0.06em]">
            {card.title}
          </h3>
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk underline underline-offset-[8px] decoration-chalk/50 transition-colors group-hover:decoration-chalk">
            Discover
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
