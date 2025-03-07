import { useState } from "react";
import { FiFilter, FiX } from "react-icons/fi";
import {
  BreedFilter,
  ZipCodeFilter,
  AgeFilter,
  CategoryFilter,
  DirectionSort,
} from "@/(features)/filters";



interface SidebarProps {
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  zipCodes: string[];
  setZipCodes: (zipCodes: string[]) => void;
  ageMin: number;
  setAgeMin: (age: number) => void;
  ageMax: number;
  setAgeMax: (age: number) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
}

export default function Sidebar({
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
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Define reusable styling constants
  const FILTER_LABEL_STYLE = "text-xs font-bold text-gray-500 uppercase mb-1";
  const FILTER_WRAPPER_STYLE = "py-2 my-2 border-t border-gray-300";

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 left-4 z-50 flex items-center gap-2 rounded bg-gray-200 p-2 shadow-md transition-all duration-300 cursor-pointer hover:bg-gray-300"
        style={{
          left: isOpen ? `calc(16rem + 10px)` : "10px", // Moves with sidebar
        }}
      >
        <FiFilter size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 pb-16 mt-4 z-40 h-screen w-64 overflow-y-auto border-r border-slate-200 bg-white shadow-md transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="py-6 px-6">
          {/* Close Button */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="space-y-6">
            <div className={FILTER_WRAPPER_STYLE}>
              <p className={FILTER_LABEL_STYLE}>Breed</p>
              <BreedFilter
                breeds={breeds}
                selectedBreeds={selectedBreeds}
                setSelectedBreeds={setSelectedBreeds}
              />
            </div>

            <div className={FILTER_WRAPPER_STYLE}>
              <p className={FILTER_LABEL_STYLE}>ZIP Code</p>
              <ZipCodeFilter zipCodes={zipCodes} setZipCodes={setZipCodes} />
            </div>

            <div className={FILTER_WRAPPER_STYLE}>
              <p className={FILTER_LABEL_STYLE}>Age Range</p>
              <AgeFilter
                ageMin={ageMin}
                ageMax={ageMax}
                setAgeMin={setAgeMin}
                setAgeMax={setAgeMax}
              />
            </div>

            <div className={FILTER_WRAPPER_STYLE}>
              <p className={FILTER_LABEL_STYLE}>Sort By</p>
              <CategoryFilter
                sortField={sortField}
                setSortField={setSortField}
              />
            </div>

            <div className={FILTER_WRAPPER_STYLE}>
              <p className={FILTER_LABEL_STYLE}>Sort Direction</p>
              <DirectionSort
                sortOrder={sortOrder}
                onToggleSort={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
