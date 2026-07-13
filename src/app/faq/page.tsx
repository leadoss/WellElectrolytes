"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Metadata } from "next";

const FAQS = [
  {
    q: "What makes Well Electrolytes different from other brands?",
    a: "We use zero sugar, zero artificial sweeteners (except natural Stevia), zero artificial colors, and zero fillers. Every batch is third-party tested and made in an FDA registered facility. Most electrolyte brands compromise on one of these — we don't compromise on any.",
  },
  {
    q: "How many servings are in each bag?",
    a: "Each 1 Month Supply bag contains 30 servings. The 2 Month Supply contains 60 servings. One serving per day is recommended, though many customers enjoy 2 servings on heavy workout days.",
  },
  {
    q: "When is the best time to take Well Electrolytes?",
    a: "Most customers take it first thing in the morning, before/during/after workouts, or anytime they feel dehydrated. Since it has 0 caffeine and 0 stimulants, it can be taken any time of day — even before bed.",
  },
  {
    q: "Is Well Electrolytes safe for diabetics?",
    a: "Our formula contains 0g of sugar and 0 calories, sweetened only with natural Stevia (a non-glycemic sweetener). However, we always recommend consulting with your healthcare provider before adding any supplement to your routine.",
  },
  {
    q: "Can children use Well Electrolytes?",
    a: "Well Electrolytes is formulated for adults. For children, please consult with your pediatrician first.",
  },
  {
    q: "Is it gluten-free and vegan?",
    a: "Yes! Well Electrolytes is 100% gluten-free, vegan, and non-GMO. We use only plant-derived ingredients.",
  },
  {
    q: "How do I use a promo code?",
    a: "Add items to your cart, then look for the 'Promo Code' field in the cart drawer or on the cart page. Enter your code and click Apply. The discount will be applied instantly to your order.",
  },
  {
    q: "What is your shipping policy?",
    a: "We offer free shipping on all orders over $40. Orders under $40 have a flat shipping rate. Orders typically ship within 1-2 business days and arrive in 3-5 business days.",
  },
  {
    q: "Do you offer a money-back guarantee?",
    a: "Absolutely. If you're not 100% satisfied with your purchase, contact us within 30 days for a full refund — no questions asked. We stand behind our product.",
  },
  {
    q: "Can I take Well Electrolytes while pregnant or breastfeeding?",
    a: "We recommend consulting with your OB/GYN or healthcare provider before using any supplement during pregnancy or breastfeeding.",
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: (typeof FAQS)[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-[#F0EAE0] rounded-2xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer hover:bg-[#F9F5F0] transition-colors"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-[#4A3222]">{item.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 text-[#2DD4C8]"
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[#4A3222]/70 leading-relaxed border-t border-[#F0EAE0] pt-4">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-24 pb-16 bg-[#F9F5F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-3 block">
            Got Questions?
          </span>
          <h1 className="text-5xl font-black text-[#4A3222]">FAQ</h1>
          <p className="mt-4 text-[#4A3222]/60 text-lg">
            Everything you need to know about Well Electrolytes.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-[#4A3222] rounded-3xl p-10 text-white">
          <h2 className="text-2xl font-black mb-2">Still have questions?</h2>
          <p className="text-white/60 mb-6">Our team responds within 24 hours.</p>
          <a
            href="mailto:hello@wellelectrolytes.com"
            className="bg-[#2DD4C8] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#22B5AB] transition-colors cursor-pointer inline-block"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
