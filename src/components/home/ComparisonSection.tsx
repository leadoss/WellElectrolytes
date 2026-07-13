"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const ROWS = [
  { feature: "Zero Sugar", us: true, them: false },
  { feature: "Zero Calories", us: true, them: false },
  { feature: "Natural Stevia Sweetener", us: true, them: false },
  { feature: "No Artificial Colors", us: true, them: false },
  { feature: "Essential Minerals (Na, K, Mg, Ca)", us: true, them: true },
  { feature: "B-Vitamins Included", us: true, them: false },
  { feature: "FDA Registered Facility", us: true, them: false },
  { feature: "Third Party Tested", us: true, them: false },
  { feature: "Non-GMO", us: true, them: false },
  { feature: "Free Bottle with Every Order", us: true, them: false },
];

export default function ComparisonSection() {
  return (
    <section className="py-24 bg-[#F9F5F0]">
      <div className="max-w-4xl mx-auto px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            The Difference Is Clear
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#4A3222]">
            Well Electrolytes<br />
            <span className="text-[#2DD4C8]">vs</span> Other Brands
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#F0EAE0]"
        >
          {/* Header */}
          <div className="grid grid-cols-3 bg-[#4A3222] text-white">
            <div className="py-4 px-6 font-bold text-sm">Feature</div>
            <div className="py-4 px-4 font-bold text-sm text-center bg-[#2DD4C8]">
              Well Electrolytes ✓
            </div>
            <div className="py-4 px-4 font-bold text-sm text-center text-white/50">
              Other Brands
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-[#F0EAE0] last:border-0 ${
                i % 2 === 0 ? "bg-white" : "bg-[#F9F5F0]/50"
              }`}
            >
              <div className="py-3.5 px-6 text-sm font-medium text-[#4A3222]">
                {row.feature}
              </div>
              <div className="py-3.5 px-4 flex items-center justify-center bg-[#2DD4C8]/5">
                {row.us ? (
                  <div className="w-6 h-6 rounded-full bg-[#2DD4C8] flex items-center justify-center">
                    <Check size={13} className="text-white" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X size={13} className="text-red-500" strokeWidth={3} />
                  </div>
                )}
              </div>
              <div className="py-3.5 px-4 flex items-center justify-center">
                {row.them ? (
                  <div className="w-6 h-6 rounded-full bg-[#2DD4C8]/20 flex items-center justify-center">
                    <Check size={13} className="text-[#2DD4C8]" strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                    <X size={13} className="text-red-400" strokeWidth={3} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
