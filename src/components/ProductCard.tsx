"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Check } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/lib/cartStore";
import ProductImage from "./ProductImage";

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl border border-[#F0EAE0] overflow-hidden hover:shadow-xl hover:border-[#2DD4C8]/30 transition-all duration-300 group cursor-pointer flex flex-col"
    >
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block relative">
        <div className="relative h-56 overflow-hidden">
          <ProductImage product={product} size="md" />
          {/* Save badge */}
          <span className="absolute top-3 left-3 bg-[#4A3222] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Save {product.savePct}%
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        <div>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-bold text-[#4A3222] text-base leading-tight hover:text-[#2DD4C8] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-[#4A3222]/60 mt-1 line-clamp-2">{product.tagline}</p>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-[#4A3222]">${displayPrice}</span>
          <span className="text-sm text-[#4A3222]/40 line-through">${regularPrice}</span>
        </div>

        {/* Size selector */}
        <div className="flex gap-2">
          {product.sizes.map((size) => (
            <button
              key={size.value}
              onClick={() => setSelectedSize(size)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                selectedSize.value === size.value
                  ? "border-[#2DD4C8] bg-[#2DD4C8]/10 text-[#2DD4C8]"
                  : "border-[#F0EAE0] text-[#4A3222]/60 hover:border-[#4A3222]/30"
              }`}
            >
              {size.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleAddToCart}
          className={`mt-auto w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
            added
              ? "bg-green-500 text-white"
              : "bg-[#2DD4C8] text-white hover:bg-[#22B5AB]"
          }`}
        >
          {added ? (
            <>
              <Check size={16} />
              Added!
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              Add to Cart
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
