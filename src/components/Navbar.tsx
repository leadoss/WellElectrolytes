"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/cartStore";

const NAV_LINKS = [
  { label: "Shop", href: "/products/mixed-berries" },
  { label: "Flavors", href: "/#flavors" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { getItemCount, openCart } = useCartStore();
  const itemCount = getItemCount();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-[#F0EAE0]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
            aria-label="Well Electrolytes home"
          >
            <div className="w-8 h-8 rounded-full bg-[#2DD4C8] flex items-center justify-center">
              <span className="text-white font-black text-sm">W</span>
            </div>
            <span className="font-black text-lg tracking-tight text-[#4A3222]">
              Well<span className="text-[#2DD4C8]">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-[#4A3222] hover:text-[#2DD4C8] transition-colors duration-200 cursor-pointer tracking-wide uppercase"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2 text-[#4A3222] hover:text-[#2DD4C8] transition-colors cursor-pointer"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingBag size={22} />
              {itemCount > 0 && (
                <motion.span
                  key={itemCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#2DD4C8] text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center"
                  style={{ width: 18, height: 18, fontSize: 10 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              className="hidden md:flex items-center gap-2 bg-[#2DD4C8] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#22B5AB] transition-colors cursor-pointer"
              onClick={openCart}
            >
              Shop Now
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-[#4A3222] cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-[#F0EAE0] shadow-lg"
          >
            <nav className="flex flex-col px-5 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-base font-semibold text-[#4A3222] hover:text-[#2DD4C8] transition-colors uppercase tracking-wide cursor-pointer"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                className="mt-2 bg-[#2DD4C8] text-white font-semibold py-3 rounded-full hover:bg-[#22B5AB] transition-colors cursor-pointer"
                onClick={() => { setMobileOpen(false); openCart(); }}
              >
                Shop Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
