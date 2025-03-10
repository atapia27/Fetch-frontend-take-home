import { useState } from "react";
import Navbar from "@/layout/Navbar";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";

interface MainPageLayoutProps {
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
  bannerImage: string;
  bannerTitle: string;
  bannerDescription: string;
  bannerClassName?: string;
  bannerContentClassName?: string;
  bannerTextPosition: "left" | "right"; // Determines which grid column the banner text should be in
}

export default function MainPageLayout(props: MainPageLayoutProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col bg-[#F9F7F1]">
      <Navbar />
      <Sidebar {...props} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Banner Background */}
      <div className={props.bannerClassName}>
        <div className="grid grid-cols-2 h-full w-full px-64">
          {props.bannerTextPosition === "left" ? (
            <>
              <div className={props.bannerContentClassName}>
                <h1 className="text-5xl font-bold drop-shadow-md capitalize">
                  {props.bannerTitle}
                </h1>
                <p className="text-lg font-semibold">{props.bannerDescription}</p>
              </div>
              <div /> {/* Empty div to maintain grid structure */}
            </>
          ) : (
            <>
              <div /> {/* Empty div to maintain grid structure */}
              <div className={props.bannerContentClassName}>
                <h1 className="text-5xl font-bold drop-shadow-md capitalize">
                  {props.bannerTitle}
                </h1>
                <p className="text-lg font-semibold">{props.bannerDescription}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Header for Sorting/Pagination */}
      <Header size={props.size} setSize={props.setSize} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex flex-col px-72 w-full pb-4 bg-[url('/dogPattern.png')] bg-contain bg-repeat-y">
        <div>{props.children}</div>
      </div>
    </div>
  );
}
