import { create } from "zustand";
import { devtools } from "zustand/middleware";

type CategoryState = {
  activeCategoryId: number;
  actions: {
    setActiveCategoryId: (activeCategoryId: number) => void;
  };
};

const useCategoryStore = create<CategoryState>()(
  devtools(
    (set) => ({
      activeCategoryId: 1,
      actions: {
        setActiveCategoryId: (activeCategoryId: number) => set({ activeCategoryId }),
      },
    }),
    { name: "CategoryStore" }
  )
);

export const useActiveCategoryId = () => useCategoryStore((state) => state.activeCategoryId);

export const useCategoryActions = () => useCategoryStore((state) => state.actions);
