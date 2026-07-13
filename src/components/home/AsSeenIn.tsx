"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "Forbes", width: 80 },
  { name: "Shape", width: 70 },
  { name: "Men's Health", width: 110 },
  { name: "Women's Health", width: 130 },
  { name: "Healthline", width: 100 },
  { name: "Vogue", width: 65 },
];

export default function AsSeenIn() {
  return (
    <section className="py-12 bg-[#F9F5F0] border-y border-[#F0EAE0]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-[#4A3222]/40 mb-8">
          As Seen In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {LOGOS.map((logo, i) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center"
            >
              {/* Placeholder text logo */}
              <span
                className="font-black text-[#4A3222]/25 text-xl tracking-tight uppercase"
                style={{ minWidth: logo.width }}
                aria-label={logo.name}
              >
                {logo.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
