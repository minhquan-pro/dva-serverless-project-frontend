import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { loginRequest, registerRequest } from "../services/authService";
import type { AuthUser, LoginPayload, RegisterPayload } from "../types/auth";

const STORAGE_KEY = "breakfast-shop-auth";

interface StoredSession {
  token: string;
  user: AuthUser;
}

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredSession(): StoredSession | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredSession;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StoredSession | null>(() => readStoredSession());

  useEffect(() => {
    if (session) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  async function login(payload: LoginPayload) {
    const response = await loginRequest(payload);
    setSession(response);
  }

  async function register(payload: RegisterPayload) {
    const response = await registerRequest(payload);
    setSession(response);
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider
      value={{ user: session?.user ?? null, isAuthenticated: session !== null, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
