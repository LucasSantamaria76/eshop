import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './createSelectors';

export const MODAL_CART = 1;
export const MODAL_LOGIN = 2
export const MODAL_AVATARS_BOX = 3;

type State = {
  [MODAL_CART]: boolean;
  [MODAL_LOGIN]: boolean;
  [MODAL_AVATARS_BOX]: boolean;
};

type Actions = {
  onClose: (modal: number) => void;
  onShow: (modal: number) => void;
};

const initialState = {
  [MODAL_CART]: false,
  [MODAL_LOGIN]: false,
  [MODAL_AVATARS_BOX]: false,
};

type TState = State & Actions;

const useModalStoreBase = create<TState>()(
  devtools((set, get) => ({
    ...initialState,
    onClose: (modal: number) => set({ ...get(), [modal]: false }),
    onShow: (modal: number) => set({ ...get(), [modal]: true }),
  })),
);
export const useModalStore = createSelectors(useModalStoreBase);
