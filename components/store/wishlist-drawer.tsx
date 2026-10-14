"use client";

import Link from "next/link";
import { SafeImage } from "@/components/ui/safe-image";
import { productHref } from "@/lib/content";
import { useStore } from "./store-provider";
import { DrawerShell } from "./drawer-shell";

export function WishlistDrawer() {
  const {
    wishlist,
    drawer,
    closeDrawer,
    removeFromWishlist,
    addToCart,
    openDrawer,
    productByHandle
  } = useStore();

  const open = drawer === "wishlist";
  const isEmpty = wishlist.length === 0;

  const moveToCart = (handle: string) => {
    addToCart(handle);
    removeFromWishlist(handle);
    openDrawer("cart");
  };

  return (
    <DrawerShell open={open} onClose={closeDrawer} title="Wishlist" tone="light">
      {isEmpty ? (
        <div className="flex h-full flex-col items-center justify-center px-8 py-16 text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ink/55">
            Your wishlist is empty
          </p>
          <p className="mt-6 max-w-[26ch] text-[13px] leading-[1.7] text-ink/70">
            Save the pieces you're considering. They'll stay here between
            visits.
          </p>
          <Link
            href="/collections/objects"
            onClick={closeDrawer}
            className="mt-10 text-[11px] uppercase tracking-[0.28em] text-ink underline underline-offset-[6px] decoration-ink/50 transition-colors hover:decoration-ink"
          >
            Browse the collection
          </Link>
        </div>
      ) : (
        <ul className="divide-y divide-ink/10">
          {wishlist.map((handle) => {
            const product = productByHandle(handle);
            if (!product) return null;
            return (
              <li key={handle} className="flex gap-4 px-6 py-6 md:px-8">
                <Link
                  href={productHref(product)}
                  onClick={closeDrawer}
                  className="relative h-24 w-20 shrink-0 overflow-hidden bg-ink/5"
                >
                  <SafeImage
                    src={product.image}
                    alt=""
                    fallbackSeed={`${product.handle}-wish`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={productHref(product)}
                      onClick={closeDrawer}
                      className="min-w-0 flex-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-ink/70"
                    >
                      {product.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(handle)}
                      aria-label={`Remove ${product.name} from wishlist`}
                      className="shrink-0 text-ink/50 transition-colors hover:text-ink"
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden
                      >
                        <path
                          d="M1.5 1.5l9 9M10.5 1.5l-9 9"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                    </button>
                  </div>
                  {product.material && (
                    <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-ink/50">
                      {product.material}
                    </p>
                  )}
                  <p className="mt-3 text-[13px] tracking-[0.02em] text-ink">
                    ₹ {product.price.inr.toLocaleString("en-IN")}
                  </p>
                  <button
                    type="button"
                    onClick={() => moveToCart(handle)}
                    className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink underline underline-offset-[6px] decoration-ink/50 transition-colors hover:decoration-ink"
                  >
                    Add to bag
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </DrawerShell>
  );
}
