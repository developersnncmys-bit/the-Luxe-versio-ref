"use client";

import { motion } from "framer-motion";

// Four quiet columns — The Studio / Telephone / Email / Hours. No icons;
// each column leads with a tiny eyebrow label and a short address block
// beneath, in the house editorial style. Hairlines separate on mobile, grid
// on desktop.
const COLUMNS: {
  label: string;
  lines: Array<string | { text: string; href: string }>;
}[] = [
  {
    label: "The Studio",
    lines: [
      "The Luxe Version Private Limited",
      "5th Floor, Unit N° 505",
      "UB City, 24 Vittal Mallya Road",
      "Bengaluru 560001, India"
    ]
  },
  {
    label: "Telephone",
    lines: [
      { text: "+91 80 4000 5050", href: "tel:+918040005050" },
      { text: "WhatsApp — same number", href: "https://wa.me/918040005050" }
    ]
  },
  {
    label: "Email",
    lines: [
      { text: "studio@theluxeversion.com", href: "mailto:studio@theluxeversion.com" },
      { text: "press@theluxeversion.com", href: "mailto:press@theluxeversion.com" }
    ]
  },
  {
    label: "Hours",
    lines: [
      "Mon – Fri · 10:00 – 19:00",
      "Saturday · 10:00 – 17:00",
      "Sunday · By appointment"
    ]
  }
];

export function ContactDetails() {
  return (
    <section
      className="relative bg-ink py-24 text-chalk md:py-32"
      aria-labelledby="contact-details-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <h2 id="contact-details-heading" className="sr-only">
          Studio details
        </h2>

        <ul className="grid grid-cols-1 divide-y divide-chalk/10 border-y border-chalk/10 md:grid-cols-4 md:divide-x md:divide-y-0">
          {COLUMNS.map((col, i) => (
            <motion.li
              key={col.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 1.1,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="flex flex-col gap-5 py-10 md:px-8 md:py-12 lg:px-10"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-chalk/55">
                {col.label}
              </p>
              <div className="flex flex-col gap-2 text-[13px] leading-[1.75] text-chalk/80 md:text-[13.5px]">
                {col.lines.map((line, j) =>
                  typeof line === "string" ? (
                    <span key={j}>{line}</span>
                  ) : (
                    <a
                      key={j}
                      href={line.href}
                      className="transition-colors hover:text-chalk"
                      target={line.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        line.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {line.text}
                    </a>
                  )
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
