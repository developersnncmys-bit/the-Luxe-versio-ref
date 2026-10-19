import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Careers — The Luxe Version",
  description:
    "The small, deliberate team behind the house — who we hire, how we work, and the open positions we are currently writing for."
};

export default function CareersPage() {
  return (
    <>
      <InfoPageHero
        kicker="Working at the House"
        title="Careers"
        lede="A small team, long hours of making, no shortcuts. If that reads as something you want to be part of, write to us — even without an open position."
        image="/images/banners/vase.png"
      />
      <InfoPageProse
        sections={[
          {
            heading: "How We Hire",
            paragraphs: [
              "There are two of us full-time at the studio and a small network of makers who build the pieces. We grow by one or two people a year, and only when the work genuinely requires it.",
              "We hire for curiosity, patience, and a point of view. The craft can be learned if the sensibility is right."
            ]
          },
          {
            heading: "Open Positions",
            paragraphs: [
              "We are currently writing for the following roles. Every post below is permanent, full-time, and based at the Bengaluru studio unless noted otherwise."
            ],
            bullets: [
              {
                label: "Studio Assistant",
                body:
                  "Supporting production and dispatch at the studio. One to two years of experience in a design or craft practice; a steady hand with photography and documentation. Bengaluru, on-site."
              },
              {
                label: "Client Correspondent",
                body:
                  "Writing to clients about pieces, commissions, and restoration — the voice of the house in a thread. Strong editorial instincts, patient listener. Bengaluru or remote (IST working hours)."
              },
              {
                label: "Senior Developer · Frontend",
                body:
                  "Taking this site forward. Deep React and Next.js, strong typographic eye, a preference for restraint over abstraction. Remote within three hours of IST."
              }
            ]
          },
          {
            heading: "What We Offer",
            bullets: [
              "A share in every piece sold during your tenure.",
              "Four weeks of annual leave plus studio closures around major festivals.",
              "An annual budget for the writing, exhibitions, and residencies that inform your work.",
              "Health cover for you and your immediate family."
            ]
          },
          {
            heading: "The Studio",
            paragraphs: [
              "Two rooms above a bookshop in Bengaluru — one for the pieces as they come in from makers, one for the writing, photography, and the small operations work that keeps the house running. Coffee is good. Light is better in the afternoon."
            ]
          }
        ]}
        closing={{
          body:
            "To apply for an open role — or to write without one — send a short note on who you are and what you make. We read everything.",
          ctaLabel: "Write to careers@theluxeversion.com",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
