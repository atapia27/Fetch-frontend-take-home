import { useState } from "react";
import { useLogin as useLoginAction } from "@/(features)/auth/store/authStore";
import { useRouter } from "next/router";

export function useLogin() {
  /** --- State Management --- **/
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /** --- Authentication Logic --- **/
  const login = useLoginAction();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const success = await login(name, email);
    if (success) {
      router.push("/search");
    } else {
      setError("Login failed. Please check your credentials.");
    }

    setLoading(false);
  };

  /** --- Expose Hook State & Actions --- **/
  return {
    name,
    setName,
    email,
    setEmail,
    loading,
    error,
    handleLogin,
  };
}
