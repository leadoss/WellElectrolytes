export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  salePrice: number;
  savePct: number;
  flavor: string;
  color: string;
  gradient: string;
  sizes: ProductSize[];
  ingredients: string[];
  hashtags: string[];
  reviews: Review[];
}

export interface ProductSize {
  label: string;
  value: string;
  multiplier: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface CartItem {
  product: Product;
  size: ProductSize;
  quantity: number;
}

export interface PromoCode {
  code: string;
  percentPct: number;
  label: string;
}

export interface CartState {
  items: CartItem[];
  appliedPromo: PromoCode | null;
  isOpen: boolean;
  addItem: (product: Product, size: ProductSize) => void;
  removeItem: (productId: string, sizeValue: string) => void;
  updateQuantity: (productId: string, sizeValue: string, quantity: number) => void;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getDiscount: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}
