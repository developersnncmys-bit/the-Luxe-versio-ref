import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Frequently Asked — The Luxe Version",
  description:
    "Answers to the questions we hear most often — on the pieces, the house, lead times, delivery, bespoke work, and what to expect after a purchase."
};

export default function FaqPage() {
  return (
    <>
      <InfoPageHero
        kicker="Before You Write"
        title="Frequently Asked"
        lede="The questions we hear most often. If yours isn't here, write to the studio."
        image="/images/banners/vase.png"
      />
      <InfoPageProse
        variant="faq"
        sections={[
          {
            heading: "The Pieces",
            bullets: [
              {
                label: "Are the pieces made in a factory?",
                body:
                  "No. Every object sold here is hand-finished — carved, blown, thrown, or glazed by a named maker in a small studio. Edition sizes are set by what the maker can produce by hand each year."
              },
              {
                label: "Why does the same piece look slightly different in different photos?",
                body:
                  "Because each one is. Stone veining, glass bubbles, brass patina — none repeat. The piece you receive will carry its own markings; that is the point."
              },
              {
                label: "Do you restock?",
                body:
                  "Rarely. When a maker finishes an edition, we move on. A few pieces are made-to-order; those are flagged on the piece's own page with a lead time."
              }
            ]
          },
          {
            heading: "Ordering & Lead Times",
            bullets: [
              {
                label: "How long until my piece arrives?",
                body:
                  "In-stock pieces leave the studio within five working days. Made-to-order pieces are quoted individually — typically four to eight weeks for ceramics, six to twelve for stone and glass work."
              },
              {
                label: "Can I visit before I buy?",
                body:
                  "Yes. The studio is open by appointment, Tuesday through Saturday. Book through the Contact page."
              },
              {
                label: "Do you offer payment plans?",
                body:
                  "For pieces above INR 2,00,000, we offer a two-part structure: 50% at order, 50% before dispatch. Written to you after a brief conversation."
              }
            ]
          },
          {
            heading: "Bespoke",
            bullets: [
              {
                label: "Can you make something I have in mind?",
                body:
                  "Often, yes. Begin a commission through the Studio → Bespoke page with a sketch, a reference, or a few lines on the room. We quote within a week."
              },
              {
                label: "Will my bespoke piece ever be remade?",
                body:
                  "No. A bespoke piece belongs to the room it was conceived for. The studio retains working drawings for restoration, nothing more."
              }
            ]
          },
          {
            heading: "After the Piece Arrives",
            bullets: [
              {
                label: "What if it isn't right?",
                body:
                  "Return it within thirty days of delivery — see the Returns page for how. Made-to-order and bespoke are not returnable."
              },
              {
                label: "What if it is damaged in transit?",
                body:
                  "Write to us within forty-eight hours of delivery with photographs. We arrange collection and replacement, or restoration where appropriate — see the Care & Restoration page."
              }
            ]
          }
        ]}
        closing={{
          body:
            "Still have a question? The studio reads every note and responds within two working days.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
