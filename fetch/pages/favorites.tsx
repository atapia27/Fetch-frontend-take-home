import FavoritesLayout from "@/(features)/favorites/layout/FavoritesLayout";
import DogCard from "@/components/DogCard";
import Pagination from "@/layout/Pagination";
import { useFavoritesFilters } from "@/(features)/favorites/hooks/useFavoritesFilters";
import Sonner from "@/(features)/favorites/components/Sonner";

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
    >
      <Sonner />

      {/* Loading State */}
      {loading && (
        <p className="h-screen text-center text-gray-500">Loading favorites...</p>
      )}

      {/* No Favorites */}
      {!loading && dogs.length === 0 && (
        <p className="text-center text-gray-500 ">
          No favorite dogs match the filters.
        </p>
      )}

      {/* Favorite Dogs Grid */}
      <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={Math.ceil(totalResults / size)}
        onPageChange={setPage}
      />
    </FavoritesLayout>
  );
}
