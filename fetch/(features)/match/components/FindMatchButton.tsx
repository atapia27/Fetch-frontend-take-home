import { FaHeart } from "react-icons/fa";

interface FindMatchButtonProps {
  onClick: () => void;
}

export default function FindMatchButton({ onClick }: FindMatchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center gap-2 rounded-lg bg-red-600 p-2 text-white shadow-md transition-all duration-300 hover:bg-red-800"
    >
      Find My Match!
      <FaHeart />
    </button>
  );
}
