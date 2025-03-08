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
}

export default function MainPageLayout(props: MainPageLayoutProps) {
  return (
    <div className="mx-auto flex flex-col p-6 pt-16">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar now uses breeds from favorited dogs */}
      <Sidebar {...props} />

      {/* Header for Sorting/Pagination */}
      <Header size={props.size} setSize={props.setSize} />

      {/* Main Content */}
      <div className="px-64 transition-all duration-300">{props.children}</div>
    </div>
  );
}
