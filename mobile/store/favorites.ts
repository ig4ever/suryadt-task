import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FavoritesState = {
  favorites: Record<string, boolean>;
  toggle: (id: string) => void;
};

export const useFavorites = create(
  persist<FavoritesState>(
    (set, get) => ({
      favorites: {},
      toggle: (id: string) => {
        const next = { ...get().favorites, [id]: !get().favorites[id] };
        set({ favorites: next });
      },
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
