import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Well Electrolytes — Pure Hydration. Zero Sugar. Zero Junk.",
  description:
    "Premium electrolytes with essential minerals, vitamins, and natural fruit flavor. 0 calories, 0 sugar, 0 artificial anything. Hydrate better with Well.",
  keywords: ["electrolytes", "hydration", "zero sugar", "sugar free", "sports drink", "minerals"],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Well Electrolytes — Pure Hydration",
    description: "Premium electrolytes with zero sugar, zero calories. Stay hydrated the right way.",
    type: "website",
    siteName: "Well Electrolytes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Well Electrolytes",
    description: "Premium electrolytes. 0 sugar. 0 calories. 0 BS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col antialiased">
        <div className="fixed top-0 left-0 right-0 z-50">
          <AnnouncementBar />
          <Navbar />
        </div>
        <CartDrawer />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
