import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Legal Statement — The Luxe Version",
  description:
    "The company behind the house, the terms under which this site is operated, and the law that applies to any order placed through it."
};

export default function LegalPage() {
  return (
    <>
      <InfoPageHero
        kicker="The House, On Paper"
        title="Legal Statement"
        lede="The company behind the house, the terms of this site, and the law that applies to anything bought through it."
        image="/images/banners/sculpture.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "The Company",
            paragraphs: [
              "This site is operated by The Luxe Version Private Limited, a company incorporated in India with its registered office at 5th Floor, Unit N° 505, UB City, 24 Vittal Mallya Road, Bengaluru 560001, India.",
              "GSTIN and corporate identification number are issued on every tax invoice."
            ]
          },
          {
            heading: "Intellectual Property",
            paragraphs: [
              "Every photograph, drawing, piece of writing, and the designs of the pieces themselves are the property of The Luxe Version Private Limited or the maker commissioned to create them.",
              "You are welcome to share the house's writing and photography with a credit and a link to the source. Use for any commercial purpose — reselling, reprinting in a catalogue, training a generative model — requires a written licence from us."
            ]
          },
          {
            heading: "The Pieces",
            paragraphs: [
              "Dimensions, weights, and colour representations are given as accurately as possible, but handmade pieces vary. The piece you receive will carry its own small differences from the photograph; this is noted on every piece page and is not a defect."
            ]
          },
          {
            heading: "Pricing & Availability",
            paragraphs: [
              "Prices are shown in Indian Rupees and United States Dollars. The price shown at the moment you confirm an order is the price that applies to that order. Prices may change at any time thereafter without notice.",
              "Where a piece is sold out between the moment you place an order and the moment the studio reads it, we write to you within a working day with a lead time, an alternative, or a refund — your choice."
            ]
          },
          {
            heading: "Governing Law",
            paragraphs: [
              "Any order placed through this site is governed by the laws of India. Disputes are subject to the exclusive jurisdiction of the courts of Bengaluru."
            ]
          },
          {
            heading: "Changes to This Statement",
            paragraphs: [
              "The house may revise this statement from time to time. The current version is always the one published at this URL; a last-updated stamp above records when it was last changed."
            ]
          }
        ]}
        closing={{
          body:
            "A legal, licensing, or press question? Write to legal@theluxeversion.com or through the Contact page.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
