import { create } from "zustand";
import { persist } from "zustand/middleware";
import Dog from "@/utils/types";

interface FavoritesState {
  favorites: Dog[];
  favoriteDogIDs: string[]; // Stores an array of favorite dog IDs
  notifications: { id: string; message: string; type: 'add' | 'remove' }[];

  addFavorite: (dog: Dog) => void;
  removeFavorite: (dog: Dog) => void;
  toggleFavorite: (dog: Dog) => void;
  isFavorite: (id: string) => boolean;
  addNotification: (message: string, type: 'add' | 'remove') => void;
  clearNotification: (id: string) => void;
}

// Create the store without exporting it directly
const favoritesStore = create<FavoritesState>()(
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
        get().addNotification(`${dog.name} has been added to Favorites!`, 'add');
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
        get().addNotification(`${dog.name} has been removed from Favorites.`, 'remove');
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

      addNotification: (message: string, type: 'add' | 'remove') => {
        set((state) => ({
          notifications: [
            ...state.notifications,
            { id: Date.now().toString(), message, type },
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

// Atomic, stable selectors
const selectFavorites = (state: FavoritesState) => state.favorites;
const selectFavoriteDogIDs = (state: FavoritesState) => state.favoriteDogIDs;
const selectNotifications = (state: FavoritesState) => state.notifications;
const selectAddFavorite = (state: FavoritesState) => state.addFavorite;
const selectRemoveFavorite = (state: FavoritesState) => state.removeFavorite;
const selectToggleFavorite = (state: FavoritesState) => state.toggleFavorite;
const selectIsFavorite = (state: FavoritesState) => state.isFavorite;
const selectAddNotification = (state: FavoritesState) => state.addNotification;
const selectClearNotification = (state: FavoritesState) => state.clearNotification;

// Custom hooks that only export what's needed
export const useFavorites = () => favoritesStore(selectFavorites);
export const useFavoriteDogIDs = () => favoritesStore(selectFavoriteDogIDs);
export const useNotifications = () => favoritesStore(selectNotifications);
export const useAddFavorite = () => favoritesStore(selectAddFavorite);
export const useRemoveFavorite = () => favoritesStore(selectRemoveFavorite);
export const useToggleFavorite = () => favoritesStore(selectToggleFavorite);
export const useIsFavorite = () => favoritesStore(selectIsFavorite);
export const useAddNotification = () => favoritesStore(selectAddNotification);
export const useClearNotification = () => favoritesStore(selectClearNotification);

// Custom hook for checking if a specific dog is favorited
export const useIsDogFavorite = (dogId: string) => {
  const favorites = useFavorites();
  return favorites.some((dog) => dog.id === dogId);
};

// Hook for getting all favorites state and actions
export const useFavoritesStore = () => {
  const favorites = useFavorites();
  const favoriteDogIDs = useFavoriteDogIDs();
  const notifications = useNotifications();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const toggleFavorite = useToggleFavorite();
  const isFavorite = useIsFavorite();
  const addNotification = useAddNotification();
  const clearNotification = useClearNotification();

  return {
    favorites,
    favoriteDogIDs,
    notifications,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    addNotification,
    clearNotification,
  };
};

// Export store for direct access (for non-hook contexts like API calls)
export const getFavoritesStore = () => favoritesStore.getState();
