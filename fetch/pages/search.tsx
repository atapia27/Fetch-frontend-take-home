import useSearchFilters from "@/(features)/search/hooks/useSearchFilters";
import SearchLayout from "@/(features)/search/layout/SearchLayout";
import DogCard from "@/components/DogCard";
import Pagination from "@/layout/Pagination";
import Sonner from "@/(features)/favorites/components/Sonner";

export default function SearchPage() {
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
  } = useSearchFilters();

  return (
    <SearchLayout
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
        <p className="h-screen text-center text-gray-500">Loading dogs...</p>
      )}

      {/* No Dogs Found */}
      {!loading && dogs.length === 0 && (
        <p className="text-center text-gray-500">
          No dogs found. Try different filters.
        </p>
      )}

      {/* Dog Results */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
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
    </SearchLayout>
  );
}
