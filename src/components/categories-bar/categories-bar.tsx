"use client";

import { Icon } from "@/components";
import {
  Navbar,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";

export const CategoriesBar = () => {
  return (
    <>
      <Navbar className="shadow shadow-black dark:shadow-white">
        <div className="flex items-center md:hidden">
          <label
            htmlFor="toggle-menu"
            className="ml-3 flex cursor-pointer hover:text-cyan-700 dark:text-white"
          >
            Categorías
            <Icon name="ChevronRight" />
          </label>
          <NavbarToggle id="toggle-menu" className="hidden" />
        </div>
        <NavbarCollapse>
          <NavbarLink className="cursor-pointer text-sm md:text-lg">
            Hombres
          </NavbarLink>
          <NavbarLink className="cursor-pointer text-sm md:text-lg">
            Mujeres
          </NavbarLink>
          <NavbarLink className="cursor-pointer text-sm md:text-lg">
            Niños
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </>
  );
};
