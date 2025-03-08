import { useState, useEffect } from "react";
import Dog from "@/utils/types";

export function useDogFilters(initialDogs: Dog[]) {
  // State management for filters
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(20);
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [dogs, setDogs] = useState<Dog[]>([]);

  // Filter and sort dogs dynamically
  useEffect(() => {
    let filteredDogs = initialDogs;

    // Apply breed filter
    if (selectedBreeds.length > 0) {
      filteredDogs = filteredDogs.filter((dog) => selectedBreeds.includes(dog.breed));
    }

    // Apply zip code filter
    if (zipCodes.length > 0) {
      filteredDogs = filteredDogs.filter((dog) => zipCodes.includes(dog.zip_code));
    }

    // Apply age filter
    filteredDogs = filteredDogs.filter((dog) => dog.age >= ageMin && dog.age <= ageMax);

    // Sort results
    filteredDogs = filteredDogs.sort((a, b) => {
      const fieldA = a[sortField as keyof Dog];
      const fieldB = b[sortField as keyof Dog];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Pagination logic
    const paginatedDogs = filteredDogs.slice((page - 1) * size, page * size);

    setDogs(paginatedDogs);
  }, [initialDogs, selectedBreeds, zipCodes, ageMin, ageMax, sortField, sortOrder, page, size]);

  return {
    selectedBreeds,
    setSelectedBreeds,
    zipCodes,
    setZipCodes,
    ageMin,
    setAgeMin,
    ageMax,
    setAgeMax,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    page,
    setPage,
    size,
    setSize,
    dogs,
  };
}
