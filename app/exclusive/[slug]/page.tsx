import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  EXCLUSIVE_PIECES,
  exclusiveToProduct,
  productRef
} from "@/lib/content";
import { ProductHero } from "@/components/product/product-hero";
import { ProductStickyBar } from "@/components/product/product-sticky-bar";
import { ProductInfo } from "@/components/product/product-info";
import { ProductQuote } from "@/components/product/product-quote";
import { ProductDetails } from "@/components/product/product-details";
import { ProductInspiration } from "@/components/product/product-inspiration";
import { ProductDiscoverAlso } from "@/components/product/product-discover-also";
import { ProductServices } from "@/components/product/product-services";
import { ProductBoutique } from "@/components/product/product-boutique";
import { ProductBreadcrumb } from "@/components/product/product-breadcrumb";

type Params = { slug: string };

export function generateMetadata({ params }: { params: Params }): Metadata {
  const piece = EXCLUSIVE_PIECES.find((p) => p.slug === params.slug);
  if (!piece) return { title: "Not found — The Luxe Version" };
  return {
    title: `${piece.name} — Luxe Exclusive — The Luxe Version`,
    description: piece.body
  };
}

export default function ExclusiveDetailPage({ params }: { params: Params }) {
  const piece = EXCLUSIVE_PIECES.find((p) => p.slug === params.slug);
  if (!piece) notFound();

  // Adapt into the Product shape the shared detail components consume.
  const product = exclusiveToProduct(piece);
  const related = EXCLUSIVE_PIECES
    .filter((p) => p.slug !== piece.slug)
    .slice(0, 3)
    .map(exclusiveToProduct);
  const ref_ = productRef(product);

  return (
    <>
      <ProductStickyBar product={product} />
      <ProductHero product={product} ref_={ref_} />
      <ProductInfo product={product} />
      <ProductDetails product={product} />
      <ProductInspiration product={product} />
      <ProductQuote product={product} />
      <ProductDiscoverAlso products={related} aspect="square" />
      <ProductServices />
      <ProductBoutique />
      <ProductBreadcrumb product={product} />
    </>
  );
}
