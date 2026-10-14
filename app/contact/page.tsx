import type { Metadata } from "next";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactDetails } from "@/components/contact/contact-details";
import { EnquiryForm } from "@/components/studio/enquiry-form";

export const metadata: Metadata = {
  title: "Contact — The Luxe Version",
  description:
    "Write to the studio with a question, a piece, or a visit. We respond within two working days."
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <EnquiryForm
        source="contact"
        eyebrow="Write to the Studio"
        title="Send a note"
        intro="A question about a piece, a visit, a press request — whatever brings you here, write briefly and we will come back to you."
        submitLabel="Send note"
        subjectOptions={[
          "A piece from the collection",
          "A Luxe Exclusive piece",
          "A bespoke commission",
          "Appointment · Studio visit",
          "Press · Media",
          "Careers",
          "Other"
        ]}
      />
    </>
  );
}
