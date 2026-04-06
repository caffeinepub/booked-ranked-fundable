import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  AGENT_PRODUCTS,
  type AgentServiceRequest,
  type AgentSubscription,
  type AgentTask,
  DEMO_AGENT_REQUESTS,
  DEMO_AGENT_SUBSCRIPTIONS,
  DEMO_AGENT_TASKS,
} from "../data/agentData";
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
  // Agent Services
  agentSubscriptions: AgentSubscription[];
  agentRequests: AgentServiceRequest[];
  agentTasks: AgentTask[];
  agentPricingOverrides: Record<string, number>;
  activateAgent: (
    tenantId: string,
    productId: string,
    withOversight?: boolean,
  ) => void;
  deactivateAgent: (subscriptionId: string) => void;
  pauseAgent: (subscriptionId: string) => void;
  resumeAgent: (subscriptionId: string) => void;
  submitAgentRequest: (
    req: Omit<AgentServiceRequest, "id" | "submittedAt" | "status">,
  ) => void;
  updateAgentTaskStatus: (taskId: string, status: AgentTask["status"]) => void;
  setAgentPriceOverride: (productId: string, price: number) => void;
  addAgentSubscriptionNote: (subscriptionId: string, note: string) => void;
  addOversight: (subscriptionId: string) => void;
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

  // Agent Services state
  const [agentSubscriptions, setAgentSubscriptions] = useState<
    AgentSubscription[]
  >(() => loadFromLocal("brfAgentSubscriptions", DEMO_AGENT_SUBSCRIPTIONS));
  const [agentRequests, setAgentRequests] = useState<AgentServiceRequest[]>(
    () => loadFromLocal("brfAgentRequests", DEMO_AGENT_REQUESTS),
  );
  const [agentTasks, setAgentTasks] = useState<AgentTask[]>(() =>
    loadFromLocal("brfAgentTasks", DEMO_AGENT_TASKS),
  );
  const [agentPricingOverrides, setAgentPricingOverridesState] = useState<
    Record<string, number>
  >(() => loadFromLocal("brfAgentPricing", {}));

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
  useEffect(() => {
    localStorage.setItem(
      "brfAgentSubscriptions",
      JSON.stringify(agentSubscriptions),
    );
  }, [agentSubscriptions]);
  useEffect(() => {
    localStorage.setItem("brfAgentRequests", JSON.stringify(agentRequests));
  }, [agentRequests]);
  useEffect(() => {
    localStorage.setItem("brfAgentTasks", JSON.stringify(agentTasks));
  }, [agentTasks]);
  useEffect(() => {
    localStorage.setItem(
      "brfAgentPricing",
      JSON.stringify(agentPricingOverrides),
    );
  }, [agentPricingOverrides]);

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

  // Agent Services handlers
  const activateAgent = (
    tenantId: string,
    productId: string,
    withOversight = false,
  ) => {
    // Bundle guard: auto-cancel individual seo/ads subs if activating bundle
    if (productId === "agent-bundle") {
      setAgentSubscriptions((prev) =>
        prev.map((s) =>
          s.tenantId === tenantId &&
          (s.productId === "agent-seo" || s.productId === "agent-ads") &&
          s.status !== "cancelled"
            ? { ...s, status: "cancelled" as const }
            : s,
        ),
      );
    }
    const product = AGENT_PRODUCTS.find((p) => p.id === productId);
    const tenant = tenants.find((t) => t.id === tenantId);
    const newSub: AgentSubscription = {
      id: `sub-${Date.now()}`,
      tenantId,
      productId,
      status: "active",
      activatedAt: Date.now(),
      hasOversight: withOversight,
      notes: "",
      nextDeliverable: "Initial setup and onboarding",
      currentWork: "Getting started — initial audit in progress",
    };
    setAgentSubscriptions((prev) => [...prev, newSub]);
    const notification = {
      id: `notif-agent-${Date.now()}`,
      type: "general" as const,
      title: "Agent Activated",
      message: `${product?.name ?? productId} activated for ${tenant?.name ?? tenantId}`,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  const deactivateAgent = (subscriptionId: string) => {
    setAgentSubscriptions((prev) =>
      prev.map((s) =>
        s.id === subscriptionId ? { ...s, status: "cancelled" as const } : s,
      ),
    );
  };

  const pauseAgent = (subscriptionId: string) => {
    setAgentSubscriptions((prev) =>
      prev.map((s) =>
        s.id === subscriptionId ? { ...s, status: "paused" as const } : s,
      ),
    );
  };

  const resumeAgent = (subscriptionId: string) => {
    setAgentSubscriptions((prev) =>
      prev.map((s) =>
        s.id === subscriptionId ? { ...s, status: "active" as const } : s,
      ),
    );
  };

  const submitAgentRequest = (
    req: Omit<AgentServiceRequest, "id" | "submittedAt" | "status">,
  ) => {
    const newReq: AgentServiceRequest = {
      ...req,
      id: `req-${Date.now()}`,
      submittedAt: Date.now(),
      status: "submitted",
    };
    setAgentRequests((prev) => [newReq, ...prev]);
  };

  const updateAgentTaskStatus = (
    taskId: string,
    status: AgentTask["status"],
  ) => {
    setAgentTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status,
              completedAt: status === "complete" ? Date.now() : t.completedAt,
            }
          : t,
      ),
    );
  };

  const setAgentPriceOverride = (productId: string, price: number) => {
    setAgentPricingOverridesState((prev) => ({ ...prev, [productId]: price }));
  };

  const addOversight = (subscriptionId: string) => {
    setAgentSubscriptions((prev) =>
      prev.map((s) =>
        s.id === subscriptionId ? { ...s, hasOversight: true } : s,
      ),
    );
    const sub = agentSubscriptions.find((s) => s.id === subscriptionId);
    const product = AGENT_PRODUCTS.find((p) => p.id === sub?.productId);
    const tenant = tenants.find((t) => t.id === sub?.tenantId);
    const newTask: AgentTask = {
      id: `task-oversight-${Date.now()}`,
      tenantId: sub?.tenantId ?? "",
      productId: sub?.productId ?? "",
      subscriptionId,
      title: `Human Oversight Upgrade — ${product?.name ?? "Agent"}`,
      description: `Client requested Human Oversight add-on for ${product?.name}. Schedule strategy onboarding call and assign dedicated strategist.`,
      type: "review",
      status: "pending",
      priority: "high",
      assignee: "Unassigned",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      createdAt: Date.now(),
      notes: "Auto-created from client Human Oversight activation",
      isClientRequest: true,
    };
    setAgentTasks((prev) => [newTask, ...prev]);
    const notification = {
      id: `notif-oversight-${Date.now()}`,
      type: "general" as const,
      title: "Human Oversight Activated",
      message: `${tenant?.name ?? "A client"} added Human Oversight to ${product?.name ?? "their agent"}`,
      time: "Just now",
      read: false,
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  const addAgentSubscriptionNote = (subscriptionId: string, note: string) => {
    setAgentSubscriptions((prev) =>
      prev.map((s) => (s.id === subscriptionId ? { ...s, notes: note } : s)),
    );
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
        agentSubscriptions,
        agentRequests,
        agentTasks,
        agentPricingOverrides,
        activateAgent,
        deactivateAgent,
        pauseAgent,
        resumeAgent,
        submitAgentRequest,
        updateAgentTaskStatus,
        setAgentPriceOverride,
        addAgentSubscriptionNote,
        addOversight,
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
