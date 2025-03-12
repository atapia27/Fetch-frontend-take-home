import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/(features)/auth/components/LogoutButton";
import MatchModal from "@/(features)/match/MatchModal";
import FindMatchButton from "@/(features)/match/components/FindMatchButton";

import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

export default function Navbar() {
  const HeaderStyle =
    "text-slate-900 hover:text-fuchsia-800 transition-all duration-300";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMatchModalOpen, setMatchModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-72 py-4 transition-all duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Left: Logo */}
      <Link href="/search">
        <Image
          src="/Fetch_Logo_Nav.svg"
          alt="Fetch Logo"
          width={140}
          height={40}
          priority={true}
        />
      </Link>

      {/* Right: Navigation Links & Logout */}
      <div className="flex items-center gap-10">
        <Link href="/search" className={HeaderStyle}>
          Search
        </Link>
        <Link href="/favorites" className={HeaderStyle}>
          Favorites
        </Link>
        <FindMatchButton onClick={() => setMatchModalOpen(true)} />
        <LogoutButton />
      </div>

      {/* Match Modal */}
      {isMatchModalOpen && <MatchModal onClose={() => setMatchModalOpen(false)} />}
    </nav>
  );
}
