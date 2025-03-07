import { useEffect, useRef } from "react";

interface ComboBoxListProps {
  options: string[];
  onSelect: (option: string) => void;
  highlightedIndex: number;
}

export default function ComboBoxList({
  options,
  onSelect,
  highlightedIndex,
}: ComboBoxListProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (highlightedIndex >= 0 && itemRefs.current[highlightedIndex]) {
      itemRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest", 
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  return (
    <ul
      ref={listRef}
      className="absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
    >
      {options.map((option, index) => (
        <li
          key={option}
          ref={(el) => {
            if (el) itemRefs.current[index] = el;
          }}
          className={`cursor-pointer p-2 ${
            highlightedIndex === index
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100"
          }`}
          onClick={() => onSelect(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}
