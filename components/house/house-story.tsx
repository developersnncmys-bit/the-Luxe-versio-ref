"use client";

import { motion } from "framer-motion";

export function HouseStory() {
  return (
    <section
      className="relative bg-ink py-32 text-chalk md:py-48"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto max-w-editorial px-6 md:px-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.h2
            id="story-heading"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-display-md font-semibold uppercase leading-[1.02] tracking-[0.06em]"
          >
            The Luxe Version
          </motion.h2>
        </div>

        {/* Story body — everything centred on the page's vertical axis to match
            POV. Italic pull-quote first, then centred prose paragraphs. */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-5xl text-center font-display text-[clamp(1.5rem,2.4vw,2rem)] font-light italic leading-[1.35] text-chalk/90 md:mt-24"
        >
          &ldquo;We started with one sculpture and a small studio. The rest of the
          house grew around it.&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-4xl space-y-8 text-center text-[14px] leading-[1.95] text-chalk/80 md:mt-24 md:text-[15px]"
        >
          <p>
            The Luxe Version began the way most quiet things do — with a single piece,
            made carefully, that other rooms wanted. A sculpture, carved by hand, placed
            on the studio's own mantel. Then a vessel. Then a mirror. Then a form in
            bronze that did not need explaining.
          </p>
          <p>
            We opened the house because there was no place we wanted to buy these
            pieces from. The luxury stores were noisy. The design shops were dense. Both
            were full of things that had never been asked to earn their room.
          </p>
          <p>
            So the house was built on a different measure — fewer pieces, more time,
            makers we know. Objects chosen not for what they say about a room, but for
            what they let the room say back.
          </p>
          <p>
            This page is the house's introduction. The pieces themselves live in the
            collection. When you are ready, they are waiting.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
