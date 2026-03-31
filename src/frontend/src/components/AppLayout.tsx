import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BarChart2,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";
import { useApp } from "../context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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
    ],
  },
  {
    label: "INSIGHTS",
    items: [{ label: "Reports", path: "/reports", icon: BarChart2 }],
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
  "/settings": "Settings",
  "/admin": "Admin Panel",
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
  } = useApp();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const currentTenant = tenants.find((t) => t.id === currentTenantId);
  const pageTitle = PAGE_TITLES[pathname] ?? "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close sidebar on navigation
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
              <div className="text-xs font-semibold leading-tight">
                Booked Ranked
              </div>
              <div className="text-xs text-indigo-300 leading-tight">
                Fundable
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={closeSidebar}
            className="md:hidden p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {isAdminUser && (
          <div className="mb-4">
            <p className="text-xs text-slate-500 font-semibold px-2 mb-1">
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
          </div>
        )}

        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="mb-4">
            <p className="text-xs text-slate-500 font-semibold px-2 mb-1">
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
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
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

      <div className="p-3 border-t border-slate-700">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="text-xs font-medium text-white truncate">
              {currentUser?.name}
            </p>
            <p className="text-xs text-slate-400 capitalize">
              {currentUser?.isAdminUser ? "Super Admin" : currentUser?.role}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="nav.logout.button"
            className="p-1.5 rounded hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
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
            <h1 className="text-lg font-semibold text-gray-800">{pageTitle}</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAdmin ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  data-ocid="nav.tenant.select"
                  className="flex items-center gap-1.5 text-sm bg-gray-100 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <span className="font-medium text-gray-700 max-w-[120px] truncate">
                    {currentTenant?.name}
                  </span>
                  <ChevronDown size={14} className="text-gray-500" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {tenants.map((t) => (
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
                {currentTenant?.name}
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
