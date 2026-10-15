import type { Metadata } from "next";
import { JOURNAL_ENTRIES } from "@/lib/content";
import { JournalHero } from "@/components/journal/journal-hero";
import { StudioProcession } from "@/components/journal/studio-procession";
import { JournalClosing } from "@/components/journal/journal-closing";

export const metadata: Metadata = {
  title: "The Studio — The Luxe Version",
  description: "Notes, guides and portraits from the studio."
};

export default function TheStudioPage() {
  return (
    <>
      <JournalHero />
      <StudioProcession entries={JOURNAL_ENTRIES} />
      <JournalClosing />
    </>
  );
}
