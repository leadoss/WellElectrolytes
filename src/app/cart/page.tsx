"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Plus, Minus, X, Tag, ChevronRight, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import ProductImage from "@/components/ProductImage";

export default function CartPage() {
  const {
    items, removeItem, updateQuantity,
    appliedPromo, applyPromo, removePromo,
    getSubtotal, getDiscount, getTotal,
  } = useCartStore();

  const [promoInput, setPromoInput] = useState("");
  const [promoMsg, setPromoMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const handleApplyPromo = () => {
    if (!promoInput.trim()) return;
    const result = applyPromo(promoInput);
    setPromoMsg({ text: result.message, ok: result.success });
    if (result.success) setPromoInput("");
  };

  return (
    <div className="min-h-screen bg-[#F9F5F0] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <h1 className="text-4xl font-black text-[#4A3222] mb-8">Your Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <ShoppingBag size={60} className="mx-auto text-[#F0EAE0] mb-6" />
            <h2 className="text-2xl font-bold text-[#4A3222]">Your cart is empty</h2>
            <p className="text-[#4A3222]/60 mt-2 mb-8">Add some electrolytes and stay hydrated!</p>
            <Link
              href="/#flavors"
              className="bg-[#2DD4C8] text-white font-bold px-8 py-4 rounded-full hover:bg-[#22B5AB] transition-colors cursor-pointer inline-block"
            >
              Shop All Flavors
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.product.id}-${item.size.value}`}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white rounded-2xl p-4 border border-[#F0EAE0] flex gap-4"
                  >
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <ProductImage product={item.product} size="sm" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-bold text-[#4A3222] hover:text-[#2DD4C8] transition-colors cursor-pointer"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-[#4A3222]/50">{item.size.label}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size.value)}
                          className="text-[#4A3222]/30 hover:text-red-500 transition-colors cursor-pointer ml-2"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 bg-[#F9F5F0] rounded-lg border border-[#F0EAE0]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size.value, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#4A3222] hover:bg-[#F0EAE0] rounded-l-lg cursor-pointer transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-[#4A3222]">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size.value, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-[#4A3222] hover:bg-[#F0EAE0] rounded-r-lg cursor-pointer transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-black text-xl text-[#4A3222]">
                          ${(item.product.salePrice * item.size.multiplier * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0] sticky top-24 space-y-5">
                <h2 className="font-black text-xl text-[#4A3222]">Order Summary</h2>

                {/* Promo */}
                <div>
                  <p className="text-sm font-bold text-[#4A3222] mb-2 uppercase tracking-wide">Promo Code</p>
                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-[#2DD4C8]/10 rounded-xl px-3 py-2.5">
                      <div className="flex items-center gap-2">
                        <Tag size={14} className="text-[#2DD4C8]" />
                        <span className="text-sm font-semibold text-[#2DD4C8]">
                          {appliedPromo.code}: {appliedPromo.percentPct}% off
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
                        placeholder="Enter promo code"
                        className="flex-1 border border-[#F0EAE0] rounded-xl px-3 py-2.5 text-sm text-[#4A3222] placeholder:text-[#4A3222]/40 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                      />
                      <button
                        onClick={handleApplyPromo}
                        className="bg-[#4A3222] text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#6B4C35] transition-colors cursor-pointer"
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
                <div className="space-y-2 pt-4 border-t border-[#F0EAE0]">
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
                  <div className="flex justify-between text-sm text-[#4A3222]/70">
                    <span>Shipping</span>
                    <span className="text-[#2DD4C8] font-semibold">{total >= 40 ? "FREE" : "Calculated at checkout"}</span>
                  </div>
                  <div className="flex justify-between font-black text-lg text-[#4A3222] pt-3 border-t border-[#F0EAE0]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="w-full bg-[#2DD4C8] text-white font-bold py-4 rounded-full text-base hover:bg-[#22B5AB] transition-colors cursor-pointer flex items-center justify-center gap-2">
                  Proceed to Checkout
                  <ChevronRight size={18} />
                </Link>

                <Link href="/#flavors" className="block text-center text-sm text-[#4A3222]/50 hover:text-[#4A3222] cursor-pointer font-medium">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
