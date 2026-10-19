import type { Metadata } from "next";
import { ServiceHero } from "@/components/studio/service-hero";
import { ServiceProcess } from "@/components/studio/service-process";
import { ServicePromise } from "@/components/studio/service-promise";
import { EnquiryForm } from "@/components/studio/enquiry-form";

export const metadata: Metadata = {
  title: "Book an Appointment — The Luxe Version",
  description:
    "An unhurried hour at the studio. Pieces seen in person, under the light they were made for."
};

export default function AppointmentPage() {
  return (
    <>
      <ServiceHero
        id="appointment"
        eyebrow="Studio Services · By Appointment"
        title="Book an Appointment"
        lede="An unhurried hour at the studio. Pieces seen in person, under the light they were made for."
        image="/images/banners/decorative-object.png"
        cta={{ href: "#appointment-process", label: "How a visit works" }}
      />
      <ServiceProcess
        id="appointment"
        eyebrow="The Visit"
        title="From a note to an hour at the studio"
        steps={[
          {
            label: "The Request",
            body:
              "Write to the studio with a preferred day, a window of time, and a short note on what you'd like to see — the full collection, a specific piece, or a direction you're exploring for a room."
          },
          {
            label: "The Confirmation",
            body:
              "We propose a time and share a short note on what we'll bring out of storage. If a piece needs to be lit a particular way, we'll set it up before you arrive."
          },
          {
            label: "The Visit",
            body:
              "An unhurried hour at the studio. No sales floor, no script — a conversation about materials, scale, and the pieces themselves. Tea, water, time."
          }
        ]}
      />
      <ServicePromise
        id="appointment"
        image="/images/banners/figurine.png"
        imageAlt="A quiet corner of the studio prepared for a private viewing"
        fallbackSeed="appointment-promise"
        eyebrow="The Studio"
        title="Pieces seen in person"
        body="The studio sits above UB City on Vittal Mallya Road, Bengaluru. Appointments are complimentary and run through the week. A single visit is held for one guest or one small party at a time — not shared with another viewing."
        rows={[
          { label: "Where", value: "UB City · Bengaluru" },
          { label: "Duration", value: "60 – 90 minutes" },
          { label: "Hours", value: "Mon – Fri · 10:00 – 19:00" },
          { label: "Weekend", value: "Sat · 10:00 – 17:00 · Sun by request" }
        ]}
      />
      <EnquiryForm
        source="appointment"
        eyebrow="Request a Visit"
        title="Write to the Studio"
        intro="Share a preferred day and a short note on what you'd like to see. We respond within two working days."
        submitLabel="Request appointment"
        subjectOptions={[
          "Studio visit · the full collection",
          "Private viewing · a specific piece",
          "Trade · Interior / Architect",
          "Press · Media",
          "Other"
        ]}
      />
    </>
  );
}
