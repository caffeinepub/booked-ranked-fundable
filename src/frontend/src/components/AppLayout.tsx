import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart2,
  Bell,
  Bot,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  MessageSquare,
  Phone,
  Rocket,
  Search,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { useApp } from "../context/AppContext";
import type { Notification } from "../context/AppContext";
import AiBusinessManagerPanel from "./AiBusinessManagerPanel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";

const NAV_GROUPS = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", path: "/dashboard", icon: LayoutDashboard }],
  },
  {
    label: "GROWTH ENGINES",
    items: [
      { label: "Leads", path: "/leads", icon: Users },
      { label: "Reviews", path: "/reviews", icon: Star },
      { label: "SEO Audit", path: "/audit", icon: Search },
      { label: "Fundability", path: "/fundability", icon: TrendingUp },
      { label: "Chat Widget", path: "/chat-widget", icon: MessageSquare },
      { label: "Voice Agent", path: "/voice-agent", icon: Phone },
      { label: "Review Requests", path: "/review-requests", icon: Send },
      { label: "Campaigns", path: "/campaigns", icon: Megaphone },
    ],
  },
  {
    label: "AGENT SERVICES",
    items: [{ label: "My Agents", path: "/agent-services", icon: Bot }],
  },
  {
    label: "LISTINGS & SOCIAL",
    items: [
      { label: "Listings", path: "/listings", icon: MapPin },
      { label: "Social Media", path: "/social-media", icon: Share2 },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { label: "Reports", path: "/reports", icon: BarChart2 },
      { label: "Analytics", path: "/analytics", icon: Activity },
    ],
  },
  {
    label: "ACCOUNT",
    items: [{ label: "Settings", path: "/settings", icon: Settings }],
  },
];

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/leads": "Leads & CRM",
  "/reviews": "Reviews & Reputation",
  "/audit": "SEO Audit",
  "/fundability": "Fundability Score",
  "/reports": "Reports",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/admin": "Admin Panel",
  "/admin-agents": "Agent Services — Admin",
  "/agent-services": "Agent Services",
  "/chat-widget": "Chat Widget",
  "/voice-agent": "Voice Agent",
  "/review-requests": "Review Requests",
  "/listings": "Listings Monitor",
  "/social-media": "Social Media",
  "/campaigns": "Campaigns",
};

const TYPE_ICONS: Record<Notification["type"], ReactNode> = {
  lead: <Users size={14} className="text-blue-500" />,
  review: <Star size={14} className="text-amber-500" />,
  audit: <Search size={14} className="text-emerald-500" />,
  uptime: <Activity size={14} className="text-purple-500" />,
  general: <Bell size={14} className="text-gray-200" />,
};

export default function AppLayout({ children }: { children: ReactNode }) {
  const {
    currentTenantId,
    setCurrentTenantId,
    isAdmin,
    isAdminUser,
    currentUser,
    logout,
    tenants,
    notifications,
    markAllRead,
    markRead,
    setAiPanelOpen,
    isDemoMode,
    demoInfo,
  } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const currentTenant = tenants.find((t) => t.id === currentTenantId);
  const displayName =
    isDemoMode && demoInfo ? demoInfo.businessName : currentTenant?.name;
  const pageTitle = PAGE_TITLES[pathname] ?? "";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [demoBannerDismissed, setDemoBannerDismissed] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const mainScrollRef = useRef<HTMLElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  const closeSidebar = () => setSidebarOpen(false);

  const SidebarContent = () => (
    <>
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-sm">
              BRF
            </div>
            <div>
              <div className="text-xs font-semibold leading-tight truncate max-w-[110px]">
                {isDemoMode && demoInfo
                  ? demoInfo.businessName
                  : "Booked Ranked"}
              </div>
              <div className="text-xs text-indigo-300 leading-tight">
                {isDemoMode ? (
                  <span className="text-amber-400">Demo Mode</span>
                ) : (
                  "Fundable"
                )}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeSidebar}
            className="md:hidden p-1.5 rounded hover:bg-slate-700 text-slate-200 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {isAdminUser && (
          <div className="mb-4">
            <p className="text-xs text-slate-200 font-semibold px-2 mb-1">
              ADMIN
            </p>
            <Link
              to="/admin"
              data-ocid="nav.admin.link"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                pathname === "/admin"
                  ? "bg-amber-500 text-white"
                  : "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              }`}
            >
              <ShieldCheck size={16} />
              Admin Panel
            </Link>
            <Link
              to="/admin-agents"
              data-ocid="nav.adminagents.link"
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                pathname === "/admin-agents"
                  ? "bg-amber-500 text-white"
                  : "text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
              }`}
            >
              <Bot size={16} />
              Agent Services
            </Link>
          </div>
        )}

        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-xs text-slate-200 font-semibold px-2 mb-1">
              {group.label}
            </p>
            {group.items.map(({ label, path, icon: Icon }) => {
              const active = pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  data-ocid={`nav.${label.toLowerCase().replace(/[^a-z0-9]/g, "")}.link`}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-200 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-slate-700 space-y-2">
        <button
          type="button"
          data-ocid="nav.ai.button"
          onClick={() => setAiPanelOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm bg-indigo-900/60 hover:bg-indigo-700 text-indigo-300 hover:text-white transition-colors border border-indigo-700/50"
        >
          <Sparkles size={15} className="text-indigo-400" />
          <span className="text-xs font-medium">AI Business Manager</span>
        </button>

        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {isDemoMode && demoInfo ? demoInfo.firstName : currentUser?.name}
            </p>
            <p className="text-xs text-slate-200 capitalize">
              {isDemoMode
                ? "Demo User"
                : currentUser?.isAdminUser
                  ? "Super Admin"
                  : currentUser?.role}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="nav.logout.button"
            className="p-1.5 rounded hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Demo Mode Banner */}
      {isDemoMode && !demoBannerDismissed && (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 flex items-center justify-between flex-shrink-0 z-50">
          <div className="flex items-center gap-2 text-sm">
            <Rocket size={14} className="text-purple-200 shrink-0" />
            <span className="font-medium">Demo Mode</span>
            <span className="text-purple-200 hidden sm:inline">
              — You’re exploring a live simulation for{" "}
              <strong className="text-white">{demoInfo?.businessName}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/pricing"
              className="text-xs bg-white text-purple-700 font-semibold px-3 py-1 rounded-full hover:bg-purple-50 transition-colors whitespace-nowrap"
            >
              Activate for My Business
            </Link>
            <button
              type="button"
              onClick={() => setDemoBannerDismissed(true)}
              className="text-purple-200 hover:text-white"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 flex-shrink-0 bg-slate-900 text-white flex-col">
          <SidebarContent />
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <button
              type="button"
              aria-label="Close sidebar"
              className="absolute inset-0 bg-black/60 backdrop-blur-sm w-full h-full cursor-default border-0"
              onClick={closeSidebar}
            />
            <aside className="relative z-10 w-64 flex-shrink-0 bg-slate-900 text-white flex flex-col h-full shadow-2xl">
              <SidebarContent />
            </aside>
          </div>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <button
                type="button"
                data-ocid="nav.menu.button"
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600"
                aria-label="Open menu"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-lg font-semibold text-gray-800">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && !isDemoMode ? (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    data-ocid="nav.tenant.select"
                    className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <span className="font-medium text-gray-700 max-w-[120px] truncate">
                      {displayName}
                    </span>
                    <ChevronDown size={14} className="text-gray-200" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {tenants
                      .filter((t) => t.id !== "tenant-demo")
                      .map((t) => (
                        <DropdownMenuItem
                          key={t.id}
                          onClick={() => setCurrentTenantId(t.id)}
                        >
                          {t.name}
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <span className="text-sm text-gray-600 font-medium max-w-[140px] truncate">
                  {displayName}
                </span>
              )}

              {/* Notification Bell */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    data-ocid="notifications.bell"
                    className="relative p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-80 p-0"
                  data-ocid="notifications.popover"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-800">
                      Notifications
                    </h3>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        data-ocid="notifications.mark_all_read"
                        onClick={markAllRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <ScrollArea className="max-h-80">
                    {notifications.length === 0 ? (
                      <div className="px-4 py-8 text-center text-sm text-gray-200">
                        No notifications
                      </div>
                    ) : (
                      <div>
                        {notifications.map((n) => (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => markRead(n.id)}
                            className="w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                          >
                            <div className="mt-0.5 shrink-0">
                              {TYPE_ICONS[n.type]}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5">
                                <p className="text-xs font-semibold text-gray-800">
                                  {n.title}
                                </p>
                                {!n.read && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                )}
                              </div>
                              <p className="text-xs text-gray-200 mt-0.5 truncate">
                                {n.message}
                              </p>
                              <p className="text-[10px] text-gray-200 mt-1">
                                {n.time}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </header>

          <main
            ref={mainScrollRef}
            className="flex-1 overflow-y-auto p-4 md:p-6"
          >
            {children}
          </main>
        </div>
      </div>

      {/* AI Business Manager Panel */}
      <AiBusinessManagerPanel />
    </div>
  );
}
