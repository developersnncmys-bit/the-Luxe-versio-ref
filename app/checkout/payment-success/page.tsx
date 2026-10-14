import type { Metadata } from "next";
import { PaymentSuccess } from "@/components/cart/payment-success";

export const metadata: Metadata = {
  title: "Payment received — The Luxe Version",
  description: "Payment successful. Redirecting to your order confirmation."
};

export default function PaymentSuccessPage() {
  return <PaymentSuccess />;
}
