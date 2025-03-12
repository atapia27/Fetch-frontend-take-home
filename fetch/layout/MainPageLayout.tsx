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
    <div className="bg-scale flex min-h-screen flex-col bg-[#F9F7F1] bg-[url('/dogPattern.png')] bg-repeat">
      <Navbar />
      <Sidebar {...props} isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Banner Background */}
      <div className={props.bannerClassName}>
        <div className="grid h-full w-full grid-cols-2 px-72">
          {props.bannerTextPosition === "left" ? (
            <>
              <div className={props.bannerContentClassName}>
                <h1 className="text-5xl font-bold capitalize drop-shadow-md">
                  {props.bannerTitle}
                </h1>
                <p className="text-lg font-semibold">
                  {props.bannerDescription}
                </p>
              </div>
              <div /> {/* Empty div to maintain grid structure */}
            </>
          ) : (
            <>
              <div /> {/* Empty div to maintain grid structure */}
              <div className={props.bannerContentClassName}>
                <h1 className="text-5xl font-bold capitalize drop-shadow-md">
                  {props.bannerTitle}
                </h1>
                <p className="text-lg font-semibold">
                  {props.bannerDescription}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Header for Sorting/Pagination */}
      <Header
        size={props.size}
        setSize={props.setSize}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {/* Main Content with Flex Grow */}
      <div className="flex flex-1 flex-col px-72 pb-4">
        <div className="">{props.children}</div>
      </div>
    </div>
  );
}
