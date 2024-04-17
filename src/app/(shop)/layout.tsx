"use client";

import { CategoriesBar, NavBar } from "@/components";
import { useShopStore } from "@/store/shopStore";
import { getSessionUser } from "@/supabase";
import type { ProfileType } from "@/types";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: Readonly<LayoutProps>) {
  const setUser = useShopStore.use.setUser();

  useEffect(() => {
    getSessionUser().then((user: ProfileType | null) => setUser(user));
  }, [setUser]);

  return (
    <div className={`min-h-screen dark:bg-gray-800`}>
      <NavBar />
      <CategoriesBar />
      {children}
    </div>
  );
}
