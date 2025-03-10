import * as styles from "@/(features)/filters/styles/styles";
import { twMerge } from "tailwind-merge";

interface PaginationSizeFilterProps {
  size: number;
  onSizeChange: (newSize: number) => void;
}

export default function PaginationSizeFilter({
  size,
  onSizeChange,
}: PaginationSizeFilterProps) {
  const PAGE_SIZE_OPTIONS = [12, 24, 48]; //  Define options here
  const FILTER_LABEL_STYLE = "text-xs font-bold text-gray-500 uppercase mb-1 ";

  return (
    <div className="flex flex-col items-center gap-2 ">
      <label className={FILTER_LABEL_STYLE}>Results per page</label>
      <select
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
        className={twMerge(styles.inputBase, "text-center ")}
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
