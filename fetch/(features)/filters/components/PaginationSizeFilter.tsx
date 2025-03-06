const PAGE_SIZE_OPTIONS = [12, 24, 48]; // ✅ Define options in one place

interface PaginationSizeFilterProps {
  size: number;
  onSizeChange: (newSize: number) => void;
}

export default function PaginationSizeFilter({
  size,
  onSizeChange,
}: PaginationSizeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium">Results per page:</label>
      <select
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className="rounded-md border p-2"
      >
        {PAGE_SIZE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
