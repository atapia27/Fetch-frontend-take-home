import { twMerge } from "tailwind-merge";
import MainPageLayout from "@/layout/MainPageLayout";

interface SearchLayoutProps {
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
}

export default function SearchLayout(props: SearchLayoutProps) {
  return (
    <MainPageLayout
      {...props}
      bannerImage="/pugBanner.png"
      bannerTitle="Search for your dream dog Today!"
      bannerDescription="Browse and filter through all of our available dogs."
      bannerClassName={twMerge(
        "relative w-full h-[5vh] bg-cover bg-no-repeat md:h-[35vh] pt-18",
        "bg-[url('/pugBanner.png')] bg-[center_-3vh]"
      )}
      bannerContentClassName="flex items-start flex-col justify-center gap-8 text-left"
      bannerTextPosition="left" // Text in the first grid column
    >
      {props.children}
    </MainPageLayout>
  );
}
