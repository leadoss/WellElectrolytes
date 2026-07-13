"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { Check, ChevronRight } from "lucide-react";

export default function CheckoutPage() {
  const { items, getSubtotal, getDiscount, getTotal, appliedPromo } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    region: "",
    notes: "",
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F5F0] pt-32 pb-16 flex items-center justify-center px-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-lg border border-[#F0EAE0]"
        >
          <div className="w-20 h-20 bg-[#2DD4C8] rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-white" strokeWidth={3} />
          </div>
          <h1 className="text-3xl font-black text-[#4A3222] mb-3">Order Placed!</h1>
          <p className="text-[#4A3222]/60 leading-relaxed mb-8">
            Thank you {form.firstName}! We received your order and will contact you on <span className="font-semibold text-[#4A3222]">{form.phone}</span> to confirm delivery.
          </p>
          <Link
            href="/"
            className="bg-[#2DD4C8] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#22B5AB] transition-colors inline-block"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F5F0] pt-32 pb-16">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-[#4A3222]">Checkout</h1>
          <p className="text-[#4A3222]/50 mt-1">Fill in your details and we will deliver to your door.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-5">
            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0]">
              <h2 className="font-black text-lg text-[#4A3222] mb-5">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Lara"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Khoury"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+961 70 000 000"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Email (optional)</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="lara@email.com"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0]">
              <h2 className="font-black text-lg text-[#4A3222] mb-5">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Building, Street, Area"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Beirut"
                      className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Region</label>
                    <select
                      name="region"
                      required
                      value={form.region}
                      onChange={handleChange}
                      className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] focus:outline-none focus:border-[#2DD4C8] transition-colors bg-white"
                    >
                      <option value="">Select region</option>
                      <option>Beirut</option>
                      <option>Mount Lebanon</option>
                      <option>North Lebanon</option>
                      <option>South Lebanon</option>
                      <option>Bekaa</option>
                      <option>Nabatieh</option>
                      <option>Akkar</option>
                      <option>Baalbek-Hermel</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Delivery Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Floor number, landmark, any delivery instructions..."
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2DD4C8] text-white font-bold py-4 rounded-full text-base hover:bg-[#22B5AB] transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              Place Order
              <ChevronRight size={18} />
            </button>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0] sticky top-28 space-y-4">
              <h2 className="font-black text-lg text-[#4A3222]">Order Summary</h2>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size.value}`} className="flex justify-between items-center text-sm">
                    <div>
                      <p className="font-semibold text-[#4A3222]">{item.product.name}</p>
                      <p className="text-[#4A3222]/50 text-xs">{item.size.label} x{item.quantity}</p>
                    </div>
                    <p className="font-bold text-[#4A3222]">${(item.product.salePrice * item.size.multiplier * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#F0EAE0] space-y-2">
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
                  <span className="text-[#2DD4C8] font-semibold">{total >= 40 ? "FREE" : "Calculated on delivery"}</span>
                </div>
                <div className="flex justify-between font-black text-lg text-[#4A3222] pt-3 border-t border-[#F0EAE0]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
