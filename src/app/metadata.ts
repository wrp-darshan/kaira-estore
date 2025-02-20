import type { Metadata } from "next";

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
