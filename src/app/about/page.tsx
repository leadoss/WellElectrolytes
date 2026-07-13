import { Metadata } from "next";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Well Electrolytes",
  description: "The story behind Well Electrolytes — why we exist, what we believe, and how we make the cleanest electrolytes on the market.",
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-16">
      {/* Hero */}
      <section className="bg-[#4A3222] text-white py-24 px-5 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2DD4C8] mb-4 block">Our Story</span>
          <h1 className="text-5xl md:text-6xl font-black leading-tight">
            We Got Tired of<br />
            <span className="text-[#2DD4C8]">Garbage Ingredients</span>
          </h1>
          <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-2xl mx-auto">
            So we built the electrolyte brand we always wanted — clean, effective, and delicious. No sugar. No artificial junk. Just the good stuff.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 max-w-4xl mx-auto px-5 md:px-8">
        <div className="prose prose-lg max-w-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-[#4A3222] mb-4">Why We Started Well</h2>
              <p className="text-[#4A3222]/70 leading-relaxed mb-4">
                It started with a simple frustration: every electrolyte drink on the market was either loaded with sugar, full of artificial dyes, or tasted like chemical waste. We're athletes, parents, and health-conscious people — and we deserved better.
              </p>
              <p className="text-[#4A3222]/70 leading-relaxed mb-4">
                We spent 18 months working with sports nutritionists and food scientists to create the perfect electrolyte formula. The goal: maximum hydration, zero compromise.
              </p>
              <p className="text-[#4A3222]/70 leading-relaxed">
                Today, Well Electrolytes is trusted by over 10,000 customers — from elite athletes to busy parents to everyday people who just want to drink something better.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#2DD4C8]/20 to-[#2DD4C8]/5 rounded-3xl p-8 text-center">
              <p className="text-6xl font-black text-[#2DD4C8]">18</p>
              <p className="text-xl font-bold text-[#4A3222] mt-2">Months of R&D</p>
              <div className="mt-6 space-y-3">
                {[
                  "Sports nutritionists consulted",
                  "Ingredient combinations tested",
                  "Batches independently verified",
                  "Customer taste tests conducted",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#4A3222]/70">
                    <Check size={14} className="text-[#2DD4C8] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#F9F5F0]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl font-black text-[#4A3222] text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Radical Transparency",
                desc: "Every ingredient, every amount, every source — on the label. No proprietary blends. No hidden fillers.",
                color: "#2DD4C8",
              },
              {
                title: "Uncompromising Quality",
                desc: "FDA registered facility, third party tested, non-GMO verified. We don't cut corners. Ever.",
                color: "#4A3222",
              },
              {
                title: "Actually Delicious",
                desc: "We believe healthy doesn't have to taste bad. Our flavors are crafted to taste amazing — every single time.",
                color: "#C84B8F",
              },
            ].map((val) => (
              <div key={val.title} className="bg-white rounded-2xl p-8 border border-[#F0EAE0]">
                <div
                  className="w-12 h-12 rounded-xl mb-4"
                  style={{ background: val.color + "20" }}
                />
                <h3 className="font-black text-xl text-[#4A3222] mb-2">{val.title}</h3>
                <p className="text-[#4A3222]/60 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
