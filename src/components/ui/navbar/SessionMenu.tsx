"use client";

import { Icon } from "@/components/icon/Icon";
import { MODAL_LOGIN, useModalStore } from "@/store/modalStore";
import { useShopStore } from "@/store/shopStore";
import { supabase } from "@/supabase";
import {
  Dropdown,
  Avatar,
  DropdownHeader,
  DarkThemeToggle,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import Image from "next/image";

export const SessionMenu = () => {
  const onShow = useModalStore.use.onShow();
  const user = useShopStore.use.user();
  const setUser = useShopStore.use.setUser();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="size-10">
      {user ? (
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Image
              src={user.avatar_url || ""}
              width={40}
              height={40}
              alt="avatar user"
              className="size-full rounded-full border border-gray-500 hover:ring-1 hover:ring-cyan-500"
            />
          }
        >
          <DropdownHeader className="px-0">
            <div className="px-4">
              <span className="block text-sm font-semibold">
                {user.full_name}
              </span>
              <span className="block truncate text-xs text-gray-400">
                {user.email}
              </span>
            </div>
          </DropdownHeader>
          <DropdownItem>Editar perfil</DropdownItem>
          <DropdownItem>Lista de deseos</DropdownItem>
          <DropdownDivider />
          <Dropdown.Item onClick={handleSignOut}>Cerrar sesión</Dropdown.Item>
        </Dropdown>
      ) : (
        <Icon
          name={"CircleUserRound"}
          onClick={() => onShow(MODAL_LOGIN)}
          className="size-full cursor-pointer rounded-full hover:ring-1 hover:ring-cyan-500 dark:text-white"
        />
      )}
    </div>
  );
};
