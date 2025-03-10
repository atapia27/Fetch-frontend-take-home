import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface AgeFilterProps {
  ageMin: number;
  ageMax: number;
  setAgeMin: (age: number) => void;
  setAgeMax: (age: number) => void;
}

const MIN_AGE = 0;
const MAX_AGE = 20;

export default function AgeFilter({
  ageMin,
  ageMax,
  setAgeMin,
  setAgeMax,
}: AgeFilterProps) {
  const handleChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setAgeMin(values[0]);
      setAgeMax(values[1]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex w-full flex-col items-center">
        <Slider
          range
          min={MIN_AGE}
          max={MAX_AGE}
          value={[ageMin, ageMax]}
          onChange={handleChange}
          trackStyle={[{ backgroundColor: "#3b82f6", height: 6 }]}
          railStyle={{ backgroundColor: "#d1d5db", height: 6 }}
          handleStyle={[
            {
              backgroundColor: "#3b82f6",
              borderColor: "#3b82f6",
              width: 16,
              height: 16,
            },
            {
              backgroundColor: "#3b82f6",
              borderColor: "#3b82f6",
              width: 16,
              height: 16,
            },
          ]}
        />
      </div>

      {/* Display Selected Values */}
      <div className="flex justify-between pt-1 text-sm">
        <span>Min: {ageMin}</span>
        <span>Max: {ageMax}</span>
      </div>
    </div>
  );
}
