import * as styles from "@/(features)/filters/styles/styles";

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
      <button onClick={onToggleSort} className={styles.inputBase}>
        Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}
