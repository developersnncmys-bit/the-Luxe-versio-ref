import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Returns — The Luxe Version",
  description:
    "How to return a piece — the thirty-day window, what qualifies, and how a return is handled from the first note to the credit."
};

export default function ReturnsPage() {
  return (
    <>
      <InfoPageHero
        kicker="If It Isn't Right"
        title="Returns"
        lede="A piece is meant to live in a room before it is kept. Thirty days to decide; the studio handles the rest."
        image="/images/banners/table-top.png"
      />
      <InfoPageProse
        sections={[
          {
            heading: "The Window",
            paragraphs: [
              "You have thirty days from the day the piece arrives at your address to tell us it isn't right. Write within that window and the return is accepted; after thirty days, the piece is yours.",
              "Made-to-order and bespoke pieces are not returnable — they were conceived for a specific room and cannot be remade for another."
            ]
          },
          {
            heading: "The Condition",
            paragraphs: [
              "The piece must be returned in the same condition it arrived in, with its original packaging and documents. We photograph every piece before it leaves; small variations from that record are expected, visible wear is not."
            ],
            bullets: [
              "Original wrapping, crate, and documentation must accompany the return.",
              "The piece must not have been installed with permanent fixtures (e.g. drilled anchors, hard-wiring).",
              "Luxe Exclusive and bespoke pieces are final sale."
            ]
          },
          {
            heading: "How It Works",
            bullets: [
              {
                label: "01 · Write",
                body:
                  "Send a note through the Contact page with your reference number and a photograph of the piece in your room. We respond within two working days."
              },
              {
                label: "02 · Collection",
                body:
                  "The studio arranges white-glove collection at a time that suits you — anywhere in India within seven working days, international within fourteen."
              },
              {
                label: "03 · Credit",
                body:
                  "Once the piece is back and inspected, the full purchase price is returned to the original payment method within ten working days. Original shipping is non-refundable."
              }
            ]
          },
          {
            heading: "If a Piece Arrives Damaged",
            paragraphs: [
              "Write to us within forty-eight hours of delivery with photographs of the piece and the outer crate. The studio arranges collection and a replacement where the edition allows, or restoration by the original maker where it does not."
            ]
          }
        ]}
        closing={{
          body:
            "A return begins with a note — reference number, a photograph, a sentence on what isn't working.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
