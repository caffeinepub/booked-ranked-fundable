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

export interface Notification {
  id: string;
  type: "lead" | "review" | "audit" | "uptime" | "general";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const DEMO_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "lead",
    title: "New Lead",
    message: "Maria Gonzalez submitted a contact form",
    time: "5 min ago",
    read: false,
  },
  {
    id: "n2",
    type: "review",
    title: "New Review",
    message: "Kevin R. left a 5★ review on Google",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "n3",
    type: "audit",
    title: "Audit Score Improved",
    message: "SEO score increased from 68 to 72 this week",
    time: "Yesterday",
    read: false,
  },
  {
    id: "n4",
    type: "uptime",
    title: "Uptime Alert Cleared",
    message: "Website returned to normal — was down for 3 minutes",
    time: "2 days ago",
    read: true,
  },
  {
    id: "n5",
    type: "general",
    title: "Review Request Sent",
    message: "Review request sent to 3 customers via SMS",
    time: "3 days ago",
    read: true,
  },
];

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
  notifications: Notification[];
  markAllRead: () => void;
  markRead: (id: string) => void;
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
  const [notifications, setNotifications] =
    useState<Notification[]>(DEMO_NOTIFICATIONS);

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

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
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
        notifications,
        markAllRead,
        markRead,
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
