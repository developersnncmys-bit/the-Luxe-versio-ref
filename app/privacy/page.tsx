import type { Metadata } from "next";
import { InfoPageHero } from "@/components/info/info-page-hero";
import { InfoPageProse } from "@/components/info/info-page-prose";

export const metadata: Metadata = {
  title: "Privacy Policy — The Luxe Version",
  description:
    "What data the house holds, why it is held, who it is shared with, and the choices you have over it."
};

export default function PrivacyPage() {
  return (
    <>
      <InfoPageHero
        kicker="Your Data, Held Quietly"
        title="Privacy Policy"
        lede="The short version: we collect what a conversation with a buyer requires, and nothing beyond it. The long version follows."
        image="/images/banners/Exclusive1.png"
      />
      <InfoPageProse
        lastUpdated="October 2026"
        sections={[
          {
            heading: "What We Collect",
            paragraphs: [
              "When you buy a piece, visit the studio, or write to us, we hold the details needed to serve that interaction: your name, delivery address, email, telephone, and the record of pieces you have ordered or asked about."
            ],
            bullets: [
              "Account details — email, name, phone, saved addresses.",
              "Order history — pieces purchased, prices paid, dispatch and delivery records.",
              "Correspondence — notes you have sent to the studio and our responses.",
              "Technical signals — IP address, device and browser type, pages viewed on this site, used only in aggregate to understand how the site is read."
            ]
          },
          {
            heading: "Why We Hold It",
            paragraphs: [
              "To process the sale, deliver the piece, honour returns and restoration over the life of the object, and — only where you have asked us to — to write to you about new work from the house."
            ]
          },
          {
            heading: "Who Sees It",
            paragraphs: [
              "A small number of carefully chosen partners whose work is essential to the sale: the payment gateway, the shipping carrier, our tax accountants, and the makers themselves when a bespoke commission involves them.",
              "We never sell your details. We do not share them with advertisers. We do not pass them to any third party for marketing use."
            ]
          },
          {
            heading: "How Long We Keep It",
            paragraphs: [
              "Order and tax records are kept for seven years as required by Indian financial law. Marketing consent is kept for as long as you wish it to be — withdraw it at any time, and we remove you from the list within three working days. Correspondence is retained for the active life of the pieces you have bought, so that restoration remains possible."
            ]
          },
          {
            heading: "Your Rights",
            bullets: [
              "Ask us for a copy of everything we hold on you.",
              "Correct anything that is wrong.",
              "Ask us to delete your details — subject to the seven-year legal retention on tax records.",
              "Withdraw marketing consent at any time."
            ]
          },
          {
            heading: "Cookies",
            paragraphs: [
              "This site uses the minimum cookies required to run — a session cookie for the cart, and anonymous analytics to understand how the site is read. No advertising cookies. No cross-site tracking."
            ]
          },
          {
            heading: "Writing to Us",
            paragraphs: [
              "For any request about the data we hold on you, write to privacy@theluxeversion.com. We respond within ten working days as required by law, and usually much sooner."
            ]
          }
        ]}
        closing={{
          body:
            "A specific request on your data — access, correction, deletion — begins with a note.",
          ctaLabel: "Write to the studio",
          ctaHref: "/contact"
        }}
      />
    </>
  );
}
