"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { productHref, type Product } from "@/lib/content";

// "Discover Also" — related pieces rail. Kept minimal: image + name only,
// no visible price (matches Chanel's editorial restraint).
export function ProductDiscoverAlso({
  products,
  aspect = "portrait"
}: {
  products: Product[];
  aspect?: "portrait" | "square";
}) {
  if (products.length === 0) return null;
  const aspectClass = aspect === "square" ? "aspect-square" : "aspect-[4/5]";
  // Cap desktop columns at the actual card count so 1- and 2-item rails
  // center inside the editorial width instead of being pinned to the left.
  const mdColsClass =
    products.length === 1
      ? "md:grid-cols-1"
      : products.length === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-3";
  const smColsClass = products.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  // Images grid is left-aligned within the editorial container; narrow the
  // grid itself (not the whole section) so 1- and 2-item rails hug the left
  // edge instead of stretching across.
  const gridWidthClass =
    products.length === 1
      ? "max-w-md mr-auto"
      : products.length === 2
        ? "max-w-3xl mr-auto"
        : "";

  return (
    <section className="relative bg-ink py-24 text-chalk md:py-32">
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold uppercase tracking-[0.06em] md:mb-20"
        >
          Discover Also
        </motion.h2>

        <div className={`grid grid-cols-1 gap-x-8 gap-y-16 ${smColsClass} ${mdColsClass} ${gridWidthClass} md:gap-x-14 lg:gap-x-20`}>
          {products.map((product, i) => (
            <RelatedCard key={product.handle} product={product} index={i} aspectClass={aspectClass} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedCard({
  product,
  index,
  aspectClass
}: {
  product: Product;
  index: number;
  aspectClass: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 1,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group"
    >
      <Link href={productHref(product)} className="block text-center">
        <div className={`relative mb-8 w-full overflow-hidden bg-onyx ${aspectClass}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1600ms] ease-silk group-hover:scale-[1.04]"
          />
        </div>

        <p className="text-[10px] uppercase tracking-[0.32em] text-chalk/55">
          {product.category}
        </p>
        <h3 className="mt-3 font-display text-[14px] font-semibold uppercase leading-[1.15] tracking-[0.02em] md:text-[15px]">
          {product.name}
        </h3>
      </Link>
    </motion.article>
  );
}
