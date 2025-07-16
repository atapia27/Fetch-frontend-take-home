import { useState } from "react";
import { useLogout as useLogoutAction } from "@/(features)/auth/store/authStore";
import { useRouter } from "next/router";

export function useLogout() {
  /** --- State Management --- **/
  const [loading, setLoading] = useState(false);

  /** --- Authentication Logic --- **/
  const logout = useLogoutAction();
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
