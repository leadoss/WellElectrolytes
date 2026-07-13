"use client";

import { motion } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";
import { PRODUCTS } from "@/lib/products";

export default function HeroSection() {
  const { addItem, openCart } = useCartStore();
  const hero = PRODUCTS[0];

  const handleShopNow = () => {
    openCart();
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white pt-20">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2DD4C8]/8 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F9F5F0] rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 w-full py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative">
        {/* Left: copy */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#2DD4C8]/10 border border-[#2DD4C8]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#2DD4C8] animate-pulse" />
            <span className="text-xs font-bold text-[#2DD4C8] uppercase tracking-widest">
              0 Sugar · 0 Calories · Pure Hydration
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black text-[#4A3222] leading-[0.95] tracking-tight"
          >
            Hydrate
            <br />
            <span className="text-[#2DD4C8]">Better.</span>
            <br />
            Feel
            <br />
            <span className="relative inline-block">
              Stronger.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2 9C50 4 100 2 150 5C200 8 250 4 298 2"
                  stroke="#2DD4C8"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 text-lg text-[#4A3222]/70 leading-relaxed max-w-md font-medium"
          >
            Premium electrolytes packed with essential minerals, vitamins, and natural flavor —
            with zero sugar, zero calories, and zero junk. Your body deserves better.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={handleShopNow}
              className="bg-[#2DD4C8] text-white font-bold px-8 py-4 rounded-full text-base hover:bg-[#22B5AB] transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-[#2DD4C8]/30"
            >
              Shop Now — $27
            </button>
            <a
              href="#flavors"
              className="border-2 border-[#4A3222] text-[#4A3222] font-bold px-8 py-4 rounded-full text-base hover:bg-[#4A3222] hover:text-white transition-all cursor-pointer"
            >
              See All Flavors
            </a>
          </motion.div>

          {/* Social proof mini */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-2">
              {["#2DD4C8", "#F97316", "#EAB308"].map((color, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: color }}
                >
                  {["M", "J", "S"][i]}
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-[#2DD4C8]" aria-label="5 stars">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-xs text-[#4A3222]/60 font-medium">Loved by 10,000+ customers</p>
            </div>
          </motion.div>
        </div>

        {/* Right: product showcase */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-sm mx-auto">
            {/* Main product card */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-gradient-to-br from-pink-400 via-purple-400 to-rose-500 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />

              {/* Product packet */}
              <div className="flex flex-col items-center gap-4 relative z-10">
                <div className="w-32 h-44 bg-white/90 rounded-3xl shadow-2xl flex flex-col items-center justify-center gap-2 border border-white/50">
                  <div className="w-16 h-16 rounded-full bg-[#C84B8F] flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-2xl">W</span>
                  </div>
                  <p className="text-xs font-black text-center text-[#C84B8F] tracking-wide">MIXED BERRIES</p>
                  <p className="text-[10px] text-gray-400 font-semibold">ELECTROLYTES</p>
                  <div className="text-[8px] text-gray-400 text-center leading-tight">
                    <p>0 CAL · 0 SUGAR</p>
                    <p>30 SERVINGS</p>
                  </div>
                </div>
                <p className="text-white font-bold text-lg drop-shadow">Mixed Berries</p>
                <p className="text-white/80 text-sm text-center">Berry-Powered Hydration</p>
              </div>
            </motion.div>

            {/* Floating badges */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-[#F0EAE0]"
            >
              <p className="text-xs font-black text-[#4A3222]">Save 10%</p>
              <p className="text-lg font-black text-[#2DD4C8]">$27</p>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-4 -left-4 bg-[#4A3222] text-white rounded-2xl p-3 shadow-xl"
            >
              <p className="text-xs font-semibold text-white/70">Zero Sugar</p>
              <p className="text-sm font-black">0g Sugar ✓</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-[#4A3222]/30 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[#2DD4C8] rounded-full" />
        </motion.div>
        <span className="text-xs text-[#4A3222]/40 font-medium tracking-widest uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
