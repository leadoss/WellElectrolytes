"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

const CHECKLIST = [
  { label: "100% Natural Ingredients", desc: "No artificial anything — ever" },
  { label: "FDA Registered Facility", desc: "Made in USA under strict standards" },
  { label: "Third Party Tested", desc: "Every batch independently verified" },
  { label: "Recommended by Nutritionists", desc: "Formulated with experts" },
  { label: "Non-GMO & Gluten-Free", desc: "Clean for every lifestyle" },
  { label: "No Artificial Sweeteners", desc: "Sweetened only with natural Stevia" },
];

export default function QualitySection() {
  const { openCart } = useCartStore();

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            Our Promise
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#4A3222] leading-tight">
            Quality You Can{" "}
            <span className="text-[#2DD4C8]">Trust</span>
          </h2>
          <p className="mt-4 text-[#4A3222]/60 text-lg leading-relaxed max-w-md">
            We hold ourselves to the highest standards because your health deserves nothing less.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-[#F9F5F0] rounded-xl p-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#2DD4C8] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
                <div>
                  <p className="font-semibold text-[#4A3222] text-sm">{item.label}</p>
                  <p className="text-[#4A3222]/50 text-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={openCart}
            className="mt-8 bg-[#4A3222] text-white font-bold px-8 py-4 rounded-full text-base hover:bg-[#6B4C35] transition-colors cursor-pointer"
          >
            Shop Well Electrolytes
          </motion.button>
        </motion.div>

        {/* Right: Visual */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-[#2DD4C8]/20 to-[#2DD4C8]/5 rounded-3xl p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#2DD4C8]/10 rounded-full -translate-y-1/2 translate-x-1/2" />

            {/* Big stat */}
            <div className="text-center">
              <p className="text-8xl font-black text-[#2DD4C8]">0g</p>
              <p className="text-2xl font-black text-[#4A3222] mt-2">Sugar</p>
              <p className="text-[#4A3222]/50 text-sm mt-2">Per serving, guaranteed</p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { val: "0", unit: "Calories" },
                { val: "0", unit: "Artificial Colors" },
                { val: "0", unit: "Preservatives" },
                { val: "0", unit: "Fillers" },
              ].map((item) => (
                <div key={item.unit} className="bg-white rounded-2xl p-4 text-center shadow-sm">
                  <p className="text-3xl font-black text-[#4A3222]">{item.val}</p>
                  <p className="text-xs text-[#4A3222]/50 font-medium mt-0.5">{item.unit}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
