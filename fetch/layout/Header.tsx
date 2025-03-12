import SidebarToggle from "@/layout/SidebarToggle";
import PaginationSizeFilter from "@/(features)/filters/components/PaginationSizeFilter";

interface HeaderProps {
  size: number;
  setSize: (size: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Header({
  size,
  setSize,
  isOpen,
  setIsOpen,
}: HeaderProps) {
  return (
    <div className="mx-72 mb-4 border-b border-gray-300 bg-[#F9F7F1] pt-4 pb-2">
      <div className="mx-12 grid grid-cols-3 items-center gap-12">
        {/* Sidebar Toggle */}
        <SidebarToggle isOpen={isOpen} setIsOpen={setIsOpen} />
        <div></div>
        {/* Pagination Size Filter */}
        <PaginationSizeFilter size={size} onSizeChange={setSize} />
      </div>
    </div>
  );
}
