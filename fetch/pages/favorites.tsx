import { useState } from "react";
import FavoritesLayout from "@/(features)/favorites/layout/FavoritesLayout";
import MatchModal from "@/(features)/match/MatchModal";
import DogCard from "@/components/DogCard";
import Pagination from "@/layout/Pagination";
import { useFavoritesFilters } from "@/(features)/favorites/hooks/useFavoritesFilters";
import Sonner from "@/(features)/favorites/components/Sonner";
import { FaHeart } from "react-icons/fa";

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
  } = useFavoritesFilters();

  const [isMatchModalOpen, setMatchModalOpen] = useState(false);

  return (
    <FavoritesLayout
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
      setMatchModalOpen={setMatchModalOpen}
    >
      <Sonner />
      {/* Find Match Button */}
      {dogs.length > 0 && (
        <div className="flex justify-center pb-4">
          <button
            onClick={() => setMatchModalOpen(true)}
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 px-6 py-3 font-bold text-white shadow-md hover:bg-red-800"
          >
            Find My Match!
            <FaHeart />
          </button>
        </div>
      )}
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
    </FavoritesLayout>
  );
}
