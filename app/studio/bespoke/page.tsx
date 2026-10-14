import type { Metadata } from "next";
import { BespokeHero } from "@/components/studio/bespoke-hero";
import { BespokeProcess } from "@/components/studio/bespoke-process";
import { BespokePromise } from "@/components/studio/bespoke-promise";
import { EnquiryForm } from "@/components/studio/enquiry-form";

export const metadata: Metadata = {
  title: "Bespoke Commissions — The Luxe Version",
  description:
    "Pieces designed and made for a single client — one of one, drawn to a room, a wall, a hand."
};

export default function BespokePage() {
  return (
    <>
      <BespokeHero />
      <BespokeProcess />
      <BespokePromise />
      <EnquiryForm
        source="bespoke"
        eyebrow="Begin a Commission"
        title="Write to the Studio"
        intro="A few lines about the piece you have in mind — the room, the scale, the material, the feeling. We respond within two working days."
        submitLabel="Send the brief"
        subjectOptions={[
          "Sculpture",
          "Lighting",
          "Vessel",
          "Wall relief",
          "I'm not sure yet"
        ]}
      />
    </>
  );
}
