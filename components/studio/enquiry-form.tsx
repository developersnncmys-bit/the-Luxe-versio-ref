"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: string;
  submitLabel?: string;
  // Internal label — a hidden input value that lets us track which form a
  // submission came from if the stub is ever wired to a real endpoint.
  source?: string;
  subjectOptions?: string[];
};

// Reusable enquiry form — used by Bespoke Commissions + Contact. UI stub:
// submit shows a thank-you state, nothing posts anywhere yet. Fields match
// the house voice: name, email, phone (optional), subject, message.
export function EnquiryForm({
  eyebrow = "Write to the Studio",
  title,
  intro,
  submitLabel = "Send enquiry",
  source = "enquiry",
  subjectOptions
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI stub — a real backend would collect FormData(e.currentTarget) here.
    setSubmitted(true);
  }

  return (
    <section
      className="relative bg-ink py-28 text-chalk md:py-36"
      aria-labelledby="enquiry-form-heading"
    >
      <div className="mx-auto max-w-3xl px-6 md:px-14">
        <div className="flex flex-col items-center gap-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[10px] uppercase tracking-[0.38em] text-chalk/60"
          >
            {eyebrow}
          </motion.p>

          <motion.h2
            id="enquiry-form-heading"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] font-light uppercase leading-[1.1] tracking-[0.015em]"
          >
            {title}
          </motion.h2>

          <motion.span
            aria-hidden
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="block h-px w-14 origin-center bg-chalk/40"
          />

          {intro && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl text-[13px] leading-[1.85] text-chalk/70"
            >
              {intro}
            </motion.p>
          )}
        </div>

        <div className="relative mt-16 md:mt-20">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="thanks"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-6 border border-chalk/15 px-6 py-16 text-center md:px-14 md:py-20"
              >
                <p className="text-[10px] uppercase tracking-[0.38em] text-champagne/80">
                  Received
                </p>
                <p className="max-w-md font-display text-[clamp(1.1rem,1.4vw,1.3rem)] font-light leading-[1.4] text-chalk">
                  Thank you. The studio will write back within two working days.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[10px] uppercase tracking-[0.3em] text-chalk/60 underline underline-offset-[6px] decoration-chalk/30 transition-colors hover:text-chalk hover:decoration-chalk/60"
                >
                  Send another note
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2"
              >
                <input type="hidden" name="source" value={source} />

                <FieldText
                  id="enquiry-name"
                  name="name"
                  label="Full name"
                  required
                />
                <FieldText
                  id="enquiry-email"
                  name="email"
                  type="email"
                  label="Email"
                  required
                />
                <FieldText
                  id="enquiry-phone"
                  name="phone"
                  type="tel"
                  label="Telephone (optional)"
                />

                {subjectOptions ? (
                  <FieldSelect
                    id="enquiry-subject"
                    name="subject"
                    label="Subject"
                    options={subjectOptions}
                    required
                  />
                ) : (
                  <FieldText
                    id="enquiry-subject"
                    name="subject"
                    label="Subject"
                    required
                  />
                )}

                <div className="md:col-span-2">
                  <FieldTextarea
                    id="enquiry-message"
                    name="message"
                    label="Your note"
                    required
                  />
                </div>

                <div className="flex flex-col items-start gap-5 md:col-span-2 md:flex-row md:items-center md:justify-between md:gap-10">
                  <p className="max-w-md text-[10px] uppercase tracking-[0.26em] text-chalk/45">
                    We respond within two working days. Studio hours: Mon – Sat,
                    10 – 7.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center border border-chalk bg-chalk px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink transition-colors duration-500 ease-silk hover:bg-transparent hover:text-chalk"
                  >
                    {submitLabel}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// --- Field primitives -----------------------------------------------------
// Minimal, hairline-ruled fields: label as a small-caps rail above an
// underlined input. Matches the house's editorial restraint rather than the
// chunky Material-style text fields a Shopify stock theme would use.

function FieldText({
  id,
  name,
  label,
  type = "text",
  required = false
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-chalk/55">
        {label} {required && <span className="text-chalk/35">*</span>}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete="off"
        className="border-b border-chalk/20 bg-transparent pb-3 text-[13px] tracking-[0.02em] text-chalk outline-none transition-colors focus:border-chalk/80"
      />
    </label>
  );
}

function FieldTextarea({
  id,
  name,
  label,
  required = false
}: {
  id: string;
  name: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-chalk/55">
        {label} {required && <span className="text-chalk/35">*</span>}
      </span>
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        className="resize-y border-b border-chalk/20 bg-transparent pb-3 text-[13px] leading-[1.65] tracking-[0.02em] text-chalk outline-none transition-colors focus:border-chalk/80"
      />
    </label>
  );
}

function FieldSelect({
  id,
  name,
  label,
  options,
  required = false
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-3">
      <span className="text-[10px] uppercase tracking-[0.3em] text-chalk/55">
        {label} {required && <span className="text-chalk/35">*</span>}
      </span>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
        className="appearance-none border-b border-chalk/20 bg-transparent pb-3 text-[13px] tracking-[0.02em] text-chalk outline-none transition-colors focus:border-chalk/80"
      >
        <option value="" disabled className="bg-ink text-chalk/60">
          Select
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-ink text-chalk">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}
