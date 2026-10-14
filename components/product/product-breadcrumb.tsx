import Link from "next/link";
import { categorySlug, isExclusiveHandle, type Product } from "@/lib/content";

// Minimal breadcrumb that sits just above the site footer. Chanel places it
// there — quiet reassurance of location, never announced at the top.
export function ProductBreadcrumb({ product }: { product: Product }) {
  const isExclusive = isExclusiveHandle(product.handle);
  const crumbs = isExclusive
    ? [
        { label: "The House", href: "/" },
        { label: "Luxe Exclusive", href: "/exclusive" },
        { label: product.name, href: "" }
      ]
    : [
        { label: "The House", href: "/" },
        { label: "The Collection", href: "/collections" },
        {
          label: product.category,
          href: `/collections/${categorySlug(product.category)}`
        },
        { label: product.name, href: "" }
      ];

  return (
    <nav
      aria-label="Breadcrumb"
      className="border-t border-chalk/10 bg-ink py-8 text-chalk"
    >
      <ol className="mx-auto flex max-w-editorial flex-wrap items-center gap-2 px-6 text-[10px] uppercase tracking-[0.28em] text-chalk/55 md:px-14 md:text-[11px]">
        {crumbs.map((c, i) => (
          <li key={`${c.label}-${i}`} className="flex items-center gap-2">
            {c.href ? (
              <Link
                href={c.href}
                className="transition-colors hover:text-chalk"
              >
                {c.label}
              </Link>
            ) : (
              <span className="text-chalk/80">{c.label}</span>
            )}
            {i < crumbs.length - 1 && (
              <span aria-hidden className="text-chalk/25">
                ·
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
