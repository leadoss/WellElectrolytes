"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import ProductImage from "./ProductImage";

export default function CartDrawer() {
  const {
    items, isOpen, closeCart,
    removeItem, updateQuantity,
    appliedPromo, applyPromo, removePromo,
    getSubtotal, getDiscount, getTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const freeShippingThreshold = 40;
  const freeShippingProgress = Math.min((total / freeShippingThreshold) * 100, 100);

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMsg({ text: result.message, ok: result.success });
    if (result.success) setPromoInput("");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#F0EAE0]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#2DD4C8]" />
                <h2 className="font-bold text-lg text-[#4A3222]">Your Cart</h2>
                {items.length > 0 && (
                  <span className="bg-[#2DD4C8] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {items.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-[#F9F5F0] rounded-full transition-colors cursor-pointer text-[#4A3222]"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free shipping bar */}
            {total < freeShippingThreshold && (
              <div className="px-6 py-3 bg-[#F9F5F0]">
                <p className="text-xs text-[#4A3222] font-medium mb-1.5">
                  Add <span className="font-bold text-[#2DD4C8]">${(freeShippingThreshold - total).toFixed(2)}</span> more for <span className="font-bold">FREE shipping</span>
                </p>
                <div className="h-1.5 bg-[#F0EAE0] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#2DD4C8] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${freeShippingProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            )}
            {total >= freeShippingThreshold && (
              <div className="px-6 py-3 bg-[#2DD4C8]/10 text-sm font-semibold text-[#2DD4C8] text-center">
                You qualify for FREE shipping!
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-48 text-center gap-3"
                  >
                    <ShoppingBag size={40} className="text-[#F0EAE0]" />
                    <p className="text-[#4A3222]/60 font-medium">Your cart is empty</p>
                    <button
                      onClick={closeCart}
                      className="text-[#2DD4C8] font-semibold text-sm hover:underline cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={`${item.product.id}-${item.size.value}`}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-3 bg-[#F9F5F0] rounded-xl p-3"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <ProductImage product={item.product} size="sm" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-[#4A3222] truncate">{item.product.name}</p>
                        <p className="text-xs text-[#4A3222]/60">{item.size.label}</p>
                        <p className="text-sm font-bold text-[#2DD4C8] mt-0.5">
                          ${(item.product.salePrice * item.size.multiplier * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => removeItem(item.product.id, item.size.value)}
                          className="text-[#4A3222]/40 hover:text-red-500 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <X size={14} />
                        </button>
                        <div className="flex items-center gap-1 bg-white rounded-lg border border-[#F0EAE0]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size.value, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#4A3222] hover:bg-[#F9F5F0] rounded-l-lg cursor-pointer"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-xs font-bold text-[#4A3222]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size.value, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center text-[#4A3222] hover:bg-[#F9F5F0] rounded-r-lg cursor-pointer"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[#F0EAE0] px-6 py-5 space-y-4">
                {/* Promo code */}
                <div>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-[#2DD4C8]/10 rounded-lg px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-[#2DD4C8]" />
                        <span className="text-sm font-semibold text-[#2DD4C8]">
                          {appliedPromo.code} — {appliedPromo.percentPct}% off
                        </span>
                      </div>
                      <button
                        onClick={() => { removePromo(); setPromoMsg(null); }}
                        className="text-[#4A3222]/40 hover:text-red-500 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => { setPromoInput(e.target.value); setPromoMsg(null); }}
                        onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
                        placeholder="Promo code"
                        className="flex-1 border border-[#F0EAE0] rounded-lg px-3 py-2 text-sm text-[#4A3222] placeholder:text-[#4A3222]/40 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-[#4A3222] text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#6B4C35] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  {promoMsg && (
                    <p className={`text-xs mt-1.5 font-medium ${promoMsg.ok ? "text-[#2DD4C8]" : "text-red-500"}`}>
                      {promoMsg.text}
                    </p>
                  )}
                </div>

                {/* Totals */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm text-[#4A3222]/70">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-[#2DD4C8] font-semibold">
                      <span>Discount ({appliedPromo?.percentPct}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-base text-[#4A3222] pt-2 border-t border-[#F0EAE0]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full bg-[#2DD4C8] text-white font-bold py-4 rounded-full text-base hover:bg-[#22B5AB] transition-colors cursor-pointer flex items-center justify-center gap-2">
                  Checkout
                  <ChevronRight size={18} />
                </button>

                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-sm text-[#4A3222]/60 hover:text-[#4A3222] cursor-pointer font-medium"
                >
                  View Full Cart
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
