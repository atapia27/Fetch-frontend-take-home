import Navbar from "@/layout/Navbar";
import Header from "@/layout/Header";
import Sidebar from "@/layout/Sidebar";

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
    <div className="mx-auto flex flex-col p-6 pt-16">
      {/* Navbar */}
      <Navbar />

      {/* Sidebar (Moved to layout) */}
      <Sidebar {...props} />

      {/* Header (Pagination Filter) */}
      <Header size={props.size} setSize={props.setSize} />

      {/* Main Content */}
      <div className="px-64 transition-all duration-300">{props.children}</div>
    </div>
  );
}
