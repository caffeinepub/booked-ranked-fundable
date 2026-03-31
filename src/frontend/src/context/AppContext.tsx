import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TENANTS } from "../data/demoData";

interface AppUser {
  name: string;
  role: "agency" | "client";
  isAdminUser: boolean;
}

export interface TenantEntry {
  id: string;
  name: string;
  phone: string;
  website: string;
  address: string;
  type: string;
}

interface AppContextType {
  currentTenantId: string;
  setCurrentTenantId: (id: string) => void;
  isAdmin: boolean;
  isAdminUser: boolean;
  currentUser: AppUser | null;
  isLoggedIn: boolean;
  login: (
    role: "agency" | "client",
    tenantId: string,
    adminUser?: boolean,
  ) => void;
  logout: () => void;
  tenants: TenantEntry[];
  addTenant: (tenant: TenantEntry) => void;
  deleteTenant: (id: string) => void;
  auditOverrides: Record<string, number>;
  fundabilityOverrides: Record<string, number>;
  setAuditOverride: (tenantId: string, score: number) => void;
  setFundabilityOverride: (tenantId: string, score: number) => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadFromSession<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    // ignore
  }
  return fallback;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentTenantId, setCurrentTenantIdState] = useState<string>(() =>
    loadFromSession("brfTenantId", "tenant-oceanside"),
  );
  const [currentUser, setCurrentUser] = useState<AppUser | null>(() =>
    loadFromSession<AppUser | null>("brfUser", null),
  );
  const [tenants, setTenants] = useState<TenantEntry[]>(TENANTS);
  const [auditOverrides, setAuditOverrides] = useState<Record<string, number>>(
    {},
  );
  const [fundabilityOverrides, setFundabilityOverrides] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    sessionStorage.setItem("brfUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    sessionStorage.setItem("brfTenantId", currentTenantId);
  }, [currentTenantId]);

  const setCurrentTenantId = (id: string) => setCurrentTenantIdState(id);

  const login = (
    role: "agency" | "client",
    tenantId: string,
    adminUser = false,
  ) => {
    setCurrentUser({
      name: adminUser
        ? "Admin333"
        : role === "agency"
          ? "Agency Admin"
          : "Business Owner",
      role,
      isAdminUser: adminUser,
    });
    setCurrentTenantIdState(tenantId);
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("brfUser");
    sessionStorage.removeItem("brfTenantId");
  };

  const addTenant = (tenant: TenantEntry) => {
    setTenants((prev) => [...prev, tenant]);
  };

  const deleteTenant = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  };

  const setAuditOverride = (tenantId: string, score: number) => {
    setAuditOverrides((prev) => ({ ...prev, [tenantId]: score }));
  };

  const setFundabilityOverride = (tenantId: string, score: number) => {
    setFundabilityOverrides((prev) => ({ ...prev, [tenantId]: score }));
  };

  return (
    <AppContext.Provider
      value={{
        currentTenantId,
        setCurrentTenantId,
        isAdmin: currentUser?.role === "agency",
        isAdminUser: currentUser?.isAdminUser === true,
        currentUser,
        isLoggedIn: currentUser !== null,
        login,
        logout,
        tenants,
        addTenant,
        deleteTenant,
        auditOverrides,
        fundabilityOverrides,
        setAuditOverride,
        setFundabilityOverride,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
