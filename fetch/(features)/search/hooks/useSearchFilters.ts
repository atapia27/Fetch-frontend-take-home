import { useBreeds, useFetchBreeds } from "@/(features)/search/store/searchStore";
import { fetchDogs } from "@/utils/api";
import { useState, useEffect, useCallback } from "react";
import Dog from "@/utils/types";
import { useResetDogFilters } from "@/hooks/resetDogFilters";

export default function useSearchFilters() {
  const breeds = useBreeds();
  const fetchBreeds = useFetchBreeds();
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const filters = useResetDogFilters();
  // retreives all basic information for the  page, including

  useEffect(() => {
    if (breeds.length === 0) fetchBreeds();
  }, [breeds, fetchBreeds]);

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
        filters.size,
      );

      setFilteredDogs(data.dogs);
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

  useEffect(() => {
    filters.setPage(1)
  }, [  filters.selectedBreeds,
        filters.zipCodes,
        filters.ageMin,
        filters.ageMax,
        filters.sortField,
        filters.sortOrder,
        filters.size])


  useEffect(() => {
    loadDogs()
  }, [loadDogs]);

  return {
    dogs: filteredDogs,
    breeds,
    totalResults,
    loading,
    
    ...filters,
  };
}