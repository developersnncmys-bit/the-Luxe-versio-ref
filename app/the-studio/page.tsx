import type { Metadata } from "next";
import { JOURNAL_ENTRIES } from "@/lib/content";
import { JournalHero } from "@/components/journal/journal-hero";
import { JournalGallery } from "@/components/journal/journal-gallery";
import { JournalClosing } from "@/components/journal/journal-closing";

export const metadata: Metadata = {
  title: "The Studio — The Luxe Version",
  description: "Notes, guides and portraits from the studio."
};

export default function JournalPage() {
  return (
    <>
      <JournalHero />
      <JournalGallery entries={JOURNAL_ENTRIES} />
      <JournalClosing />
    </>
  );
}
