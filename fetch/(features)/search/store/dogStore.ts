import { create } from "zustand";
import axios from "axios";
import { fetchDogs } from "@/utils/api";
import Dog from "@/utils/types";
const API_BASE_URL = "https://frontend-take-home-service.fetch.com";

interface DogState {
  breeds: string[];
  dogs: Dog[]; // Ensure `dogs` is always an array
  totalResults: number;
  loading: boolean;
  fetchBreeds: () => Promise<void>;
  loadDogs: (
    selectedBreeds: string[],
    zipCodes: string[],
    ageMin: number,
    ageMax: number,
    sortField: string,
    sortOrder: "asc" | "desc",
    page: number,
    size: number
  ) => Promise<void>;
}

export const useDogStore = create<DogState>((set) => ({
  breeds: [],
  dogs: [], //Initialize as an empty array to prevent `undefined`
  totalResults: 0,
  loading: false,

  // Fetch dog breeds
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

  // Fetch dogs based on filters
  loadDogs: async (selectedBreeds, zipCodes, ageMin, ageMax, sortField, sortOrder, page, size) => {
    set({ loading: true });

    try {
      const data = await fetchDogs(selectedBreeds, zipCodes, ageMin, ageMax, sortField, sortOrder, page, size);
      set({ dogs: Array.isArray(data.dogs) ? data.dogs : [], totalResults: data.totalResults }); // Ensure `dogs` is always an array
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
      set({ dogs: [] }); // Fallback to empty array on failure
    } finally {
      set({ loading: false });
    }
  },
}));