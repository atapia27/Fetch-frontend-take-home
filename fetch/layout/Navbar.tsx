import Link from "next/link";
import Image from "next/image";
import LogoutButton from "@/(features)/auth/components/LogoutButton";


export default function Navbar() {

  const HeaderStyle = "text-gray-700 hover:text-gray-900"

  return (
    <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-white px-72 py-4 shadow-sm">
      {/* Left: Logo */}
      <Link href="/">
        <Image
          src="/Fetch_Logo_Nav.svg"
          alt="Fetch Logo"
          width={140}
          height={40}
          priority
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
