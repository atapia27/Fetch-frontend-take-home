import PaginationSizeFilter from "@/(features)/filters/components/PaginationSizeFilter";

interface HeaderProps {
  size: number;
  setSize: (size: number) => void;
}

export default function Header({ size, setSize }: HeaderProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4">
      {/* Pagination Size Filter */}
      <div className="flex justify-center">
        <PaginationSizeFilter size={size} onSizeChange={setSize} />
      </div>
    </div>
  );
}
