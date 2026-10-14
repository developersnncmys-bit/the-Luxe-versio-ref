import type { Metadata } from "next";
import { EDITS, PRODUCTS, type Product } from "@/lib/content";
import { EditHero } from "@/components/edit/edit-hero";
import { EditIntro } from "@/components/edit/edit-intro";
import { EditSection } from "@/components/edit/edit-section";
import { EditClosing } from "@/components/edit/edit-closing";

export const metadata: Metadata = {
  title: "The Edit — The Luxe Version",
  description: "A selection of objects chosen for the season."
};

export default function EditPage() {
  const byHandle = new Map(PRODUCTS.map((p) => [p.handle, p]));
  const resolveEdit = (handles: string[]): Product[] =>
    handles
      .map((h) => byHandle.get(h))
      .filter((p): p is Product => p !== undefined);

  return (
    <>
      <EditHero />
      <EditIntro />
      {EDITS.map((edit, i) => (
        <EditSection
          key={edit.slug}
          id={edit.slug}
          number={edit.number}
          title={edit.title}
          intro={edit.intro}
          products={resolveEdit(edit.handles)}
          mirror={i % 2 === 1}
        />
      ))}
      <EditClosing />
    </>
  );
}
