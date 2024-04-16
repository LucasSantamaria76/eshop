"use client";

import { AvatarDialogBox, CategoriesBar, NavBar } from "@/components";
import { useShopStore } from "@/store/shopStore";
import { getSessionUser } from "@/supabase";
import { ProfileType } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export default function ShopLayout({ children }: Readonly<LayoutProps>) {
  const setUser = useShopStore.use.setUser();
  const { refresh } = useRouter();

  useEffect(() => {
    getSessionUser().then((user: ProfileType | null) => setUser(user));
  }, [setUser]);

  return (
    <div className={`min-h-screen dark:bg-gray-800`}>
      <NavBar />
      <CategoriesBar />
      {children}
      <AvatarDialogBox />
    </div>
  );
}
