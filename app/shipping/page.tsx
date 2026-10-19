import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Shipping — The Luxe Version",
  description:
    "How a piece travels — white-glove crating from the studio, insured transit, and the delivery timelines that apply inside India and abroad."
};

export default function ShippingPage() {
  return (
    <>
      <InfoPageHero
        kicker="From the Studio to the Room"
        title="Shipping"
        lede="Every piece is crated by hand at the studio, insured end-to-end, and delivered by a carrier that will unwrap it in the room where it is to live."
        image="/images/banners/figurine.png"
      />
      <InfoPageProse
        sections={[
          {
            heading: "Within India",
            bullets: [
              {
                label: "Metro cities",
                body:
                  "White-glove delivery in five to seven working days. Included in the piece price for orders above INR 50,000."
              },
              {
                label: "Rest of India",
                body:
                  "Seven to twelve working days by insured carrier. Rates calculated at checkout — typically between INR 1,500 and INR 6,000 depending on scale and distance."
              },
              {
                label: "Installation",
                body:
                  "For mirrors and heavy sculpture, our team places and secures the piece in the room at no additional cost in metro cities; charged at carrier rates elsewhere."
              }
            ]
          },
          {
            heading: "International",
            bullets: [
              {
                label: "By air",
                body:
                  "Delivered in ten to fourteen working days to any country we currently ship to. Rate calculated per piece and quoted before you confirm."
              },
              {
                label: "By sea",
                body:
                  "For large or heavy pieces where air is impractical — six to ten weeks door-to-door, substantially lower cost. Quoted individually."
              },
              {
                label: "Customs & duties",
                body:
                  "Charged to the recipient at the destination. The studio prepares all paperwork and consults on any permits a piece may require for export."
              }
            ]
          },
          {
            heading: "Crating & Insurance",
            paragraphs: [
              "Every piece leaves the studio in a crate built for it — foam-cut interior, hardwood frame, climate-stable lining for stone and glass. The crate is yours to keep for storage or future transport.",
              "Transit is insured at the full declared value of the piece from the moment it leaves the studio to the moment it is placed in your room."
            ]
          },
          {
            heading: "Tracking",
            paragraphs: [
              "You will receive a tracking link the day the piece is dispatched, and a direct line to the carrier's dedicated handler for your consignment. The studio stays on the thread until the piece is unwrapped and signed off."
            ]
          }
        ]}
        closing={{
          body:
            "A country not listed, a specific delivery window, or an installation requirement? Write to the studio before you order.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
