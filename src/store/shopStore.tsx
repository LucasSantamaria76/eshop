"use client";

import { create } from "zustand";

import { createSelectors } from "./createSelectors";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { ProfileType } from "@/types";

interface State {
  user: ProfileType | null;
}

interface Actions {
  setUser: (user: ProfileType | null) => void;
}

const INITIAL_STATE: State = {
  user: null,
};

const useShopStoreBase = create<State & Actions>()(
  devtools(
    immer((set) => ({
      ...INITIAL_STATE,

      setUser: (user: ProfileType | null) => set({ user }),
    })),
  ),
);

export const useShopStore = createSelectors(useShopStoreBase);
