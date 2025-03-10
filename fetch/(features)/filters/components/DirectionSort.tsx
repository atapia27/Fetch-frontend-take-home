import * as styles from "@/(features)/filters/styles/styles";
import { twMerge } from "tailwind-merge";

interface DirectionSortProps {
  sortOrder: "asc" | "desc";
  onToggleSort: () => void;
}

export default function DirectionSort({
  sortOrder,
  onToggleSort,
}: DirectionSortProps) {
  return (
    <div>
      <button
        onClick={onToggleSort}
        className={twMerge(styles.inputBase, "w-full text-left")}
      >
        Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}
