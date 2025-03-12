import { useLogout } from "@/(features)/auth/hooks/useLogout";
import { twMerge } from "tailwind-merge";
import { buttonBase } from "@/(features)/auth/styles/styles";

export default function LogoutButton() {
  const { handleLogout, loading } = useLogout();

  /** --- Styling --- **/
  const buttonVariant =
    "bg-slate-200 hover:bg-slate-300 border border-slate-300 disabled:opacity-50 text-slate-900 transition-all duration-300";
  const buttonStyle = twMerge(buttonBase, buttonVariant);

  return (
    <button onClick={handleLogout} className={buttonStyle} disabled={loading}>
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
