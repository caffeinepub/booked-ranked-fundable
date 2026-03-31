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
import AnalyticsPage from "./pages/AnalyticsPage";
import AuditPage from "./pages/AuditPage";
import CarpetCleaningPage from "./pages/CarpetCleaningPage";
import ChatWidgetPage from "./pages/ChatWidgetPage";
import DashboardPage from "./pages/DashboardPage";
import DemoPage from "./pages/DemoPage";
import FreeAuditPage from "./pages/FreeAuditPage";
import FundabilityPage from "./pages/FundabilityPage";
import HVACPage from "./pages/HVACPage";
import HomePage from "./pages/HomePage";
import LeadsPage from "./pages/LeadsPage";
import ListingsPage from "./pages/ListingsPage";
import LoginPage from "./pages/LoginPage";
import MedSpaPage from "./pages/MedSpaPage";
import PlumbingPage from "./pages/PlumbingPage";
import PricingPage from "./pages/PricingPage";
import ReportsPage from "./pages/ReportsPage";
import RestorationPage from "./pages/RestorationPage";
import ReviewRequestsPage from "./pages/ReviewRequestsPage";
import ReviewsPage from "./pages/ReviewsPage";
import RoofingPage from "./pages/RoofingPage";
import SettingsPage from "./pages/SettingsPage";
import SocialMediaPage from "./pages/SocialMediaPage";
import VoiceAgentPage from "./pages/VoiceAgentPage";
import WhyUsPage from "./pages/WhyUsPage";

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

const demoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/demo",
  component: DemoPage,
});

const whyUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/why-us",
  component: WhyUsPage,
});

// Niche pages
const plumbingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plumbing",
  component: PlumbingPage,
});

const restorationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/restoration",
  component: RestorationPage,
});

const hvacRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hvac",
  component: HVACPage,
});

const carpetCleaningRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/carpet-cleaning",
  component: CarpetCleaningPage,
});

const roofingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/roofing",
  component: RoofingPage,
});

const medSpaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/med-spa",
  component: MedSpaPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: PricingPage,
});

// Protected routes
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

const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/analytics",
  component: () => (
    <ProtectedRoute>
      <AnalyticsPage />
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

const listingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/listings",
  component: () => (
    <ProtectedRoute>
      <ListingsPage />
    </ProtectedRoute>
  ),
});

const socialMediaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/social-media",
  component: () => (
    <ProtectedRoute>
      <SocialMediaPage />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  freeAuditRoute,
  demoRoute,
  whyUsRoute,
  // Marketing / niche pages
  plumbingRoute,
  restorationRoute,
  hvacRoute,
  carpetCleaningRoute,
  roofingRoute,
  medSpaRoute,
  pricingRoute,
  // Protected app routes
  dashboardRoute,
  leadsRoute,
  reviewsRoute,
  auditRoute,
  fundabilityRoute,
  reportsRoute,
  analyticsRoute,
  settingsRoute,
  adminRoute,
  chatWidgetRoute,
  voiceAgentRoute,
  reviewRequestsRoute,
  listingsRoute,
  socialMediaRoute,
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
