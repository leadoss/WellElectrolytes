"use client";

import { motion } from "framer-motion";

export default function SocialProofStrip() {
  return (
    <section className="py-14 bg-[#4A3222] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10"
        >
          <div className="flex text-[#2DD4C8] text-3xl tracking-widest" aria-label="5 stars">
            ★★★★★
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-black">Trusted by <span className="text-[#2DD4C8]">10,000+</span> Happy Customers</p>
            <p className="text-white/60 mt-2 text-sm font-medium">4.9/5 average rating · Verified purchases</p>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {[
            { stat: "10K+", label: "Happy Customers" },
            { stat: "4.9★", label: "Average Rating" },
            { stat: "100%", label: "Natural Ingredients" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/10 rounded-2xl py-5 px-3"
            >
              <p className="text-2xl font-black text-[#2DD4C8]">{item.stat}</p>
              <p className="text-xs text-white/60 font-medium mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
