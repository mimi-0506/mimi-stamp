import { MODAL_KEYS } from "@/constants/modalkeys";
import { ModalKeyType, ModalStoreType } from "@/types/zustand";
import { create } from "zustand";

const createInitialModalState = () => {
  return Object.values(MODAL_KEYS).reduce(
    (acc, key) => ({
      ...acc,
      [key]: false,
    }),
    {} as { [key in ModalKeyType]: boolean }
  );
};

export const useModalStore = create<ModalStoreType>((set) => ({
  modals: createInitialModalState(),

  openModal: (key: ModalKeyType) =>
    set((state) => ({
      ...state,
      modals: {
        ...state.modals,
        [key]: true,
      },
    })),

  closeModal: (key: ModalKeyType) =>
    set((state) => ({
      ...state,
      modals: {
        ...state.modals,
        [key]: false,
      },
    })),
}));
