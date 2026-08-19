import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginWithGoogleRequest } from "../services/authService";
import type { AuthUser, ProfileUpdate } from "../types/auth";

const STORAGE_KEY = "breakfast-shop-auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loginWithGoogle: () => Promise<void>;
  updateProfile: (updates: ProfileUpdate) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readStoredUser());

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  async function loginWithGoogle() {
    const profile = await loginWithGoogleRequest();
    setUser(profile);
  }

  function updateProfile(updates: ProfileUpdate) {
    setUser((current) => (current ? { ...current, ...updates } : current));
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: user !== null, loginWithGoogle, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
