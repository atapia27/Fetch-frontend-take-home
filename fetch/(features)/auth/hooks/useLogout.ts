import { useState } from "react";
import { useAuthStore } from "@/(features)/auth/store/authStore";
import { useRouter } from "next/router";

export function useLogout() {
  /** --- State Management --- **/
  const [loading, setLoading] = useState(false);

  /** --- Authentication Logic --- **/
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    router.push("/"); // Redirect to login page after logout
    setLoading(false);
  };

  /** --- Expose Hook State & Actions --- **/
  return {
    handleLogout,
    loading,
  };
}
