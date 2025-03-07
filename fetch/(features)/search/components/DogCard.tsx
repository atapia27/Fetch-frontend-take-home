import { FaRegHeart, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useState } from "react";
import Dog from "@/utils/types";

interface DogCardProps {
  dog: Dog;
}

export default function DogCard({ dog }: DogCardProps) {
  const [favorite, setFavorite] = useState(false);

  function toggleFavorite() {
    setFavorite(!favorite);
  }

  /** --- Full Reused Styles --- **/
  const infoLabelText = "text-sm font-semibold text-gray-600";

  return (
    <div className="flex flex-col items-center rounded-lg border bg-white px-2 py-6 shadow-md">
      {/* Circular Profile Picture */}
      <div className="relative">
        <div className="relative h-[7vw] w-[7vw] overflow-hidden rounded-full border-0">
          <Image
            src={dog.img ?? "/placeholder.png"}
            alt={dog.name ?? "Dog"}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* Heart Button */}
        <button
          onClick={toggleFavorite}
          className="absolute top-0 right-0 text-red-500 hover:text-red-700 focus:outline-none"
        >
          {favorite ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
        </button>
      </div>

      {/* Dog Name */}
      <h2 className="mt-4 rounded-lg bg-slate-100 px-3 text-center text-lg font-semibold">
        {dog.name}
      </h2>

      {/* Dog Info Grid */}
      <div className="mt-2 grid w-full grid-cols-3 gap-1 border-t pt-6 text-center">
        <div>
          <p className={infoLabelText}>Age</p>
          <p className="text-sm">{dog.age ?? "N/A"}</p>
        </div>
        <div>
          <p className={infoLabelText}>Breed</p>
          <p className="text-sm">{dog.breed ?? "N/A"}</p>
        </div>
        <div>
          <p className={infoLabelText}>ZIP Code</p>
          <p className="text-sm">{dog.zip_code ?? "N/A"}</p>
        </div>
      </div>
    </div>
  );
}
