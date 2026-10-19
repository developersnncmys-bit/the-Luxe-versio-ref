import type { Metadata } from "next";
import { ServiceHero } from "@/components/studio/service-hero";
import { ServiceProcess } from "@/components/studio/service-process";
import { ServicePromise } from "@/components/studio/service-promise";
import { EnquiryForm } from "@/components/studio/enquiry-form";

export const metadata: Metadata = {
  title: "Interior Consultation — The Luxe Version",
  description:
    "An eye brought into your home. Pieces chosen, placed, and lit — the quietest beat of the design process."
};

export default function InteriorPage() {
  return (
    <>
      <ServiceHero
        id="interior"
        eyebrow="Studio Services · In Residence"
        title="Interior Consultation"
        lede="An eye brought into your home. Pieces chosen, placed, lit — the quietest beat of the design process."
        image="/images/banners/table-top.png"
        cta={{ href: "#interior-process", label: "How it works" }}
      />
      <ServiceProcess
        id="interior"
        eyebrow="The Process"
        title="From a room to a resolved scheme"
        steps={[
          {
            label: "The Visit",
            body:
              "A visit to the room — on site in Bengaluru or over a long call elsewhere. Light, scale, materials already in the room, how the space is lived in. Nothing proposed on the first visit; only read."
          },
          {
            label: "The Edit",
            body:
              "A short written scheme follows — a tight edit of pieces, drawn from the house's regular line or commissioned bespoke, with a rationale for each. Not a mood board; a shortlist."
          },
          {
            label: "The Placement",
            body:
              "Pieces placed in the room, by the studio, on a day we agree. Lighting adjusted, plinths dressed, final sightlines settled. The scheme is left as a single resolved composition, not a delivery."
          }
        ]}
      />
      <ServicePromise
        id="interior"
        image="/images/banners/lighting.png"
        imageAlt="A resolved interior with sculptural pieces placed and lit"
        fallbackSeed="interior-promise"
        eyebrow="The Service"
        title="A quiet eye, one room at a time"
        body="The studio takes a small number of interior consultations each year. The service is best suited to a single resolved room — a drawing room, a foyer, a primary bedroom — or a full home where restraint matters more than coverage."
        mirror
        rows={[
          { label: "Scope", value: "Single room · Full home" },
          { label: "Includes", value: "Site read · Scheme · Placement" },
          { label: "Fee", value: "On application" },
          { label: "Where", value: "India + select international" }
        ]}
      />
      <EnquiryForm
        source="interior"
        eyebrow="Begin a Consultation"
        title="Write to the Studio"
        intro="A few lines about the room, how it's used, and what you're trying to resolve. We respond within two working days."
        submitLabel="Send the brief"
        subjectOptions={[
          "A single room",
          "Full-home consultation",
          "A specific wall or alcove",
          "Lighting scheme only",
          "Trade · Interior / Architect",
          "Other"
        ]}
      />
    </>
  );
}
