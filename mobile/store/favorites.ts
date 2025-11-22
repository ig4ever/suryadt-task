import create from "zustand";
import * as SecureStore from "expo-secure-store";

type FavoritesState = {
  favorites: Record<string, boolean>;
  toggle: (id: string) => void;
  hydrate: () => Promise<void>;
};

export const useFavorites = create<FavoritesState>((set, get) => ({
  favorites: {},
  toggle: (id: string) => {
    const current = get().favorites;
    const next = { ...current, [id]: !current[id] };
    set({ favorites: next });
    SecureStore.setItemAsync("favorites", JSON.stringify(next)).catch(() => {});
  },
  hydrate: async () => {
    try {
      const raw = await SecureStore.getItemAsync("favorites");
      if (raw) set({ favorites: JSON.parse(raw) });
    } catch {}
  },
}));