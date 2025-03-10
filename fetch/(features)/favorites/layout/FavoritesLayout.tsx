import { useState } from "react"; 
import Navbar from "@/layout/Navbar";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";

interface FavoritesLayoutProps {
  children: React.ReactNode;
  breeds: string[];
  selectedBreeds: string[];
  setSelectedBreeds: (breeds: string[]) => void;
  zipCodes: string[];
  setZipCodes: (zipCodes: string[]) => void;
  ageMin: number;
  setAgeMin: (age: number) => void;
  ageMax: number;
  setAgeMax: (age: number) => void;
  sortField: string;
  setSortField: (field: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  size: number;
  setSize: (size: number) => void;
  setMatchModalOpen: (open: boolean) => void;
}

export default function FavoritesLayout(props: FavoritesLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-[#F9F7F1]">
      <Navbar />

      <Sidebar {...props} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Banner Background */}
      <div className="relative w-full h-[5vh] bg-[url('/favoritesBanner.jpeg')] bg-cover bg-[center-left_-3vh] bg-no-repeat md:h-[35vh] pt-18">
        <div className="grid grid-cols-2 h-full w-full px-64">
          {/* Empty Left Grid for Spacing */}
          <div></div>

          {/* Right Grid - Title & Text */}
          <div className="flex items-end flex-col justify-center gap-8 text-right">
            <h1 className="text-5xl font-bold drop-shadow-md capitalize">
              Your Favorite Dogs in One Place!
            </h1>
            <p className="text-lg font-semibold">
              Easily browse and manage your saved favorites.
            </p>
          </div>
        </div>
      </div>
          {/* Header for Sorting/Pagination */}
          <Header size={props.size} setSize={props.setSize} isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex flex-col px-72  w-full pb-4 bg-[url('/dogPattern.png')] bg-contain  bg-repeat-y">


          {/* Main Content */}
          <div>{props.children}</div>
      </div>

    </div>
  );
}
