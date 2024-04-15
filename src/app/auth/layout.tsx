import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Shop Inicio de sesión",
  description: "Tienda virtual",
};

type LayoutProps = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return <div>{children}</div>;
}
