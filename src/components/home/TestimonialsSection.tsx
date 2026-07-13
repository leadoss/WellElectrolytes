"use client";

import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    handle: "@sarahfitlife",
    avatar: "#2DD4C8",
    text: "I've tried every electrolyte on the market. Well is the ONLY one that tastes amazing without that horrible sugar crash. The mixed berries flavor is genuinely delicious.",
    stars: 5,
    product: "Mixed Berries",
  },
  {
    name: "Jake Thompson",
    handle: "@jakefitness",
    avatar: "#F97316",
    text: "As a personal trainer, I recommend Well Electrolytes to all my clients. Zero sugar, zero BS — exactly what you need during and after a tough workout.",
    stars: 5,
    product: "Orange",
  },
  {
    name: "Priya Sharma",
    handle: "@priyawellness",
    avatar: "#EAB308",
    text: "The lemon flavor is insane. I drink it every morning instead of coffee now. Keeps me hydrated all day and I love that it's 0 calories.",
    stars: 5,
    product: "Lemon",
  },
  {
    name: "Carlos D.",
    handle: "@carlosruns",
    avatar: "#C84B8F",
    text: "Been using Well for 3 months and I can feel the difference during my long runs. No cramps, better endurance, and it actually tastes good.",
    stars: 5,
    product: "Mixed Berries",
  },
  {
    name: "Mia Rodriguez",
    handle: "@miahealth",
    avatar: "#6366F1",
    text: "Finally an electrolyte that my whole family can drink. No artificial junk, no sugar — just clean hydration. We go through a bag a week.",
    stars: 5,
    product: "Orange",
  },
  {
    name: "Alex Kim",
    handle: "@alexkimfit",
    avatar: "#10B981",
    text: "The fact that it's third party tested and FDA registered was the deciding factor for me. I trust this product completely and the results speak for themselves.",
    stars: 5,
    product: "Lemon",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            Real Customers, Real Results
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#4A3222]">
            What Our Customers<br />
            <span className="text-[#2DD4C8]">Are Saying</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-[#F9F5F0] rounded-2xl p-6 border border-[#F0EAE0] hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex text-[#2DD4C8] text-sm mb-3" aria-label="5 stars">
                {"★★★★★".split("").map((s, j) => <span key={j}>{s}</span>)}
              </div>

              {/* Text */}
              <p className="text-[#4A3222] text-sm leading-relaxed font-medium">&ldquo;{t.text}&rdquo;</p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#F0EAE0]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ background: t.avatar }}
                  aria-hidden="true"
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-bold text-sm text-[#4A3222]">{t.name}</p>
                  <p className="text-xs text-[#4A3222]/40">{t.handle} · {t.product}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
