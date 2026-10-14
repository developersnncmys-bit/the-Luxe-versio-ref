"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { SafeImage } from "@/components/ui/safe-image";
import { useStore, type Order } from "@/components/store/store-provider";
import { CheckoutChrome } from "./checkout-chrome";

// Five-step delivery journey. Only "placed" / "shipped" / "delivered" are
// backed by real status transitions in the store today; "packed" and
// "out-for-delivery" are visual-only stops that come between them. The
// tracker fills proportionally based on the furthest step reached.
const TRACKER_STEPS = [
  { key: "placed", label: "Confirmed" },
  { key: "packed", label: "Packed" },
  { key: "shipped", label: "Shipped" },
  { key: "out", label: "Out for delivery" },
  { key: "delivered", label: "Delivered" }
] as const;

export function OrderConfirmation() {
  const { orders, orderById, cancelOrder } = useStore();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  // The checkout flow stashes the just-placed order id in sessionStorage so
  // the confirmation page knows which order to focus on. The order itself is
  // read live from the store so cancel-order state flows through immediately.
  useEffect(() => {
    try {
      setOrderId(sessionStorage.getItem("tlv:last-order-id"));
    } catch {
      // Ignore.
    }
    setLoaded(true);
  }, []);

  const order: Order | undefined = useMemo(() => {
    if (!orderId) return orders[0];
    return orderById(orderId) ?? orders[0];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, orders]);

  const handleConfirmCancel = () => {
    if (!order) return;
    cancelOrder(order.id);
    setConfirmOpen(false);
  };

  if (!loaded) {
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
        <main className="mx-auto flex min-h-[60svh] max-w-xl flex-col items-center justify-center px-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.3em] text-ink/55">
            No recent order found
          </p>
          <p className="mt-6 max-w-[32ch] text-[14px] leading-[1.7] text-ink/70">
            If you placed an order recently, your confirmation was sent by
            email. Browse the collection to begin another.
          </p>
          <Link
            href="/collections/objects"
            className="mt-10 text-[11px] uppercase tracking-[0.3em] text-ink underline underline-offset-[6px] decoration-ink/40 transition-colors hover:decoration-ink"
          >
            Browse the collection
          </Link>
        </main>
      </div>
    );
  }

  const isCancelled = order.status === "cancelled";
  const isCancellable = order.status === "placed";

  const placed = new Date(order.placedAt);
  const placedLabel = placed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
  // Rough ETA for the "Delivered by" copy on the tracker: 7 days after placing.
  const eta = new Date(placed.getTime() + 7 * 24 * 60 * 60 * 1000);
  const etaLabel = eta.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const paymentLabel = PAYMENT_LABELS[order.payment.method];
  const deliveryLabel = order.delivery.method === "express"
    ? "Express"
    : "Standard";

  return (
    <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
      <CheckoutChrome />

      {/* ── Top status banner — full-width, success for placed/shipped/
          delivered, muted red for cancelled. Mirrors the Tridhavarnam
          "Thank you, your order is confirmed." strip. */}
      <div
        className={clsx(
          "border-y",
          isCancelled
            ? "border-red-200 bg-red-50 text-red-800"
            : "border-emerald-200 bg-emerald-50 text-emerald-900"
        )}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-6 py-4 md:px-12">
          <span
            className={clsx(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px]",
              isCancelled
                ? "border-red-500 text-red-700"
                : "border-emerald-600 text-emerald-700"
            )}
            aria-hidden
          >
            {isCancelled ? <TinyCross /> : <TinyCheck />}
          </span>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">
            {isCancelled
              ? "This order has been cancelled."
              : "Thank you, your order is confirmed."}
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:px-12 md:pt-14">
        {/* ── Metadata strip — order id, placed date, total, payment, delivery
            — with "All orders" link on the right. */}
        <section className="flex flex-wrap items-center justify-between gap-x-10 gap-y-5 border-b border-ink/10 pb-8">
          <dl className="flex flex-wrap items-baseline gap-x-10 gap-y-4 text-[12px]">
            <Meta label="Order" value={order.id} mono />
            <Meta label="Placed" value={placedLabel} />
            <Meta
              label="Total"
              value={`₹ ${order.total.toLocaleString("en-IN")}`}
            />
            <Meta label="Payment" value={paymentLabel} />
            <Meta label="Delivery" value={deliveryLabel} />
          </dl>
          <Link
            href="/account#orders"
            className="text-[11px] uppercase tracking-[0.26em] text-ink/70 underline underline-offset-[6px] decoration-ink/30 transition-colors hover:text-ink hover:decoration-ink"
          >
            All orders
          </Link>
        </section>

        {/* ── Progress tracker — hidden for cancelled orders because the
            journey obviously no longer applies. */}
        {!isCancelled && (
          <ProgressTracker
            status={order.status}
            placedLabel={placedLabel}
            etaLabel={etaLabel}
          />
        )}

        {/* ── Items + side cards: two-column on desktop, stacked on mobile. */}
        <div className="mt-14 grid gap-10 md:grid-cols-[1fr_380px] md:gap-14">
          <section>
            <div className="flex items-baseline justify-between border-b border-ink/15 pb-4">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.26em]">
                Items{" "}
                <span className="text-ink/50">({order.items.length})</span>
              </h2>
              <Link
                href="/collections/objects"
                className="text-[11px] uppercase tracking-[0.26em] text-ink/60 underline underline-offset-[6px] decoration-ink/20 transition-colors hover:text-ink hover:decoration-ink/60"
              >
                Buy again
              </Link>
            </div>
            <ul className="divide-y divide-ink/10">
              {order.items.map((item) => (
                <li
                  key={item.handle}
                  className="grid grid-cols-[80px_1fr_auto] items-start gap-5 py-6 md:gap-8"
                >
                  <div className="relative h-24 w-20 overflow-hidden bg-ink/5">
                    {item.image && (
                      <SafeImage
                        src={item.image}
                        alt=""
                        fallbackSeed={`${item.handle}-conf`}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-ink/55">
                      {item.name.split(" — ")[0] ?? "Piece"}
                    </p>
                    <p className="mt-1 text-[14px] text-ink">{item.name}</p>
                    <p className="mt-2 text-[12px] text-ink/60">
                      Qty {item.qty} ·{" "}
                      <span className="text-ink/80">
                        ₹ {item.unitPrice.toLocaleString("en-IN")}
                      </span>
                    </p>
                  </div>
                  <p className="self-start text-[14px] tracking-[0.02em]">
                    ₹ {item.lineTotal.toLocaleString("en-IN")}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Side cards: Ship to + Payment summary. */}
          <aside className="space-y-6">
            <div className="border border-ink/10 bg-ink/[0.015] p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/70">
                Ship to
              </h3>
              <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em]">
                {order.contact.firstName} {order.contact.lastName}
              </p>
              <address className="mt-2 text-[13px] not-italic leading-[1.7] text-ink/75">
                {order.shipping.line1}
                {order.shipping.line2 && (
                  <>
                    <br />
                    {order.shipping.line2}
                  </>
                )}
                <br />
                {order.shipping.city}, {order.shipping.state}{" "}
                {order.shipping.postal}
                <br />
                {order.shipping.country}
                {order.contact.phone && (
                  <>
                    <br />
                    <span className="text-ink/55">{order.contact.phone}</span>
                  </>
                )}
              </address>
            </div>

            <div className="border border-ink/10 bg-ink/[0.015] p-6">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.26em] text-ink/70">
                Payment
              </h3>
              <dl className="mt-4 space-y-2 text-[13px]">
                <Row
                  label="Subtotal"
                  value={`₹ ${order.subtotal.toLocaleString("en-IN")}`}
                />
                <Row
                  label="Shipping"
                  value={
                    order.delivery.cost === 0
                      ? "Free"
                      : `₹ ${order.delivery.cost.toLocaleString("en-IN")}`
                  }
                />
                {order.payment.fee > 0 && (
                  <Row
                    label="COD handling"
                    value={`₹ ${order.payment.fee.toLocaleString("en-IN")}`}
                  />
                )}
                <Row
                  label="GST included"
                  value={`₹ ${order.gst.toLocaleString("en-IN")}`}
                  muted
                />
                <div className="mt-4 border-t border-ink/15 pt-4">
                  <Row
                    label={isCancelled ? "Order total" : "Total paid"}
                    value={`₹ ${order.total.toLocaleString("en-IN")}`}
                    strong
                  />
                </div>
              </dl>
              <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/55">
                {paymentLabel}
                {!isCancelled && " · Authorised"}
                {isCancelled && " · Refund in progress"}
              </p>
            </div>

            {/* ── CTAs */}
            <div className="space-y-3 pt-2">
              {!isCancelled && (
                <button
                  type="button"
                  className="w-full bg-ink py-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk transition-opacity hover:opacity-90"
                >
                  Track order
                </button>
              )}
              <Link
                href="/collections/objects"
                className={clsx(
                  "block w-full border border-ink/30 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-chalk",
                  isCancelled && "bg-ink text-chalk hover:bg-ink/90"
                )}
              >
                Continue shopping
              </Link>
              {isCancellable && (
                <button
                  type="button"
                  onClick={() => setConfirmOpen(true)}
                  className="w-full py-3 text-[11px] uppercase tracking-[0.26em] text-ink/70 underline underline-offset-[6px] decoration-ink/30 transition-colors hover:text-ink hover:decoration-ink"
                >
                  Cancel order
                </button>
              )}
            </div>
          </aside>
        </div>

        {/* ── Footer: email + support contact. */}
        <footer className="mt-16 border-t border-ink/10 pt-8 text-[12px] leading-[1.7] text-ink/65">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <p>
              Confirmation emailed to{" "}
              <span className="text-ink">{order.contact.email}</span>.
              {order.contact.phone && (
                <>
                  {" "}
                  Tracking SMS to{" "}
                  <span className="text-ink">{order.contact.phone}</span>.
                </>
              )}
            </p>
            <p className="text-ink/70">
              <Link
                href="/faq"
                className="underline underline-offset-[5px] decoration-ink/30 transition-colors hover:text-ink hover:decoration-ink"
              >
                care@theluxeversion.com
              </Link>
              <span className="mx-3 text-ink/30">·</span>
              <span>+91 99495 28787</span>
            </p>
          </div>
        </footer>
      </main>

      {/* Inline cancellation modal — matches the house styling instead of the
          native browser confirm(). */}
      {confirmOpen && (
        <CancelConfirmModal
          orderId={order.id}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={handleConfirmCancel}
        />
      )}
    </div>
  );
}

function ProgressTracker({
  status,
  placedLabel,
  etaLabel
}: {
  status: Order["status"];
  placedLabel: string;
  etaLabel: string;
}) {
  // Map the current status onto the 5-step index. "Packed" and "Out for
  // delivery" are visual-only stops with no backing store state yet, so a
  // freshly placed order sits at step 0.
  const activeIndex = useMemo(() => {
    switch (status) {
      case "placed":
        return 0;
      case "shipped":
        return 2;
      case "delivered":
        return 4;
      default:
        return 0;
    }
  }, [status]);

  // Fill width as a %: 0 steps = 0%, last step = 100%.
  const fillPct = (activeIndex / (TRACKER_STEPS.length - 1)) * 100;

  return (
    <section
      aria-label="Delivery progress"
      className="mt-10 border border-ink/10 bg-ink/[0.015] px-6 py-10 md:px-10 md:py-12"
    >
      <div className="relative">
        {/* Base line */}
        <div
          aria-hidden
          className="absolute left-5 right-5 top-4 h-px bg-ink/15 md:left-6 md:right-6"
        />
        {/* Filled line — stops at the active step. 48px margin covers the
            left/right insets on the base line (left-5 + right-5 ≈ 40–48px). */}
        <div
          aria-hidden
          className="absolute left-5 top-4 h-px bg-ink transition-[width] duration-700 ease-silk md:left-6"
          style={{ width: `calc((100% - 48px) * ${fillPct / 100})` }}
        />

        <ol className="relative grid grid-cols-5 gap-2">
          {TRACKER_STEPS.map((step, i) => {
            const isDone = i < activeIndex;
            const isActive = i === activeIndex;
            return (
              <li key={step.key} className="flex flex-col items-center text-center">
                <span
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] text-[11px] font-semibold transition-colors duration-500 ease-silk",
                    isDone && "border-ink bg-ink text-chalk",
                    isActive && "border-ink bg-chalk text-ink shadow-[0_0_0_4px_rgba(0,0,0,0.06)]",
                    !isDone && !isActive && "border-ink/20 bg-chalk text-ink/40"
                  )}
                >
                  {isDone ? <TinyCheck /> : i + 1}
                </span>
                <p
                  className={clsx(
                    "mt-4 text-[11px] uppercase tracking-[0.2em]",
                    isActive || isDone ? "text-ink" : "text-ink/45"
                  )}
                >
                  {step.label}
                </p>
                <p className="mt-1 text-[10px] text-ink/45">
                  {i === 0 && (isDone || isActive) && placedLabel}
                  {i === TRACKER_STEPS.length - 1 && !isDone && !isActive &&
                    `by ${etaLabel}`}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function CancelConfirmModal({
  orderId,
  onCancel,
  onConfirm
}: {
  orderId: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/60 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cancel-order-title"
      data-lenis-prevent
    >
      <div className="w-full max-w-md bg-chalk px-8 py-10 text-ink md:px-12 md:py-12">
        <p className="text-[11px] uppercase tracking-[0.3em] text-ink/60">
          Order {orderId}
        </p>
        <h2
          id="cancel-order-title"
          className="mt-4 font-display text-[clamp(1.25rem,2vw,1.6rem)] font-semibold uppercase tracking-[0.02em]"
        >
          Cancel this order?
        </h2>
        <p className="mt-5 text-[13px] leading-[1.7] text-ink/70">
          Cancellation is immediate. Any amount already charged is refunded
          within 5–7 working days. This cannot be undone.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full bg-ink py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk transition-opacity hover:opacity-90"
          >
            Yes, cancel order
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full border border-ink/30 py-4 text-[11px] uppercase tracking-[0.3em] text-ink transition-colors hover:border-ink"
          >
            Keep the order
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Small helpers ──────────────────────────────────────────────────────

const PAYMENT_LABELS: Record<Order["payment"]["method"], string> = {
  upi: "UPI",
  card: "Card",
  netbanking: "Net banking",
  cod: "Cash on delivery"
};

function Meta({
  label,
  value,
  mono
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-[10px] uppercase tracking-[0.26em] text-ink/55">
        {label}
      </dt>
      <dd
        className={clsx(
          "text-[13px] text-ink",
          mono && "tracking-[0.14em] font-semibold"
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function Row({
  label,
  value,
  strong,
  muted
}: {
  label: string;
  value: string;
  strong?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex items-baseline justify-between",
        strong && "text-[15px] font-semibold uppercase tracking-[0.16em]",
        muted && "text-ink/60"
      )}
    >
      <dt
        className={clsx(
          !strong && "uppercase tracking-[0.18em] text-ink/70",
          muted && "text-ink/55"
        )}
      >
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  );
}

export function StatusBadge({ status }: { status: Order["status"] }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span
      className={clsx(
        "inline-block border px-3 py-1 text-[9px] uppercase tracking-[0.26em]",
        status === "cancelled" && "border-red-300 bg-red-50 text-red-700",
        status === "placed" && "border-ink/30 bg-ink/5 text-ink/80",
        status === "shipped" && "border-amber-300 bg-amber-50 text-amber-800",
        status === "delivered" &&
          "border-emerald-300 bg-emerald-50 text-emerald-800"
      )}
    >
      {label}
    </span>
  );
}

function TinyCheck() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 10.5l3.5 3.5L15 7" />
    </svg>
  );
}

function TinyCross() {
  return (
    <svg
      viewBox="0 0 20 20"
      width="12"
      height="12"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M6 6l8 8M14 6l-8 8" />
    </svg>
  );
}
