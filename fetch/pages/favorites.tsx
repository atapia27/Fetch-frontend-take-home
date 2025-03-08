import MainPageLayout from "@/layout/MainPageLayout";
import MatchModal from "@/(features)/match/MatchModal";
import DogCard from "@/(features)/search/components/DogCard";
import Pagination from "@/layout/Pagination";
import { useFavoritesFilters } from "@/(features)/favorites/hooks/useFavoritesFilters";
import Sonner from "@/(features)/favorites/components/Sonner";
import { useEffect, useState } from "react";
import { fetchDogDetails } from "@/utils/api";
import { useFavoritesStore } from "@/(features)/favorites/store/favoritesStore";
import Dog from "@/utils/types";

export default function FavoritesPage() {
  const {
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
  } = useFavoritesFilters(); // Using favorites-specific filter logic

  const [isMatchModalOpen, setMatchModalOpen] = useState(false); // Modal state
  // const { favorites } = useFavoritesStore();
  // const [_dogs, setDogs] = useState<Dog[]>([]);

  

  return (
    <MainPageLayout
      breeds={breeds}
      selectedBreeds={selectedBreeds}
      setSelectedBreeds={setSelectedBreeds}
      zipCodes={zipCodes}
      setZipCodes={setZipCodes}
      ageMin={ageMin}
      setAgeMin={setAgeMin}
      ageMax={ageMax}
      setAgeMax={setAgeMax}
      sortField={sortField}
      setSortField={setSortField}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      size={size}
      setSize={setSize}
    >
      <Sonner />

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500">Loading favorites...</p>
      )}

      {/* No Favorites */}
      {!loading && dogs.length === 0 && (
        <p className="text-center text-gray-500">
          No favorite dogs match the filters.
        </p>
      )}

      {/* Favorite Dogs Grid */}
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Find Match Button */}
      {dogs.length > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setMatchModalOpen(true)}
            className="rounded-lg bg-blue-500 px-6 py-3 text-white shadow-md hover:bg-blue-600"
          >
            Find My Match
          </button>
        </div>
      )}

      {/* Match Modal */}
      {isMatchModalOpen && (
        <MatchModal onClose={() => setMatchModalOpen(false)} />
      )}

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={Math.ceil(totalResults / size)}
        onPageChange={setPage}
      />
    </MainPageLayout>
  );
}
