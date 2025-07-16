/**
 * Dont need to keep name or email info
 *
 *
 * Authentication must be inferred from:
 * - The presence of a valid session cookie (handled by the browser automatically).
 * - A previously authenticated session stored in Zustand's persist middleware.
 *
 * Infer Authentication on Page Load
 * - Zustand's persist middleware will remember isAuthenticated between reloads.
 * - However, this is not foolproof because cookies might expire while the state remains true.
 *
 * Ensure logout() Clears Authentication Properly
 * - We must reset isAuthenticated when a user logs out, ensuring a clean session.
 *
 *
 * According to instructions:
 *
 *  * " It's an HttpOnly cookie, so you will not be able to access this value from any Javascript code (nor should you need to).
 * Your browser will automatically send this cookie with all successive credentialed requests to the API.
 * Note that you will need to pass a config option in order to send credentials (cookies) with each request.
 * Some documentation to help you with this:
 *
 * Including credentials with fetch (set credentials: 'include' in request config)
 * Including credentials with axios (set withCredentials: true in request config) "
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const API_BASE_URL = "https://frontend-take-home-service.fetch.com/auth";

interface AuthState {
  isAuthenticated: boolean;
  login: (name: string, email: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

// Create the store without exporting it directly
const authStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,

      login: async (name, email) => {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/login`,
            { name, email },
            { withCredentials: true }, // Ensures auth cookie is sent
          );

          if (response.status === 200) {
            set({ isAuthenticated: true });
            return true;
          }
        } catch (error) {
          console.error("Login failed:", error);
        }
        return false;
      },

      logout: async () => {
        try {
          await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            { withCredentials: true },
          );
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          set({ isAuthenticated: false });
        }
      },
    }),
    { name: "auth-storage" },
  ),
);

// Atomic, stable selectors
const selectIsAuthenticated = (state: AuthState) => state.isAuthenticated;
const selectLogin = (state: AuthState) => state.login;
const selectLogout = (state: AuthState) => state.logout;

// Custom hooks that only export what's needed
export const useIsAuthenticated = () => authStore(selectIsAuthenticated);
export const useLogin = () => authStore(selectLogin);
export const useLogout = () => authStore(selectLogout);

// Hook for getting all auth state and actions
export const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const login = useLogin();
  const logout = useLogout();

  return {
    isAuthenticated,
    login,
    logout,
  };
};
