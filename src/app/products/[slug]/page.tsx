"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ShoppingBag, Check, Star, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getProductBySlug, PRODUCTS } from "@/lib/products";
import { useCartStore } from "@/lib/cartStore";
import ProductImage from "@/components/ProductImage";
import ProductCard from "@/components/ProductCard";
import { use } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [added, setAdded] = useState(false);
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, selectedSize);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  };

  const displayPrice = (product.salePrice * selectedSize.multiplier).toFixed(2);
  const regularPrice = (product.price * selectedSize.multiplier).toFixed(2);
  const related = PRODUCTS.filter((p) => p.slug !== slug).slice(0, 2);

  return (
    <div className="pt-32">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-[#4A3222]/50">
          <Link href="/" className="hover:text-[#2DD4C8] cursor-pointer transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/#flavors" className="hover:text-[#2DD4C8] cursor-pointer transition-colors">Products</Link>
          <ChevronRight size={14} />
          <span className="text-[#4A3222] font-medium">{product.name}</span>
        </div>
      </div>

      {/* Main product */}
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=""
        >
          <div className="rounded-3xl overflow-hidden h-96 md:h-[500px]">
            <ProductImage product={product} size="lg" />
          </div>
          {/* Hashtags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {product.hashtags.map((tag) => (
              <span key={tag} className="bg-[#F9F5F0] text-[#4A3222]/60 text-xs font-medium px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Badge */}
          <span className="inline-block bg-[#4A3222] text-white text-xs font-bold px-3 py-1 rounded-full">
            Save {product.savePct}% Today
          </span>

          <div>
            <h1 className="text-4xl font-black text-[#4A3222] leading-tight">{product.name}</h1>
            <p className="text-xl text-[#2DD4C8] font-bold mt-1">{product.tagline}</p>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-2">
            <div className="flex text-[#2DD4C8]" aria-label="5 stars">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
            </div>
            <span className="text-sm text-[#4A3222]/60 font-medium">
              {product.reviews.length} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-[#4A3222]">${displayPrice}</span>
            <span className="text-xl text-[#4A3222]/40 line-through">${regularPrice}</span>
          </div>

          {/* Description */}
          <p className="text-[#4A3222]/70 leading-relaxed">{product.description}</p>

          {/* Size */}
          <div>
            <p className="font-bold text-[#4A3222] text-sm mb-2 uppercase tracking-wide">Size</p>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-3 px-4 text-sm font-semibold rounded-xl border-2 transition-all cursor-pointer ${
                    selectedSize.value === size.value
                      ? "border-[#2DD4C8] bg-[#2DD4C8]/10 text-[#2DD4C8]"
                      : "border-[#F0EAE0] text-[#4A3222]/60 hover:border-[#4A3222]/30"
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            className={`w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? "bg-green-500 text-white"
                : "bg-[#2DD4C8] text-white hover:bg-[#22B5AB] shadow-lg shadow-[#2DD4C8]/30"
            }`}
          >
            {added ? (
              <><Check size={20} /> Added to Cart!</>
            ) : (
              <><ShoppingBag size={20} /> Add to Cart ${displayPrice}</>
            )}
          </motion.button>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🚚", label: "Free Shipping", sub: "On orders $40+" },
              { icon: "🧪", label: "3rd Party Tested", sub: "Every batch" },
              { icon: "✅", label: "100% Natural", sub: "No junk" },
            ].map((perk) => (
              <div key={perk.label} className="bg-[#F9F5F0] rounded-xl p-3 text-center">
                <div className="text-xl mb-1" aria-hidden="true">{perk.icon}</div>
                <p className="text-xs font-bold text-[#4A3222]">{perk.label}</p>
                <p className="text-[10px] text-[#4A3222]/50">{perk.sub}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Ingredients */}
      <section className="bg-[#F9F5F0] py-16 mt-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl font-black text-[#4A3222] mb-8">Ingredients</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {product.ingredients.map((ing) => (
              <li key={ing} className="flex items-center gap-2 bg-white rounded-xl px-4 py-3">
                <Check size={16} className="text-[#2DD4C8] flex-shrink-0" />
                <span className="text-sm font-medium text-[#4A3222]">{ing}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 max-w-7xl mx-auto px-5 md:px-8">
        <h2 className="text-3xl font-black text-[#4A3222] mb-8">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {product.reviews.map((review) => (
            <div key={review.id} className="bg-[#F9F5F0] rounded-2xl p-6 border border-[#F0EAE0]">
              <div className="flex text-[#2DD4C8] mb-3">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-[#4A3222] font-medium leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              <div className="flex justify-between items-center mt-4">
                <p className="font-bold text-sm text-[#4A3222]">{review.author}</p>
                <p className="text-xs text-[#4A3222]/40">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="py-16 bg-[#F9F5F0]">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <h2 className="text-3xl font-black text-[#4A3222] mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
