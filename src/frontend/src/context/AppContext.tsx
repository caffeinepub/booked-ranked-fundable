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
  assignedPhoneNumber?: string;
  phoneNumberType?: "new" | "port" | "forward" | null;
  phoneNumberStatus?: "active" | "pending" | "not_assigned";
  areaCode?: string;
  portingNumber?: string;
  forwardingFromNumber?: string;
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

export interface ListingConfig {
  googleUrl: string;
  yelpUrl: string;
  facebookUrl: string;
  bingUrl: string;
}

export interface AiProviderConfig {
  provider: string;
  apiKey: string;
  model: string;
}

export interface DemoInfo {
  firstName: string;
  businessName: string;
  niche: string;
  city: string;
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
  loginDemo: (info: DemoInfo) => void;
  logout: () => void;
  tenants: TenantEntry[];
  addTenant: (tenant: TenantEntry) => void;
  deleteTenant: (id: string) => void;
  updateTenantPhone: (
    tenantId: string,
    fields: Partial<
      Pick<
        TenantEntry,
        | "assignedPhoneNumber"
        | "phoneNumberType"
        | "phoneNumberStatus"
        | "areaCode"
        | "portingNumber"
        | "forwardingFromNumber"
      >
    >,
  ) => void;
  auditOverrides: Record<string, number>;
  fundabilityOverrides: Record<string, number>;
  setAuditOverride: (tenantId: string, score: number) => void;
  setFundabilityOverride: (tenantId: string, score: number) => void;
  notifications: Notification[];
  markAllRead: () => void;
  markRead: (id: string) => void;
  aiPanelOpen: boolean;
  setAiPanelOpen: (v: boolean) => void;
  socialMediaEnabled: Record<string, boolean>;
  setSocialMediaEnabledForTenant: (tenantId: string, enabled: boolean) => void;
  aiProviderConfig: AiProviderConfig;
  setAiProviderConfig: (config: AiProviderConfig) => void;
  listingConfigs: Record<string, ListingConfig>;
  setListingConfig: (tenantId: string, config: ListingConfig) => void;
  campaignToggles: Record<string, Record<string, boolean>>;
  setCampaignToggle: (
    tenantId: string,
    campaignId: string,
    enabled: boolean,
  ) => void;
  // Demo mode
  isDemoMode: boolean;
  demoInfo: DemoInfo | null;
  // Onboarding
  onboardingComplete: Record<string, boolean>;
  markOnboardingComplete: (tenantId: string) => void;
  resetOnboarding: (tenantId: string) => void;
  agencyOnboardingComplete: boolean;
  markAgencyOnboardingComplete: () => void;
  resetAgencyOnboarding: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

function loadFromSession<T>(key: string, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* ignore */
  }
  return fallback;
}

function loadFromLocal<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {
    /* ignore */
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
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const [socialMediaEnabled, setSocialMediaEnabled] = useState<
    Record<string, boolean>
  >(() => loadFromLocal("brfSocialMedia", {}));
  const [aiProviderConfig, setAiProviderConfigState] =
    useState<AiProviderConfig>(() =>
      loadFromLocal("brfAiProvider", {
        provider: "openai",
        apiKey: "",
        model: "gpt-4o",
      }),
    );
  const [listingConfigs, setListingConfigsState] = useState<
    Record<string, ListingConfig>
  >(() => loadFromLocal("brfListings", {}));
  const [campaignToggles, setCampaignTogglesState] = useState<
    Record<string, Record<string, boolean>>
  >(() => {
    try {
      const r = localStorage.getItem("brfCampaignToggles");
      if (r) return JSON.parse(r);
    } catch {}
    return {};
  });
  const [demoInfo, setDemoInfo] = useState<DemoInfo | null>(() =>
    loadFromSession<DemoInfo | null>("brfDemo", null),
  );

  // Onboarding state
  const [onboardingComplete, setOnboardingComplete] = useState<
    Record<string, boolean>
  >(() => loadFromLocal("brfOnboarding", {}));
  const [agencyOnboardingComplete, setAgencyOnboardingComplete] =
    useState<boolean>(() => loadFromLocal("brfAgencyOnboarding", false));

  useEffect(() => {
    sessionStorage.setItem("brfUser", JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    sessionStorage.setItem("brfTenantId", currentTenantId);
  }, [currentTenantId]);
  useEffect(() => {
    localStorage.setItem("brfSocialMedia", JSON.stringify(socialMediaEnabled));
  }, [socialMediaEnabled]);
  useEffect(() => {
    localStorage.setItem("brfAiProvider", JSON.stringify(aiProviderConfig));
  }, [aiProviderConfig]);
  useEffect(() => {
    localStorage.setItem("brfListings", JSON.stringify(listingConfigs));
  }, [listingConfigs]);
  useEffect(() => {
    sessionStorage.setItem("brfDemo", JSON.stringify(demoInfo));
  }, [demoInfo]);
  useEffect(() => {
    localStorage.setItem("brfCampaignToggles", JSON.stringify(campaignToggles));
  }, [campaignToggles]);
  useEffect(() => {
    localStorage.setItem("brfOnboarding", JSON.stringify(onboardingComplete));
  }, [onboardingComplete]);
  useEffect(() => {
    localStorage.setItem(
      "brfAgencyOnboarding",
      JSON.stringify(agencyOnboardingComplete),
    );
  }, [agencyOnboardingComplete]);

  const setCampaignToggle = (
    tenantId: string,
    campaignId: string,
    enabled: boolean,
  ) => {
    setCampaignTogglesState((prev) => ({
      ...prev,
      [tenantId]: { ...(prev[tenantId] ?? {}), [campaignId]: enabled },
    }));
  };
  const setCurrentTenantId = (id: string) => setCurrentTenantIdState(id);

  const login = (
    role: "agency" | "client",
    tenantId: string,
    adminUser = false,
  ) => {
    setDemoInfo(null);
    sessionStorage.removeItem("brfDemo");
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

  const loginDemo = (info: DemoInfo) => {
    setDemoInfo(info);
    // Update the tenant-demo entry with their business name
    setTenants((prev) =>
      prev.map((t) =>
        t.id === "tenant-demo"
          ? {
              ...t,
              name: info.businessName,
              type: info.niche,
              address: `${info.city}`,
            }
          : t,
      ),
    );
    setCurrentUser({
      name: info.firstName,
      role: "client",
      isAdminUser: false,
    });
    setCurrentTenantIdState("tenant-demo");
  };

  const logout = () => {
    setCurrentUser(null);
    setDemoInfo(null);
    sessionStorage.removeItem("brfUser");
    sessionStorage.removeItem("brfTenantId");
    sessionStorage.removeItem("brfDemo");
  };

  const addTenant = (tenant: TenantEntry) => {
    setTenants((prev) => [...prev, tenant]);
  };
  const deleteTenant = (id: string) => {
    setTenants((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTenantPhone = (
    tenantId: string,
    fields: Partial<
      Pick<
        TenantEntry,
        | "assignedPhoneNumber"
        | "phoneNumberType"
        | "phoneNumberStatus"
        | "areaCode"
        | "portingNumber"
        | "forwardingFromNumber"
      >
    >,
  ) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === tenantId ? { ...t, ...fields } : t)),
    );
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
  const setSocialMediaEnabledForTenant = (
    tenantId: string,
    enabled: boolean,
  ) => {
    setSocialMediaEnabled((prev) => ({ ...prev, [tenantId]: enabled }));
  };
  const setAiProviderConfig = (config: AiProviderConfig) => {
    setAiProviderConfigState(config);
  };
  const setListingConfig = (tenantId: string, config: ListingConfig) => {
    setListingConfigsState((prev) => ({ ...prev, [tenantId]: config }));
  };

  // Onboarding handlers
  const markOnboardingComplete = (tenantId: string) => {
    setOnboardingComplete((prev) => ({ ...prev, [tenantId]: true }));
  };
  const resetOnboarding = (tenantId: string) => {
    setOnboardingComplete((prev) => {
      const next = { ...prev };
      delete next[tenantId];
      return next;
    });
  };
  const markAgencyOnboardingComplete = () => {
    setAgencyOnboardingComplete(true);
  };
  const resetAgencyOnboarding = () => {
    setAgencyOnboardingComplete(false);
  };

  const isDemoMode = demoInfo !== null && currentTenantId === "tenant-demo";

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
        loginDemo,
        logout,
        tenants,
        addTenant,
        deleteTenant,
        updateTenantPhone,
        auditOverrides,
        fundabilityOverrides,
        setAuditOverride,
        setFundabilityOverride,
        notifications,
        markAllRead,
        markRead,
        aiPanelOpen,
        setAiPanelOpen,
        socialMediaEnabled,
        setSocialMediaEnabledForTenant,
        aiProviderConfig,
        setAiProviderConfig,
        listingConfigs,
        setListingConfig,
        campaignToggles,
        setCampaignToggle,
        isDemoMode,
        demoInfo,
        onboardingComplete,
        markOnboardingComplete,
        resetOnboarding,
        agencyOnboardingComplete,
        markAgencyOnboardingComplete,
        resetAgencyOnboarding,
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
