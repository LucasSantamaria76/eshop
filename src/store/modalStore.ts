import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createSelectors } from './createSelectors';

export const MODAL_CART = 1;
export const MODAL_LOGIN = 2

type State = {
	[MODAL_CART]: boolean
	[MODAL_LOGIN]: boolean
}

type Actions = {
	onClose: (modal: number) => void
	onShow: (modal: number) => void
}

const initialState = {
	[MODAL_CART]: false,
	[MODAL_LOGIN]: false,
}

type TState = State & Actions;

const useModalStoreBase = create<TState>()(
	devtools((set, get) => ({
		...initialState,
		onClose: (modal: number) => set(() => ({ [modal]: false })),
		onShow: (modal: number) => set(() => ({ [modal]: true })),
	}))
);
export const useModalStore = createSelectors(useModalStoreBase);
