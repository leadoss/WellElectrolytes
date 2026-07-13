"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/lib/cartStore";
import { Check, ChevronRight, Truck, Zap, Banknote, CreditCard } from "lucide-react";

const SHIPPING_OPTIONS = [
  {
    id: "standard",
    icon: Truck,
    label: "Standard Delivery",
    desc: "3-5 business days",
    price: "FREE on orders $40+",
  },
  {
    id: "express",
    icon: Zap,
    label: "Express Delivery",
    desc: "Next business day",
    price: "$5.00",
  },
];

const PAYMENT_OPTIONS = [
  {
    id: "cod",
    icon: Banknote,
    label: "Cash on Delivery",
    desc: "Pay when your order arrives",
  },
  {
    id: "card",
    icon: CreditCard,
    label: "Credit / Debit Card",
    desc: "Visa, Mastercard accepted",
  },
];

export default function CheckoutPage() {
  const { items, getSubtotal, getDiscount, getTotal, appliedPromo } = useCartStore();
  const [submitted, setSubmitted] = useState(false);
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("cod");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    region: "",
    notes: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const shippingCost = shipping === "express" ? 5 : total >= 40 ? 0 : 3;
  const grandTotal = total + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemLines = items
      .map((item) => `• ${item.product.name} (${item.size.label}) x${item.quantity} = $${(item.product.salePrice * item.size.multiplier * item.quantity).toFixed(2)}`)
      .join("\n");

    const waMessage = `🛒 *NEW ORDER — Well Electrolytes*\n\n*Customer:* ${form.firstName} ${form.lastName}\n*Phone:* ${form.phone}\n*Email:* ${form.email || "Not provided"}\n\n*Delivery Address:*\n${form.address}, ${form.city}, ${form.region}\n${form.notes ? `Notes: ${form.notes}` : ""}\n\n*Items:*\n${itemLines}\n\n*Subtotal:* $${subtotal.toFixed(2)}${discount > 0 ? `\n*Discount (${appliedPromo?.code}):* -$${discount.toFixed(2)}` : ""}\n*Shipping (${shipping === "express" ? "Express" : "Standard"}):* ${shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}\n*TOTAL: $${grandTotal.toFixed(2)}*\n\n*Payment:* ${payment === "cod" ? "Cash on Delivery" : "Credit / Debit Card"}`;

    // Send email via API
    fetch("/api/send-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ form, items, shipping, payment, subtotal, discount, shippingCost, grandTotal, appliedPromo }),
    }).catch(() => {});

    // Open WhatsApp with order details
    window.open(`https://wa.me/${process.env.NEXT_PUBLIC_NOTIFY_WHATSAPP || "233530000220"}?text=${encodeURIComponent(waMessage)}`, "_blank");

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
            Thank you {form.firstName}! We received your order and will contact you on{" "}
            <span className="font-semibold text-[#4A3222]">{form.phone}</span> to confirm delivery.
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
                  <input type="text" name="firstName" required value={form.firstName} onChange={handleChange} placeholder="Lara"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Last Name</label>
                  <input type="text" name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Khoury"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Phone Number</label>
                  <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+961 70 000 000"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Email (optional)</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="lara@email.com"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0]">
              <h2 className="font-black text-lg text-[#4A3222] mb-5">Delivery Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Street Address</label>
                  <input type="text" name="address" required value={form.address} onChange={handleChange} placeholder="Building, Street, Area"
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">City</label>
                    <input type="text" name="city" required value={form.city} onChange={handleChange} placeholder="Beirut"
                      className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Region</label>
                    <select name="region" required value={form.region} onChange={handleChange}
                      className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] focus:outline-none focus:border-[#2DD4C8] transition-colors bg-white">
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
                  <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                    placeholder="Floor number, landmark, any delivery instructions..."
                    className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors resize-none" />
                </div>
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0]">
              <h2 className="font-black text-lg text-[#4A3222] mb-5">Shipping Method</h2>
              <div className="space-y-3">
                {SHIPPING_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = shipping === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setShipping(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                        selected ? "border-[#2DD4C8] bg-[#2DD4C8]/5" : "border-[#F0EAE0] hover:border-[#4A3222]/20"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selected ? "bg-[#2DD4C8]" : "bg-[#F9F5F0]"}`}>
                        <Icon size={18} className={selected ? "text-white" : "text-[#4A3222]/50"} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${selected ? "text-[#2DD4C8]" : "text-[#4A3222]"}`}>{opt.label}</p>
                        <p className="text-xs text-[#4A3222]/50">{opt.desc}</p>
                      </div>
                      <p className={`font-bold text-sm ${selected ? "text-[#2DD4C8]" : "text-[#4A3222]/60"}`}>{opt.price}</p>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? "border-[#2DD4C8] bg-[#2DD4C8]" : "border-[#F0EAE0]"}`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 border border-[#F0EAE0]">
              <h2 className="font-black text-lg text-[#4A3222] mb-5">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const selected = payment === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
                        selected ? "border-[#2DD4C8] bg-[#2DD4C8]/5" : "border-[#F0EAE0] hover:border-[#4A3222]/20"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${selected ? "bg-[#2DD4C8]" : "bg-[#F9F5F0]"}`}>
                        <Icon size={18} className={selected ? "text-white" : "text-[#4A3222]/50"} />
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${selected ? "text-[#2DD4C8]" : "text-[#4A3222]"}`}>{opt.label}</p>
                        <p className="text-xs text-[#4A3222]/50">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${selected ? "border-[#2DD4C8] bg-[#2DD4C8]" : "border-[#F0EAE0]"}`}>
                        {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Card fields */}
              {payment === "card" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Card Number</label>
                    <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange}
                      placeholder="1234 5678 9012 3456" maxLength={19} required={payment === "card"}
                      className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">Expiry Date</label>
                      <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange}
                        placeholder="MM / YY" maxLength={7} required={payment === "card"}
                        className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#4A3222] uppercase tracking-wide block mb-1.5">CVC</label>
                      <input type="text" name="cardCvc" value={form.cardCvc} onChange={handleChange}
                        placeholder="123" maxLength={4} required={payment === "card"}
                        className="w-full border border-[#F0EAE0] rounded-xl px-4 py-3 text-sm text-[#4A3222] placeholder:text-[#4A3222]/30 focus:outline-none focus:border-[#2DD4C8] transition-colors" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#2DD4C8] text-white font-bold py-4 rounded-full text-base hover:bg-[#22B5AB] transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#2DD4C8]/30"
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
                  <span className={shippingCost === 0 ? "text-[#2DD4C8] font-semibold" : "text-[#4A3222]"}>
                    {shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-black text-lg text-[#4A3222] pt-3 border-t border-[#F0EAE0]">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
