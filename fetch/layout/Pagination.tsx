interface PaginationNavigationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationNavigationProps) {
  const buttonStyling =
    "bg-white rounded-md border p-2 disabled:opacity-50 cursor-pointer ";

  return (
    <div className="flex items-center justify-center gap-4 py-6 ">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className={buttonStyling}
      >
        Previous
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className={buttonStyling}
      >
        Next
      </button>
    </div>
  );
}
