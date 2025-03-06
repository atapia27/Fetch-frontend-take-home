import { useState, useRef, useEffect } from "react";
import ComboBoxInput from "./ComboBoxInput";
import ComboBoxList from "./ComboBoxList";

interface ComboBoxProps {
  options: string[];
  onSelect: (option: string) => void;
  placeholder?: string;
}

export default function ComboBox({
  options,
  onSelect,
  placeholder,
}: ComboBoxProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const comboBoxRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        comboBoxRef.current &&
        !comboBoxRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered options based on user input
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    // Reset highlighted index when search query changes
    setHighlightedIndex(0);
  }, [query]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen || filteredOptions.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setHighlightedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1),
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (filteredOptions[highlightedIndex]) {
          onSelect(filteredOptions[highlightedIndex]);
          setQuery("");
          setIsOpen(false);
          setHighlightedIndex(0);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setQuery("");
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  return (
    <div
      className="relative w-full"
      ref={comboBoxRef}
      onKeyDown={handleKeyDown}
    >
      {/* Search Input */}
      <ComboBoxInput
        value={query}
        onChange={(val) => {
          setQuery(val);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder={placeholder}
      />

      {/* Dropdown List with Keyboard Navigation & Auto-Scrolling */}
      {isOpen && filteredOptions.length > 0 && (
        <ComboBoxList
          options={filteredOptions}
          onSelect={handleSelect}
          highlightedIndex={highlightedIndex}
        />
      )}
    </div>
  );
}
