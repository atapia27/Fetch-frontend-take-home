import { useDogStore } from "@/(features)/search/store/dogStore";
import { fetchDogs } from "@/utils/api";
import { useState, useEffect, useCallback } from "react";
import Dog from "@/utils/types";
import { useDogFilters } from "@/hooks/useDogFilters";

export default function useSearchFilters() {
  const { breeds, fetchBreeds } = useDogStore();
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const filters = useDogFilters(dogs); // Use shared filter logic

  // Fetch breeds if not already loaded
  useEffect(() => {
    if (breeds.length === 0) fetchBreeds();
  }, [breeds, fetchBreeds]);

  // Load dogs function
  const loadDogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDogs(
        filters.selectedBreeds,
        filters.zipCodes,
        filters.ageMin,
        filters.ageMax,
        filters.sortField,
        filters.sortOrder,
        filters.page,
        filters.size
      );
      setDogs(data.dogs);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error loading dogs:", error);
    } finally {
      setLoading(false);
    }
  }, [
    filters.selectedBreeds,
    filters.zipCodes,
    filters.ageMin,
    filters.ageMax,
    filters.sortField,
    filters.sortOrder,
    filters.page,
    filters.size,
  ]);

  // Fetch dogs when any filter changes
  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  return {
    breeds,
    totalResults,
    loading,
    ...filters, // Spread reusable filter logic
  };
}
