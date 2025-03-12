import { FaHeart } from "react-icons/fa";

interface FindMatchButtonProps {
  onClick: () => void;
}

export default function FindMatchButton({ onClick }: FindMatchButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer items-center rounded-lg bg-red-600 p-2 gap-2 text-white shadow-md hover:bg-red-800 transition-all duration-300"
    >
      Find My Match!
      <FaHeart />
    </button>
  );
}
