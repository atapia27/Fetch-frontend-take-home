import useSearchFilters from "@/(features)/search/hooks/useSearchFilters";
import SearchLayout from "@/(features)/search/layout/SearchLayout";
import DogCard from "@/(features)/search/components/DogCard";

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

      {/* Loading State */}
      {loading && <p className="text-center text-gray-500">Loading dogs...</p>}

      {/* Dog Results */}
      {!loading && dogs.length === 0 && (
        <p className="text-center text-gray-500">
          No dogs found. Try different filters.
        </p>
      )}

      <div className="grid grid-cols-1 gap-x-2 gap-y-4 md:grid-cols-2 lg:grid-cols-4">
        {dogs.map((dog) => (
          <DogCard key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Pagination */}

    </SearchLayout>
  );
}
