import { Tables } from "./supabase";
import { loginSchema, registerSchema } from "@/validations";
import { z } from "zod";

export type LoginType = z.infer<typeof loginSchema>;

export type LogupType = z.infer<typeof registerSchema>;

//Database
let brand: Tables<"brand">;
export type BrandType = typeof brand;

let cart_items: Tables<"cart_items">;
export type CartItemsType = typeof cart_items;

let carts: Tables<"carts">;
export type CartsType = typeof carts;

let categories: Tables<"categories">;
export type CategoriesType = typeof categories;

let colors: Tables<"colors">;
export type ColorsType = typeof colors;

let inventory: Tables<"inventory">;
export type InventoryType = typeof inventory;

let order_items: Tables<"order_items">;
export type Order_itemsType = typeof order_items;

let orders: Tables<"orders">;
export type OrdersType = typeof orders;

let products: Tables<"products">;
export type ProductsType = typeof products;

let profile: Tables<"profiles">;
export type ProfileType = typeof profile;

let providers: Tables<"providers">;
export type ProvidersType = typeof providers;

let sizes: Tables<"sizes">;
export type SizesType = typeof sizes;
