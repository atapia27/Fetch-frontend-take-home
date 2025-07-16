import { useState } from "react";

export function useResetDogFilters() {
  // State management for filters
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(20);
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);

  // Reset function
  const resetFilters = () => {
    setSelectedBreeds([]);
    setZipCodes([]);
    setAgeMin(0);
    setAgeMax(20);
    setSortField("breed");
    setSortOrder("asc");
    setPage(1);
    setSize(12);
  };

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
    resetFilters, // Export the reset function
  };
}
