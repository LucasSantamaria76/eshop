import type { Metadata } from "next";
import { ThemeModeScript } from "flowbite-react";
import { poppins } from "@/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "E-Shop",
  description: "Tienda virtual",
};

type LayoutProps = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html lang="es">
      <head>
        <ThemeModeScript />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
}
