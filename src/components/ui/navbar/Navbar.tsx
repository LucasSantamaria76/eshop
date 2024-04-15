"use client";

import { Icon, SessionDialog } from "@/components";
import { redressed } from "@/fonts";
import { MODAL_LOGIN, useModalStore } from "@/store/modalStore";
import { useShopStore } from "@/store/shopStore";
import { supabase } from "@/supabase/client";
import { ProfileType } from "@/types/profile";
import {
  Avatar,
  DarkThemeToggle,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarToggle,
} from "flowbite-react";
import { useEffect, useState } from "react";

const getUser = async () => {
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw error;

    if (user) {
      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      console.log({ profiles });
    }

    return undefined;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const NavBar = () => {
  const onShow = useModalStore.use.onShow();
  const user = useShopStore.use.user();
  const setUser = useShopStore.use.setUser();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("name, address, phone, city, avatar_url, created_at")
          .eq("id", session.user.id)
          .single();
        const user = { ...data, email: session.user.email } as ProfileType;
        setUser(user);
      } else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  return (
    <>
      <Navbar fluid rounded className="shadow shadow-black dark:shadow-white">
        <NavbarBrand
          href="/"
          className={`${redressed.className} text-2xl font-bold dark:text-white`}
        >
          E-Shop
        </NavbarBrand>
        <div className="flex md:order-2">
          <div className="size-10">
            {user ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    img={user.avatar_url || ""}
                    alt="avatar user"
                    rounded
                    className="size-full rounded-full border border-gray-500 hover:ring-1 hover:ring-cyan-500"
                  />
                }
              >
                <DropdownHeader className="px-0">
                  <div className="px-4">
                    <span className="block text-sm font-semibold">
                      {user.name}
                    </span>
                    <span className="block truncate text-xs text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <DropdownDivider />
                  <label className="mt-3 flex w-full items-center space-x-2 px-4 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white">
                    <DarkThemeToggle className="hover:bg-transparent focus:outline-none focus:ring-transparent dark:hover:bg-transparent dark:focus:ring-transparent" />
                    <span className="cursor-pointer">Intercambiar modo</span>
                  </label>
                </DropdownHeader>
                <DropdownItem>Editar perfil</DropdownItem>
                <DropdownItem>Lista de deseos</DropdownItem>
                <DropdownDivider />
                <Dropdown.Item
                  onClick={() => {
                    fetch("/auth/signout", { method: "POST" });
                    setUser(null);
                  }}
                >
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Icon
                //size={40}
                name={"CircleUserRound"}
                onClick={() => onShow(MODAL_LOGIN)}
                className="size-full cursor-pointer rounded-full hover:ring-1 hover:ring-cyan-500 dark:text-white"
              />
            )}
          </div>
          <NavbarToggle />
        </div>
        <NavbarCollapse></NavbarCollapse>
      </Navbar>
      <SessionDialog />
    </>
  );
};
