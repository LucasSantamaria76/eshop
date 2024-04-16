"use client";

import { Icon, SearchDialog, SessionDialog } from "@/components";
import { redressed } from "@/fonts";
import { SessionMenu } from "./SessionMenu";
import { DarkThemeToggle, Navbar, NavbarBrand } from "flowbite-react";

export const NavBar = () => {
  return (
    <>
      <Navbar className="shadow shadow-black dark:shadow-white">
        <NavbarBrand
          href="/"
          className={`${redressed.className} text-2xl font-bold dark:text-white`}
        >
          E-Shop
        </NavbarBrand>

        <SearchDialog />
        <div className="flex gap-x-10">
          <SessionMenu />
          <DarkThemeToggle className="shadow shadow-gray-500 dark:shadow-cyan-500 dark:hover:bg-gray-800 dark:focus:ring-gray-500" />
        </div>
      </Navbar>
      <SessionDialog />
    </>
  );
};
