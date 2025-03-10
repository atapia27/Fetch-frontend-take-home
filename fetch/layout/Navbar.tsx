import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/(features)/auth/components/LogoutButton";
import { useEffect, useState } from "react";

export default function Navbar() {
  const HeaderStyle =
    "text-slate-900 hover:text-fuchsia-800 transition-all duration-300";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 flex w-full items-center justify-between px-72 py-4 transition-all duration-200 ${
        isScrolled ? "bg-white shadow-sm" : "bg-transparent" // Other option: blend into header pic: bg-gradient-to-r from-[#FFC22C] to-[#FFCB37]
      }`}
    >
      {/* Left: Logo */}
      <Link href="/">
        <Image
          src="/Fetch_Logo_Nav.svg"
          alt="Fetch Logo"
          width={140}
          height={40}
          priority={true}
        />
      </Link>

      {/* Right: Navigation Links & Logout */}
      <div className="flex items-center gap-24">
        <Link href="/search" className={HeaderStyle}>
          Search
        </Link>
        <Link href="/favorites" className={HeaderStyle}>
          Favorites
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
}
