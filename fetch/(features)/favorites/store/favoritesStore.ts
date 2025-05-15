import { create } from "zustand";
import { persist } from "zustand/middleware";
import Dog from "@/utils/types";

interface FavoritesState {
  favorites: Dog[];
  favoriteDogIDs: string[]; // Stores an array of favorite dog IDs
  notifications: { id: string; message: string }[];

  addFavorite: (dog: Dog) => void;
  removeFavorite: (dog: Dog) => void;
  toggleFavorite: (dog: Dog) => void;
  isFavorite: (id: string) => boolean;
  addNotification: (message: string) => void;
  clearNotification: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      favoriteDogIDs: [],
      notifications: [],

      addFavorite: (dog: Dog) => {
        set((state) => {
          const updatedFavorites = [...state.favorites, dog];
          return {
            favorites: updatedFavorites,
            favoriteDogIDs: updatedFavorites.map((fav) => fav.id), // Update IDs
          };
        });
        get().addNotification(`${dog.name} has been added to Favorites!`);
      },

      removeFavorite: (dog: Dog) => {
        set((state) => {
          const updatedFavorites = state.favorites.filter(
            (fav) => fav.id !== dog.id,
          );
          return {
            favorites: updatedFavorites,
            favoriteDogIDs: updatedFavorites.map((fav) => fav.id), // Update IDs
          };
        });
        get().addNotification(`${dog.name} has been removed from Favorites.`);
      },

      toggleFavorite: (dog: Dog) => {
        const { isFavorite, addFavorite, removeFavorite } = get();
        if (isFavorite(dog.id)) {
          removeFavorite(dog);
        } else {
          addFavorite(dog);
        }  
      },

      isFavorite: (id) => get().favorites.some((dog) => dog.id === id),

      addNotification: (message: string) => {
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id: Date.now().toString(), message },
          ],
        }));
      },

      clearNotification: (id: string) => {
        set((state) => ({
          notifications: state.notifications.filter((notif) => notif.id !== id),
        }));
      },
    }),
    { name: "favorites-storage" },
  ),
);
