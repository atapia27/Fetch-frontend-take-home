import { useLogout } from "@/(features)/auth/hooks/useLogout";
import { twMerge } from "tailwind-merge";
import { buttonBase } from "@/(features)/auth/styles/styles";

export default function LogoutButton() {
  const { handleLogout, loading } = useLogout();

  /** --- Styling --- **/
  const buttonVariant =
    "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50";
  const buttonStyle = twMerge(buttonBase, buttonVariant);

  return (
    <button onClick={handleLogout} className={buttonStyle} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
