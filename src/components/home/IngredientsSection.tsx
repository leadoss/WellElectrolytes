"use client";

import { motion } from "framer-motion";

const INGREDIENTS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 12h8M12 8v8"/>
      </svg>
    ),
    label: "Electrolytes",
    desc: "Sodium, Potassium, Magnesium, Calcium",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    label: "Vitamins",
    desc: "B-Complex, Vitamin C, Vitamin D3",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    label: "Minerals",
    desc: "Zinc, Iron, Selenium",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    label: "Natural Stevia",
    desc: "Zero-calorie natural sweetener",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7" aria-hidden="true">
        <path d="M12 22c4.97 0 9-2.69 9-6 0-1.56-.95-2.98-2.5-4.05.17-.6.25-1.25.25-1.95 0-3.87-3.13-7-7-7S4.5 6.13 4.5 10c0 .7.08 1.35.25 1.95C3.2 13.02 3 14.44 3 16c0 3.31 4.03 6 9 6z"/>
      </svg>
    ),
    label: "Natural Fruit Flavor",
    desc: "Real fruit-derived flavoring",
  },
];

export default function IngredientsSection() {
  return (
    <section className="py-24 bg-[#F9F5F0]">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            What's Inside
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#4A3222]">
            The <span className="text-[#2DD4C8]">Goods</span>
          </h2>
          <p className="mt-4 text-[#4A3222]/60 text-lg max-w-lg mx-auto">
            Every ingredient has a purpose. Nothing is filler. Everything is premium.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {INGREDIENTS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[#F0EAE0] group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-[#2DD4C8]/10 flex items-center justify-center mx-auto mb-4 text-[#2DD4C8] group-hover:bg-[#2DD4C8] group-hover:text-white transition-colors">
                {item.icon}
              </div>
              <h3 className="font-bold text-[#4A3222] text-sm">{item.label}</h3>
              <p className="text-[#4A3222]/50 text-xs mt-1 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
