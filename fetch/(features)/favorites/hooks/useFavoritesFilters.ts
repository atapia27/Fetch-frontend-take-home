import { useFavoritesStore } from "@/(features)/favorites/store/favoritesStore";
import { useEffect, useState } from "react";
import  Dog  from "@/utils/types";
import { useDogFilters } from "@/hooks/useDogFilters";


export function useFavoritesFilters() {
  const { favorites, refreshFavorites } = useFavoritesStore();
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // Refresh favorites when component mounts
  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  // Extract unique breeds from favorite dogs
  const breeds = [...new Set(favorites.map((dog) => dog.breed))];

  // Use shared filtering logic
  const filters = useDogFilters(favorites);

  // Track filtered totalResults separately
  useEffect(() => {
    setLoading(true);
    setTotalResults(filters.dogs.length);
    setLoading(false);
  }, [filters.dogs]);

  return {
    breeds, // Unique breeds from favorites only
    totalResults,
    loading,
    ...filters, // Spread reusable filter logic
  };
}