import type { Metadata, Viewport } from "next";
import { Barlow, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import OrderBar from "@/components/OrderBar";
import Toast from "@/components/Toast";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas", display: "swap" });
const barlow = Barlow({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://off-side.vercel.app"),
  title: "Offside Saint-Brice | Burgers, grillades et cuisine tunisienne halal",
  description:
    "Smash burgers, grillades, tex-mex et cuisine tunisienne faite maison à Saint-Brice-sous-Forêt. 100 % halal. Commande en ligne et retrait express.",
  openGraph: { images: ["/smash.jpg"], locale: "fr_FR", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0F0F10" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${bebas.variable} ${barlow.variable}`}>
      <body className="min-h-screen">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <OrderBar />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
