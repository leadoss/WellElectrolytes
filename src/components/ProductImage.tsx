"use client";

import { Product } from "@/types";

interface Props {
  product: Product;
  size?: "sm" | "md" | "lg";
}

export default function ProductImage({ product, size = "md" }: Props) {
  const heights = { sm: "h-full", md: "h-64", lg: "h-80" };

  return (
    <div
      className={`w-full ${heights[size]} relative flex items-center justify-center bg-gradient-to-br ${product.gradient} rounded-xl overflow-hidden`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl" />
      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/15 rounded-full blur-lg" />

      {/* Product mockup */}
      <div className="relative flex flex-col items-center gap-2">
        {/* Packet shape */}
        <div className="w-20 h-28 bg-white/90 rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-1 border border-white/40">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: product.color }}
          >
            <span className="text-white font-black text-lg">W</span>
          </div>
          <p className="text-[8px] font-bold text-center leading-tight px-1" style={{ color: product.color }}>
            {product.flavor.toUpperCase()}
          </p>
          <p className="text-[6px] text-gray-500 font-medium">ELECTROLYTES</p>
        </div>
        <p className="text-white font-bold text-xs drop-shadow">{product.flavor}</p>
      </div>
    </div>
  );
}
