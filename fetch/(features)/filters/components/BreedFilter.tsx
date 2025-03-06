import ComboBox from "@/components/combobox/ComboBox";

interface BreedFilterProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
}

export default function BreedFilter({
  breeds,
  selectedBreeds,
  setSelectedBreeds,
}: BreedFilterProps) {
  const addBreed = (breed: string) => {
    if (breed === "All breeds") {
      setSelectedBreeds([]); // Reset selection to all breeds
    } else if (!selectedBreeds.includes(breed)) {
      setSelectedBreeds([...selectedBreeds, breed]);
    }
  };

  const removeBreed = (breed: string) => {
    setSelectedBreeds(selectedBreeds.filter((b) => b !== breed));
  };

  return (
    <div className="w-full">
      {/* Breed Dropdown with Search */}
      <ComboBox
        options={["All breeds", ...breeds]}
        onSelect={addBreed}
        placeholder="Select a breed..."
      />

      {/* Display Selected Breeds as Tags */}
      {selectedBreeds.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {selectedBreeds.map((breed) => (
            <div
              key={breed}
              className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-800"
            >
              <span>{breed}</span>
              <button
                onClick={() => removeBreed(breed)}
                className="font-bold text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
