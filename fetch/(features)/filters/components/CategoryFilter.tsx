import * as styles from "@/(features)/filters/styles/styles";
import { twMerge } from "tailwind-merge";

interface CategoryFilterProps {
  sortField: string;
  setSortField: (field: string) => void;
}

export default function CategoryFilter({
  sortField,
  setSortField,
}: CategoryFilterProps) {
  return (
    <div>
      <select
        value={sortField}
        onChange={(e) => setSortField(e.target.value)}
        className={twMerge(styles.inputBase, "w-full")}
      >
        <option value="breed">Breed</option>
        <option value="name">Name</option>
        <option value="age">Age</option>
      </select>
    </div>
  );
}
