import { PromoCode } from "@/types";

export const PROMO_CODES: PromoCode[] = [
  { code: "WELL10", percentPct: 10, label: "10% off your order" },
  { code: "HYDRATE20", percentPct: 20, label: "20% off your order" },
  { code: "WELCOME15", percentPct: 15, label: "15% welcome discount" },
  { code: "STAYWEL", percentPct: 5, label: "5% off your order" },
];

export function validatePromoCode(code: string): PromoCode | null {
  return (
    PROMO_CODES.find((p) => p.code.toUpperCase() === code.toUpperCase().trim()) ??
    null
  );
}
