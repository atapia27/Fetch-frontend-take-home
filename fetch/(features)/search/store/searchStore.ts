import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface SearchState {
  breeds: string[];
  fetchBreeds: () => Promise<void>;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      breeds: [],
      selectedBreeds: [],

 
      fetchBreeds: async () => {
        try {
          const { data } = await axios.get<string[]>(`${API_BASE_URL}/dogs/breeds`, {
            withCredentials: true,
          });
      
          set({ breeds: Array.isArray(data) ? data : [] });
        } catch (error) {
          console.error("Failed to fetch dog breeds:", error);
        }
      },
    }),
    { name: "search-storage" }
  )
);
