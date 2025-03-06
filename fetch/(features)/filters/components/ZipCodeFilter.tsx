import ComboBox from "@/components/combobox/ComboBox";
import { ZIP_CODE_LIST } from "../constants/zipCodes";

interface ZipCodeFilterProps {
  zipCodes: string[];
  setZipCodes: (zipCodes: string[]) => void;
}

export default function ZipCodeFilter({
  zipCodes,
  setZipCodes,
}: ZipCodeFilterProps) {
  const addZipCode = (zip: string) => {
    if (!ZIP_CODE_LIST.includes(zip)) return;
    if (!zipCodes.includes(zip)) {
      setZipCodes([...zipCodes, zip]);
    }
  };

  const removeZipCode = (zip: string) => {
    setZipCodes(zipCodes.filter((z) => z !== zip));
  };

  return (
    <div className="w-full">
      {/* ComboBox for ZIP Code Selection */}
      <ComboBox
        options={ZIP_CODE_LIST}
        onSelect={addZipCode}
        placeholder="Enter or select ZIP code..."
      />

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
