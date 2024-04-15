import { NavBar } from "@/components";

type LayoutProps = {
  children: React.ReactNode;
};

export default async function ShopLayout({ children }: Readonly<LayoutProps>) {
  return (
    <main className={`min-h-screen dark:bg-gray-800`}>
      <NavBar />
      {children}
    </main>
  );
}
