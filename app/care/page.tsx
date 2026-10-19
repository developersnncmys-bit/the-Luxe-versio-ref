import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Care & Restoration — The Luxe Version",
  description:
    "How to live with and look after the pieces — and the studio's restoration service for the ones that have aged."
};

export default function CarePage() {
  return (
    <>
      <InfoPageHero
        kicker="Living with the Pieces"
        title="Care & Restoration"
        lede="Every object is made to be lived with. These are the small, slow rituals that keep each one at its best — and the studio's hand when a piece is ready to be taken back in."
        image="/images/banners/sculpture.png"
      />
      <InfoPageProse
        sections={[
          {
            heading: "The Everyday",
            paragraphs: [
              "Dust the surface with a dry, soft cloth once a week. For carved stone and bronze, no cleaner is needed — the piece is denser than any residue the room will leave on it.",
              "Hand-blown glass and ceramic may be rinsed in warm water with a drop of unscented soap. Do not use the dishwasher; the heat shortens the life of hand-applied glazes and finishes."
            ]
          },
          {
            heading: "Materials, Specifically",
            bullets: [
              {
                label: "Carrara & travertine",
                body:
                  "A damp microfibre once a month. Blot any spill immediately — stone will absorb oils over hours, not minutes. Avoid citrus-based cleaners."
              },
              {
                label: "Unlacquered brass",
                body:
                  "It is meant to darken. Leave it. If you prefer the original lustre, a brass polish once a year will take it back — but most of our clients let the patina deepen."
              },
              {
                label: "Hand-blown glass",
                body:
                  "Warm water, soft cloth, no abrasives. Small bubbles and faint seams are the maker's signature, not a defect."
              },
              {
                label: "Linen & silk",
                body:
                  "Spot-clean cold. Do not tumble dry. A gentle hand-wash restores the drape between seasons."
              }
            ]
          },
          {
            heading: "Restoration",
            paragraphs: [
              "Pieces that leave the house eventually come back. A chip in the stone, a hairline in a glaze, a brass fitting that wants re-seating — the studio restores every object it has made, for the life of the piece.",
              "Write to us with photographs and the piece's reference number. We will quote the work and, where the original maker is available, return the piece to the same hands."
            ]
          }
        ]}
        closing={{
          body:
            "A question about a specific piece, or a restoration quote? Write to the studio.",
          ctaLabel: "Reach the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
