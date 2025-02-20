import type { Metadata } from "next";
import { Marcellus, Jost } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import AOSProvider from "./components/Common/AOSProvider";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Kaira - Your Ultimate Online Store",
  description:
    "A modern eCommerce template built with Next.js. Discover the best deals on fashion, electronics, and more.",
  keywords: ["eCommerce", "Next.js", "online shopping", "React", "TypeScript"],
  authors: [{ name: "Darshan Bamroliya" }],
  icons: {
    icon: "/img/shopping-cart.png",
  },
  openGraph: {
    title: "Kaira - Your Ultimate Online Store",
    description:
      "A modern eCommerce template built with Next.js. Discover the best deals on fashion, electronics, and more.",
    type: "website",
    images: [{ url: "/img/shopping-cart.png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${marcellus.className} ${jost.className} antialiased bg-light dark:bg-dark`}>
        <CartProvider>
          <AOSProvider />
          <Header />

          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
