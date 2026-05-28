import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { CartDrawer } from "@/components/cart-drawer";
import { Header } from "@/components/header";
import { MobileNav } from "@/components/mobile-nav";
import { PwaRegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "FreshMart | Grocery Delivery",
  description: "Fresh groceries, local produce, and household essentials delivered fast.",
  manifest: "/manifest.json"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <MobileNav />
        <CartDrawer />
        <PwaRegister />
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
