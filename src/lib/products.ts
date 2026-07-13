import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  {
    id: "mixed-berries",
    slug: "mixed-berries",
    name: "Mixed Berries Electrolytes",
    tagline: "Berry-Powered Hydration. No Sugar. No Crap.",
    description:
      "Packed with essential minerals and electrolytes, our Mixed Berries formula delivers a burst of natural berry flavor without any sugar, artificial sweeteners, or junk. Just pure, clean hydration your body craves.",
    price: 30,
    salePrice: 27,
    savePct: 10,
    flavor: "Mixed Berries",
    color: "#C84B8F",
    gradient: "from-pink-400 via-purple-400 to-rose-500",
    sizes: [
      { label: "1 Month Supply", value: "1month", multiplier: 1 },
      { label: "2 Month Supply", value: "2month", multiplier: 1.85 },
    ],
    ingredients: [
      "Sodium (as Himalayan Pink Salt)",
      "Potassium (as Potassium Citrate)",
      "Magnesium (as Magnesium Glycinate)",
      "Calcium (as Calcium Lactate)",
      "Natural Berry Flavor",
      "Stevia Leaf Extract",
      "Vitamin C",
      "Vitamin B6",
      "Vitamin B12",
    ],
    hashtags: ["#StayWell", "#MixedBerryRush", "#hydratestrong"],
    reviews: [
      {
        id: "r1",
        author: "Lara",
        rating: 5,
        text: "Best electrolytes I've ever tried. The berry flavor is so refreshing and it actually keeps me hydrated during my long runs.",
        date: "2026-06-15",
      },
      {
        id: "r2",
        author: "Karim",
        rating: 5,
        text: "No sugar crash, no junk. Just clean energy. I mix this every morning now.",
        date: "2026-06-20",
      },
    ],
  },
  {
    id: "orange",
    slug: "orange",
    name: "Orange Electrolytes",
    tagline: "Citrus Energy Without the Sugar Crash.",
    description:
      "Bold orange flavor, zero calories, zero sugar. Our Orange Electrolytes give you that citrus kick with all the minerals you need to perform at your best, without the sugar crash that follows.",
    price: 30,
    salePrice: 27,
    savePct: 10,
    flavor: "Orange",
    color: "#F97316",
    gradient: "from-orange-400 via-amber-400 to-yellow-400",
    sizes: [
      { label: "1 Month Supply", value: "1month", multiplier: 1 },
      { label: "2 Month Supply", value: "2month", multiplier: 1.85 },
    ],
    ingredients: [
      "Sodium (as Himalayan Pink Salt)",
      "Potassium (as Potassium Citrate)",
      "Magnesium (as Magnesium Glycinate)",
      "Calcium (as Calcium Lactate)",
      "Natural Orange Flavor",
      "Stevia Leaf Extract",
      "Vitamin C",
      "Vitamin D3",
      "Zinc",
    ],
    hashtags: ["#StayWell", "#CitrusCharge", "#HydrateSmart"],
    reviews: [
      {
        id: "r3",
        author: "Nour",
        rating: 5,
        text: "I'm obsessed. I drink this instead of sports drinks now and I feel so much better. No sugar crash at all.",
        date: "2026-06-10",
      },
      {
        id: "r4",
        author: "Tarek",
        rating: 4,
        text: "Great taste, mixes easily. Perfect for my post-workout recovery.",
        date: "2026-06-28",
      },
    ],
  },
  {
    id: "lemon",
    slug: "lemon",
    name: "Lemon Electrolytes",
    tagline: "Pure Hydration. No Junk. Just Lemon.",
    description:
      "0 Calories. 0 Sugar. 0 BS. Our Lemon Electrolytes are as clean as it gets: crisp lemon flavor with a powerful mineral blend to keep you at peak hydration all day long.",
    price: 30,
    salePrice: 27,
    savePct: 10,
    flavor: "Lemon",
    color: "#EAB308",
    gradient: "from-yellow-300 via-lime-300 to-green-300",
    sizes: [
      { label: "1 Month Supply", value: "1month", multiplier: 1 },
      { label: "2 Month Supply", value: "2month", multiplier: 1.85 },
    ],
    ingredients: [
      "Sodium (as Himalayan Pink Salt)",
      "Potassium (as Potassium Citrate)",
      "Magnesium (as Magnesium Malate)",
      "Calcium (as Calcium Lactate)",
      "Natural Lemon Flavor",
      "Stevia Leaf Extract",
      "Vitamin C",
      "B-Complex (B1, B2, B6, B12)",
      "Electrolyte Blend",
    ],
    hashtags: ["#StayWell", "#HydrateBetter", "#lemonpower"],
    reviews: [
      {
        id: "r5",
        author: "Elie",
        rating: 5,
        text: "This is my go-to. Clean, refreshing, and actually works. I've tried so many electrolyte brands and this is the only one without a weird aftertaste.",
        date: "2026-07-01",
      },
      {
        id: "r6",
        author: "Zeina",
        rating: 5,
        text: "Love that it's 0 calories. I drink it all day and it tastes amazing.",
        date: "2026-07-05",
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
