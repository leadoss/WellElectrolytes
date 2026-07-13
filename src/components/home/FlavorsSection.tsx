"use client";

import { motion } from "framer-motion";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function FlavorsSection() {
  return (
    <section id="flavors" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            Choose Your Flavor
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#4A3222] leading-tight">
            Our Electrolyte<br />
            <span className="text-[#2DD4C8]">Flavors</span>
          </h2>
          <p className="mt-4 text-[#4A3222]/60 text-lg max-w-xl mx-auto">
            Three bold flavors. Zero sugar. All the minerals your body needs to perform at its best.
          </p>
        </motion.div>

        {/* Product grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#F9F5F0] border border-[#F0EAE0] rounded-full px-6 py-3">
            <span className="text-[#2DD4C8]">✓</span>
            <span className="text-sm font-semibold text-[#4A3222]">Free bottle included with every order</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
