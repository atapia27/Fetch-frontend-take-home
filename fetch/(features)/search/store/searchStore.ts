import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface SearchState {
  breeds: string[];
  fetchBreeds: () => Promise<void>;
}

// Create the store without exporting it directly
const searchStore = create<SearchState>()(
  persist(
    (set) => ({
      breeds: [],

      fetchBreeds: async () => {
        try {
          const { data } = await axios.get<string[]>(
            `${API_BASE_URL}/dogs/breeds`,
            {
              withCredentials: true,
            },
          );

          set({ breeds: Array.isArray(data) ? data : [] });
        } catch (error) {
          console.error("Failed to fetch dog breeds:", error);
        }
      },
    }),
    { name: "search-storage" },
  ),
);

// Atomic, stable selectors
const selectBreeds = (state: SearchState) => state.breeds;
const selectFetchBreeds = (state: SearchState) => state.fetchBreeds;

// Custom hooks that only export what's needed
export const useBreeds = () => searchStore(selectBreeds);
export const useFetchBreeds = () => searchStore(selectFetchBreeds);

// Hook for getting all search state and actions
export const useSearchStore = () => {
  const breeds = useBreeds();
  const fetchBreeds = useFetchBreeds();

  return {
    breeds,
    fetchBreeds,
  };
};
