import { twMerge } from "tailwind-merge";
import MainPageLayout from "@/layout/MainPageLayout";

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
  return (
    <MainPageLayout
      {...props}
      bannerImage="/favoritesBanner.jpeg"
      bannerTitle="Your Favorite Dogs in One Place!"
      bannerDescription="Easily browse and manage your saved favorites."
      bannerClassName={twMerge(
        "relative w-full h-[5vh] bg-cover bg-no-repeat md:h-[35vh] pt-18",
        "bg-[url('/favoritesBanner.jpeg')] bg-[center-left_-3vh]"
      )}
      bannerContentClassName="flex items-end flex-col justify-center gap-8 text-right"
      bannerTextPosition="right" // Text in the second grid column
    >
      {props.children}
    </MainPageLayout>
  );
}
