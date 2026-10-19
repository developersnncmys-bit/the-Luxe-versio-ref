"use client";

import { useMemo, useState, type ReactNode } from "react";
import { CategoryGrid } from "./category-grid";
import {
  FilterDrawer,
  FilterIcon,
  applyProductFilters,
  getAvailableMaterials
} from "@/components/collections/filters/product-filters";
import type { Product } from "@/lib/content";

// Owns filter state and the interstitial split. The parent page passes a
// pre-filtered set of products (by category) and, optionally, one or more
// interstitial blocks (savoir-faire). With N interstitials the grid splits
// into N+1 roughly-equal segments and each interstitial is placed between
// consecutive segments — so two highlights punctuate the grid at the third
// and two-thirds marks rather than stacking in one place.
export function CategoryFilterableGrid({
  products,
  interstitial
}: {
  products: Product[];
  interstitial?: ReactNode | ReactNode[];
}) {
  const [open, setOpen] = useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState<Set<string>>(
    () => new Set()
  );
  const [selectedPrices, setSelectedPrices] = useState<Set<string>>(
    () => new Set()
  );

  const availableMaterials = useMemo(
    () => getAvailableMaterials(products),
    [products]
  );

  const filtered = useMemo(
    () => applyProductFilters(products, selectedMaterials, selectedPrices),
    [products, selectedMaterials, selectedPrices]
  );

  // Normalise interstitials to an array, dropping nullish entries. If none
  // are supplied the grid renders as a single uninterrupted segment.
  const interstitialList = (
    Array.isArray(interstitial) ? interstitial : [interstitial]
  ).filter(Boolean) as ReactNode[];

  // Build N+1 roughly-equal product segments to sit between interstitials.
  // Each cut point is rounded up to the nearest multiple of the desktop
  // column count (3) so no segment ends with a dangling row of empty cells
  // next to the following interstitial.
  const segmentCount = interstitialList.length + 1;
  const segments: Product[][] = [];
  let cursor = 0;
  for (let i = 0; i < segmentCount; i++) {
    const remaining = segmentCount - i;
    const rawTarget = cursor + Math.ceil((filtered.length - cursor) / remaining);
    const target =
      i === segmentCount - 1
        ? filtered.length
        : Math.min(Math.ceil(rawTarget / 3) * 3, filtered.length);
    segments.push(filtered.slice(cursor, target));
    cursor = target;
  }

  const activeCount = selectedMaterials.size + selectedPrices.size;

  const toggleMaterial = (kw: string) =>
    setSelectedMaterials((prev) => {
      const next = new Set(prev);
      next.has(kw) ? next.delete(kw) : next.add(kw);
      return next;
    });

  const togglePrice = (key: string) =>
    setSelectedPrices((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });

  const clearAll = () => {
    setSelectedMaterials(new Set());
    setSelectedPrices(new Set());
  };

  return (
    <>
      <div className="border-t border-chalk/10 bg-ink">
        <div className="mx-auto flex max-w-editorial items-center justify-between px-6 py-5 md:px-14 md:py-6">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex shrink-0 items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-chalk/85 transition-colors hover:text-chalk"
            aria-label="Open filters"
          >
            <FilterIcon />
            Filters
            {activeCount > 0 && (
              <span className="text-chalk/60">({activeCount})</span>
            )}
          </button>
          <p className="ml-auto text-[11px] uppercase tracking-[0.28em] text-chalk/60">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <div className="h-px w-full bg-chalk/10" />
      </div>

      {filtered.length === 0 ? (
        <section className="bg-ink py-32 text-center text-chalk md:py-40">
          <p className="text-[11px] uppercase tracking-[0.28em] text-chalk/50">
            No pieces match these filters.
          </p>
          <button
            type="button"
            onClick={clearAll}
            className="mt-8 text-[11px] uppercase tracking-[0.28em] text-chalk underline underline-offset-[6px] decoration-chalk/50 transition-colors hover:decoration-chalk"
          >
            Clear filters
          </button>
        </section>
      ) : (
        <>
          {segments.map((segment, i) => {
            const next = interstitialList[i];
            // Only drop the interstitial between segments if the following
            // segment actually has products — avoids a lonely highlight at
            // the tail with nothing beneath it.
            const hasFollowingProducts = segments
              .slice(i + 1)
              .some((s) => s.length > 0);
            return (
              <div key={`segment-${i}`}>
                {segment.length > 0 && (
                  <CategoryGrid products={segment} showToolbar={false} />
                )}
                {next && hasFollowingProducts && next}
              </div>
            );
          })}
        </>
      )}

      <FilterDrawer
        open={open}
        onClose={() => setOpen(false)}
        materials={availableMaterials}
        selectedMaterials={selectedMaterials}
        toggleMaterial={toggleMaterial}
        selectedPrices={selectedPrices}
        togglePrice={togglePrice}
        onClear={clearAll}
        resultCount={filtered.length}
      />
    </>
  );
}
