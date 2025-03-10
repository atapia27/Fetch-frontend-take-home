import * as styles from "@/(features)/filters/styles/styles";
import { twMerge } from "tailwind-merge";
import { FiFilter } from "react-icons/fi";

interface SidebarToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  const FILTER_LABEL_STYLE = "text-xs font-bold text-gray-500 uppercase mb-1";

  return (
    <div className="flex flex-col items-center gap-2 ">
      <label className={FILTER_LABEL_STYLE}>Advanced Filters</label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.inputBase}
      >
        <FiFilter size={20} />
      </button>
    </div>
  );
}
