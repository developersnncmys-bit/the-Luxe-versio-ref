"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useStore, type Order } from "@/components/store/store-provider";
import { CheckoutChrome } from "./checkout-chrome";

const REDIRECT_SECONDS = 3;

const PAYMENT_LABELS: Record<Order["payment"]["method"], string> = {
  upi: "UPI",
  card: "Card",
  netbanking: "Net banking",
  cod: "Cash on delivery"
};

// Brief, celebratory "payment received" screen that sits between Place Order
// and the full /checkout/confirmation page. Matches the Tridhavarnam-style
// one-two step: visitors first see a confirmation that money changed hands,
// then (3 s later or on tap) they land on the full order detail view.
export function PaymentSuccess() {
  const router = useRouter();
  const { orders, orderById } = useStore();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

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

  // Tick down the counter every second; redirect at zero. Rebuilt whenever
  // the order resolves so we only count down once there's something to show.
  useEffect(() => {
    if (!order) return;
    const id = window.setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.clearInterval(id);
          router.push("/checkout/confirmation");
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [order, router]);

  if (!loaded) {
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
      </div>
    );
  }

  if (!order) {
    // No order found — forward straight to confirmation which will show its
    // own "no recent order found" fallback.
    router.replace("/checkout/confirmation");
    return (
      <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
        <CheckoutChrome />
      </div>
    );
  }

  const paymentLabel = PAYMENT_LABELS[order.payment.method];
  const isCod = order.payment.method === "cod";

  return (
    <div className="min-h-svh bg-chalk pt-16 text-ink md:pt-32">
      <CheckoutChrome />

      <main className="mx-auto flex min-h-[70svh] max-w-xl flex-col justify-center px-6 py-16 md:px-12">
        <div className="border border-ink/10 bg-chalk shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
          {/* Success banner — green bar matching the full confirmation page. */}
          <div className="flex items-center justify-between gap-4 border-b border-emerald-200 bg-emerald-50 px-6 py-4 text-emerald-900 md:px-8">
            <div className="flex items-center gap-3">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-emerald-600 text-emerald-700"
                aria-hidden
              >
                <TinyCheck />
              </span>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">
                {isCod ? "Order confirmed" : "Payment received"}
              </p>
            </div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-900/70">
              via {paymentLabel}
            </p>
          </div>

          {/* Body: order + amount + status. */}
          <div className="px-6 py-8 md:px-10 md:py-10">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 text-[12px]">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.26em] text-ink/55">
                  Order
                </dt>
                <dd className="mt-2 text-[14px] font-semibold tracking-[0.14em] text-ink">
                  {order.id}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-[10px] uppercase tracking-[0.26em] text-ink/55">
                  {isCod ? "Payable" : "Paid"}
                </dt>
                <dd className="mt-2 text-[14px] font-semibold tracking-[0.02em] text-ink">
                  ₹ {order.total.toLocaleString("en-IN")}
                </dd>
              </div>

              <div>
                <dt className="text-[10px] uppercase tracking-[0.26em] text-ink/55">
                  Reference
                </dt>
                <dd className="mt-2 text-[13px] text-ink/80">
                  TXN{order.id.replace(/\D/g, "").slice(-8)}
                </dd>
              </div>
              <div className="text-right">
                <dt className="text-[10px] uppercase tracking-[0.26em] text-ink/55">
                  Status
                </dt>
                <dd className="mt-2 text-[13px] font-semibold text-emerald-700">
                  {isCod ? "Confirmed" : "Authorised"}
                </dd>
              </div>
            </dl>

            <p className="mt-10 text-center text-[12px] text-ink/60">
              Redirecting to your order confirmation in{" "}
              <span className="font-semibold text-ink">{countdown}s</span>…
            </p>

            <Link
              href="/checkout/confirmation"
              className="mt-5 block w-full bg-ink py-4 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-chalk transition-opacity hover:opacity-90"
            >
              Go to order
            </Link>
          </div>
        </div>
      </main>
    </div>
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
