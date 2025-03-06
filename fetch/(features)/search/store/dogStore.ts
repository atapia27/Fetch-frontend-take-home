import { create } from "zustand";
import axios from "axios";
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface DogState {
  breeds: string[];
  fetchBreeds: () => Promise<void>;
}

export const useDogStore = create<DogState>((set) => ({
  breeds: [],
  fetchBreeds: async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/dogs/breeds`, {
        withCredentials: true,
      });
      set({ breeds: data });
    } catch (error) {
      console.error("Failed to fetch dog breeds:", error);
    }
  },
}));
