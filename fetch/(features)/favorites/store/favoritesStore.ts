import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchDogDetails } from "@/utils/api"; // This should call POST /dogs
import  Dog from "@/utils/types";

interface FavoritesState {
  favorites: Dog[]; // Store actual dog objects
  notifications: { id: string; message: string }[];
  toggleFavorite: (dog: Dog) => void;
  isFavorite: (id: string) => boolean;
  clearNotification: (id: string) => void;
  refreshFavorites: () => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      notifications: [],

      toggleFavorite: (dog: Dog) => {
        const { favorites } = get();
        const isFavorited = favorites.some((fav) => fav.id === dog.id);

        const newFavorites = isFavorited
          ? favorites.filter((fav) => fav.id !== dog.id) // Remove dog
          : [...favorites, dog]; // Add dog

        const newNotification = {
          id: Date.now().toString(),
          message: isFavorited
            ? `${dog.name} has been removed from Favorites.`
            : `${dog.name} has been added to Favorites!`,
        };

        set({
          favorites: newFavorites,
          notifications: [...get().notifications, newNotification],
        });
      },

      isFavorite: (id) => get().favorites.some((dog) => dog.id === id),

      clearNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        })),

      refreshFavorites: async () => {
        const { favorites } = get();
        const favoriteIds = favorites.map((dog) => dog.id);

        if (favoriteIds.length === 0) {
          set({ favorites: [] });
          return;
        }

        try {
          const updatedFavorites = await fetchDogDetails(favoriteIds);
          set({ favorites: updatedFavorites });
        } catch (error) {
          console.error("Error refreshing favorite dogs:", error);
        }
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
