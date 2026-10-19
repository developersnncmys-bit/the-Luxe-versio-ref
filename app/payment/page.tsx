import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Payment Methods — The Luxe Version",
  description:
    "How to pay for a piece — cards, bank transfer, and the two-part structure used for commissions above a certain value."
};

export default function PaymentPage() {
  return (
    <>
      <InfoPageHero
        kicker="At Checkout"
        title="Payment"
        lede="A short, quiet checkout. The piece is held the moment payment is cleared, and the studio writes to you within a working day to confirm."
        image="/images/banners/decorative-object.png"
      />
      <InfoPageProse
        sections={[
          {
            heading: "What We Accept",
            bullets: [
              {
                label: "Cards",
                body:
                  "Visa, Mastercard, and American Express — processed over a secure gateway. We never see or store the card number; the house holds only a tokenised reference."
              },
              {
                label: "Bank transfer (NEFT / RTGS / wire)",
                body:
                  "For pieces above INR 1,00,000 or for international purchases. Account details are sent after you confirm the piece; the order is held for three working days to allow the transfer to clear."
              },
              {
                label: "UPI",
                body:
                  "For purchases within India under INR 1,00,000."
              }
            ]
          },
          {
            heading: "Commissioned & High-Value Pieces",
            paragraphs: [
              "For bespoke commissions and pieces above INR 2,00,000, the house offers a two-part structure: 50% at order, 50% before dispatch. The studio writes to you with the arrangement after a brief conversation; nothing is drawn down until you confirm."
            ]
          },
          {
            heading: "Currencies",
            paragraphs: [
              "Prices are shown in Indian Rupees and United States Dollars on every piece. The amount charged is the amount displayed in your selected currency — we do not add a conversion margin.",
              "International bank transfers are received in USD; cards are charged in the currency of the piece as displayed."
            ]
          },
          {
            heading: "Receipts & Documents",
            paragraphs: [
              "A tax invoice is sent by email the moment payment clears, and a printed certificate of provenance ships with every piece. GST is applied where applicable."
            ]
          },
          {
            heading: "Security",
            paragraphs: [
              "The checkout runs on PCI-DSS compliant infrastructure. The house never has access to your full card details; refunds are returned to the original method within ten working days of a confirmed return."
            ]
          }
        ]}
        closing={{
          body:
            "A question about an upcoming payment or an active order? Write with your reference number.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
