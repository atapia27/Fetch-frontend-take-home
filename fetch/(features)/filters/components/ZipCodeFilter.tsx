import { useState } from "react";

interface ZipCodeFilterProps {
  zipCodes: string[];
  setZipCodes: (zipCodes: string[]) => void;
}

export default function ZipCodeFilter({
  zipCodes,
  setZipCodes,
}: ZipCodeFilterProps) {
  const [zipInput, setZipInput] = useState("");

  const isValidZip = (zip: string) => /^\d{5}$/.test(zip); // Ensures 5-digit numeric input

  const addZipCode = () => {
    if (isValidZip(zipInput) && !zipCodes.includes(zipInput)) {
      setZipCodes([...zipCodes, zipInput]);
      setZipInput(""); // Clear input after adding
    }
  };

  const removeZipCode = (zip: string) => {
    setZipCodes(zipCodes.filter((z) => z !== zip));
  };

  return (
    <div className="w-full">
      {/* ZIP Code Input */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
          placeholder="Enter ZIP code..."
          className="w-full rounded-lg border border-gray-300 p-2"
        />
        <button
          onClick={addZipCode}
          disabled={!isValidZip(zipInput)}
          className={`rounded-lg border px-3 py-2 text-white ${
            isValidZip(zipInput)
              ? "cursor-pointer bg-blue-600 hover:bg-blue-700"
              : "cursor-not-allowed bg-gray-400"
          }`}
        >
          Add
        </button>
      </div>

      {/* Display Selected ZIP Codes as Tags */}
      {zipCodes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {zipCodes.map((zip) => (
            <div
              key={zip}
              className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-1 text-blue-800"
            >
              <span>{zip}</span>
              <button
                onClick={() => removeZipCode(zip)}
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
