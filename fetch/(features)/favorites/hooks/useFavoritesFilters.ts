import { useFavoritesStore } from "@/(features)/favorites/store/favoritesStore";
import { useEffect, useState, useMemo } from "react";
import { resetDogFilters } from "@/hooks/resetDogFilters";
import Dog from "@/utils/types";

export function useFavoritesFilters() {
  const { favorites } = useFavoritesStore();
  const [filteredDogs, setFilteredDogs] = useState<Dog[]>([]); // MainPage Store paginated results
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  const breeds = useMemo(
    () => [...new Set(favorites.map((dog) => dog.breed))],
    [favorites],
  );

  // Use shared filtering logic
  const filters = resetDogFilters();

  // Apply filtering, sorting, and pagination
  useEffect(() => {
    setLoading(true);

    let filteredList = favorites.filter(
      (dog) =>
        (!filters.selectedBreeds.length ||
          filters.selectedBreeds.includes(dog.breed)) &&
        (!filters.zipCodes.length || filters.zipCodes.includes(dog.zip_code)) &&
        dog.age >= filters.ageMin &&
        dog.age <= filters.ageMax,
    );

    // Sorting
    filteredList = filteredList.sort((a, b) => {
      const fieldA = a[filters.sortField as keyof Dog];
      const fieldB = b[filters.sortField as keyof Dog];

      if (fieldA < fieldB) return filters.sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // MainPage Store the total filtered results before pagination
    setTotalResults(filteredList.length);

    // Pagination
    const paginatedList = filteredList.slice(
      (filters.page - 1) * filters.size,
      filters.page * filters.size,
    );

    // MainPage Update state with paginated results
    setFilteredDogs(paginatedList);

    setLoading(false);
  }, [
    favorites,
    filters.selectedBreeds,
    filters.zipCodes,
    filters.ageMin,
    filters.ageMax,
    filters.sortField,
    filters.sortOrder,
    filters.page,
    filters.size,
  ]);

  return {
    favorites, //  Keep this to access full list if needed
    dogs: filteredDogs, // Correct paginated results to display
    breeds,
    totalResults,
    loading,
    ...filters,
  };
}
