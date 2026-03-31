import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import AppLayout from "./components/AppLayout";
import { Toaster } from "./components/ui/sonner";
import { AppProvider, useApp } from "./context/AppContext";
import AdminPage from "./pages/AdminPage";
import AuditPage from "./pages/AuditPage";
import ChatWidgetPage from "./pages/ChatWidgetPage";
import DashboardPage from "./pages/DashboardPage";
import FreeAuditPage from "./pages/FreeAuditPage";
import FundabilityPage from "./pages/FundabilityPage";
import HomePage from "./pages/HomePage";
import LeadsPage from "./pages/LeadsPage";
import LoginPage from "./pages/LoginPage";
import ReportsPage from "./pages/ReportsPage";
import ReviewRequestsPage from "./pages/ReviewRequestsPage";
import ReviewsPage from "./pages/ReviewsPage";
import SettingsPage from "./pages/SettingsPage";
import VoiceAgentPage from "./pages/VoiceAgentPage";

function ProtectedRoute({
  children,
  adminOnly = false,
}: {
  children: React.ReactNode;
  adminOnly?: boolean;
}) {
  const { isLoggedIn, isAdminUser } = useApp();
  if (!isLoggedIn) {
    window.location.replace("/login");
    return null;
  }
  if (adminOnly && !isAdminUser) {
    window.location.replace("/dashboard");
    return null;
  }
  return <AppLayout>{children}</AppLayout>;
}

const rootRoute = createRootRoute({
  component: () => (
    <AppProvider>
      <Outlet />
      <Toaster />
    </AppProvider>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const freeAuditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/free-audit",
  component: FreeAuditPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
});

const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/leads",
  component: () => (
    <ProtectedRoute>
      <LeadsPage />
    </ProtectedRoute>
  ),
});

const reviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reviews",
  component: () => (
    <ProtectedRoute>
      <ReviewsPage />
    </ProtectedRoute>
  ),
});

const auditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/audit",
  component: () => (
    <ProtectedRoute>
      <AuditPage />
    </ProtectedRoute>
  ),
});

const fundabilityRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fundability",
  component: () => (
    <ProtectedRoute>
      <FundabilityPage />
    </ProtectedRoute>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reports",
  component: () => (
    <ProtectedRoute>
      <ReportsPage />
    </ProtectedRoute>
  ),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => (
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <ProtectedRoute adminOnly>
      <AdminPage />
    </ProtectedRoute>
  ),
});

const chatWidgetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat-widget",
  component: () => (
    <ProtectedRoute>
      <ChatWidgetPage />
    </ProtectedRoute>
  ),
});

const voiceAgentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/voice-agent",
  component: () => (
    <ProtectedRoute>
      <VoiceAgentPage />
    </ProtectedRoute>
  ),
});

const reviewRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/review-requests",
  component: () => (
    <ProtectedRoute>
      <ReviewRequestsPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  freeAuditRoute,
  dashboardRoute,
  leadsRoute,
  reviewsRoute,
  auditRoute,
  fundabilityRoute,
  reportsRoute,
  settingsRoute,
  adminRoute,
  chatWidgetRoute,
  voiceAgentRoute,
  reviewRequestsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
