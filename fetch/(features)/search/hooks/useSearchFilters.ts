import { useState, useCallback, useEffect, useMemo } from "react";
import { useDogStore } from "@/(features)/search/store/dogStore";
import { fetchDogs } from "@/utils/api";

interface Dog {
  id: string;
  name: string;
  breed: string;
  img: string;
  age: number;
  zip_code: string;
}

export default function useSearchFilters() {
  const { breeds, fetchBreeds } = useDogStore();

  // State management for filters
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [zipCodes, setZipCodes] = useState<string[]>([]);
  const [ageMin, setAgeMin] = useState<number>(0);
  const [ageMax, setAgeMax] = useState<number>(20);
  const [sortField, setSortField] = useState("breed");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12); // Default page size (multiples of 4)
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch Breeds Only If Not Already Loaded
  useEffect(() => {
    if (breeds.length === 0) {
      fetchBreeds();
    }
  }, [breeds, fetchBreeds]);

  // Load Dogs Function
  const loadDogs = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchDogs(
        selectedBreeds,
        zipCodes,
        ageMin,
        ageMax,
        sortField,
        sortOrder,
        page,
        size,
      );
      setDogs(data.dogs);
      setTotalResults(data.totalResults);
    } catch (error) {
      console.error("Error loading dogs:", error);
    } finally {
      setLoading(false); // Ensure loading state is updated only once
    }
  }, [
    selectedBreeds,
    zipCodes,
    ageMin,
    ageMax,
    sortField,
    sortOrder,
    page,
    size,
  ]);

  useEffect(() => {
    loadDogs();
  }, [loadDogs]);

  // Memoize returned values to avoid unnecessary re-renders
  return useMemo(
    () => ({
      breeds,
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
      totalResults,
      loading,
    }),
    [
      breeds,
      selectedBreeds,
      zipCodes,
      ageMin,
      ageMax,
      sortField,
      sortOrder,
      page,
      size,
      dogs,
      totalResults,
      loading,
    ],
  );
}
