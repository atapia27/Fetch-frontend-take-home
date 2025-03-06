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
      <button onClick={onToggleSort} className="rounded-md border p-2">
        Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
      </button>
    </div>
  );
}
