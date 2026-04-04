import { Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Building,
  MessageSquare,
  Plus,
  Search,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useApp } from "../context/AppContext";
import {
  AUDIT_SCORES,
  FUNDABILITY_SCORES,
  LEADS,
  REVIEWS,
} from "../data/demoData";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function DashboardPage() {
  const {
    currentTenantId,
    currentUser,
    auditOverrides,
    fundabilityOverrides,
    tenants,
    isDemoMode,
    demoInfo,
  } = useApp();
  const [greetingDismissed, setGreetingDismissed] = useState(false);

  const leads = LEADS[currentTenantId] ?? [];
  const reviews = REVIEWS[currentTenantId] ?? [];
  const auditScore =
    auditOverrides[currentTenantId] ??
    AUDIT_SCORES[currentTenantId]?.total ??
    0;
  const fundScore =
    fundabilityOverrides[currentTenantId] ??
    FUNDABILITY_SCORES[currentTenantId] ??
    0;
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

  const openLeads = leads.filter(
    (l) => l.status === "new" || l.status === "contacted",
  ).length;
  const reviewsThisMonth = reviews.filter(() => true).length;
  const newLeads = leads.filter((l) => l.status === "new").length;

  const KPI_CARDS = [
    {
      title: "Total Leads",
      value: leads.length,
      icon: Users,
      color: "border-blue-500",
      sub: `${newLeads} new this week`,
    },
    {
      title: "Avg Rating",
      value: avgRating,
      icon: Star,
      color: "border-amber-400",
      sub: `${reviews.length} total reviews`,
    },
    {
      title: "SEO Audit Score",
      value: `${auditScore}/100`,
      icon: Search,
      color: "border-emerald-500",
      sub: auditScore >= 70 ? "Good standing" : "Needs improvement",
    },
    {
      title: "Fundability Score",
      value: `${fundScore}/100`,
      icon: TrendingUp,
      color: "border-purple-500",
      sub:
        fundScore >= 70 ? "Bankable" : fundScore >= 40 ? "Builder" : "Starter",
    },
    {
      title: "Active Clients",
      value: tenants.length,
      icon: Building,
      color: "border-indigo-500",
      sub: "Managed businesses",
    },
  ];

  const recentActivity = [
    ...leads.slice(0, 3).map((l) => ({
      type: "lead",
      name: l.name,
      action: `New lead — ${l.source}`,
      time: "Today",
    })),
    ...reviews.slice(0, 2).map((r) => ({
      type: "review",
      name: r.author,
      action: `${r.rating}\u2605 review on ${r.platform}`,
      time: "This week",
    })),
  ];

  // Build AI greeting message
  const buildGreeting = () => {
    const greeting = getGreeting();
    if (isDemoMode && demoInfo) {
      return {
        title: `${greeting}, ${demoInfo.firstName}.`,
        message: `Here's a live simulation of ${demoInfo.businessName}'s dashboard on Booked, Ranked & Fundable. You have ${leads.length} simulated leads in your pipeline, ${newLeads} new this week, and ${reviews.length} customer reviews. Your ${demoInfo.niche} SEO audit score is ${auditScore}/100 and your fundability is at ${fundScore}/100. Explore each section to see how the full platform works for your business in ${demoInfo.city}.`,
        isDemo: true,
      };
    }
    if (currentUser && !currentUser.isAdminUser) {
      return {
        title: `${greeting}, ${currentUser.name}.`,
        message: `You have ${openLeads} open leads and ${newLeads} new ones this week. Your review average is ${avgRating}\u2605 and your SEO score is ${auditScore}/100. Here's what needs your attention today.`,
        isDemo: false,
      };
    }
    return null;
  };

  const greetingData = buildGreeting();

  return (
    <div className="space-y-6">
      {/* AI Greeting Panel */}
      {greetingData && !greetingDismissed && (
        <div
          className={`relative rounded-xl p-5 border ${
            greetingData.isDemo
              ? "bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border-purple-500/30"
              : "bg-gradient-to-r from-indigo-900/20 to-slate-900/20 border-indigo-200"
          }`}
        >
          <button
            type="button"
            onClick={() => setGreetingDismissed(true)}
            className="absolute top-3 right-3 text-gray-200 hover:text-gray-600"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                greetingData.isDemo ? "bg-purple-600/40" : "bg-indigo-100"
              }`}
            >
              <Sparkles
                size={18}
                className={
                  greetingData.isDemo ? "text-purple-300" : "text-indigo-600"
                }
              />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3
                className={`font-semibold text-base mb-1 ${
                  greetingData.isDemo ? "text-white" : "text-gray-900"
                }`}
              >
                {greetingData.title}
              </h3>
              <p
                className={`text-sm leading-relaxed ${
                  greetingData.isDemo ? "text-purple-200" : "text-gray-600"
                }`}
              >
                {greetingData.message}
              </p>
              {greetingData.isDemo && (
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-1 mt-3 text-xs bg-purple-600 hover:bg-purple-500 text-white px-3 py-1.5 rounded-full font-medium transition-colors"
                >
                  Activate for My Business <ArrowRight size={11} />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          {isDemoMode && demoInfo ? demoInfo.businessName : "Dashboard"}
        </h2>
        <p className="text-gray-200 text-sm mt-1">
          {isDemoMode
            ? `${demoInfo?.niche} business simulation — ${demoInfo?.city}`
            : "Here's what's happening with your business today."}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {KPI_CARDS.map(({ title, value, icon: Icon, color, sub }) => (
          <Card key={title} className={`border-t-4 ${color} shadow-sm`}>
            <CardHeader className="pb-1 pt-4 px-4">
              <CardTitle className="text-xs font-medium text-gray-200 flex items-center justify-between">
                {title}
                <Icon size={16} className="text-gray-200" />
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-200 mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats Row */}
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
          <Activity size={12} className="text-gray-200" />
          Last audit: 3 days ago
        </span>
        <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full">
          <Star size={12} className="text-amber-400" />
          Reviews this month: {reviewsThisMonth}
        </span>
        <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1.5 rounded-full">
          <Users size={12} className="text-blue-400" />
          Open leads: {openLeads}
        </span>
      </div>

      {/* Website Status Mini-Card */}
      <Link to="/analytics">
        <Card className="shadow-sm border border-emerald-100 bg-emerald-50/50 hover:border-emerald-200 transition-colors cursor-pointer">
          <CardContent className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Shield size={14} className="text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">
                  Online &middot; 99.7% uptime &middot; SSL valid
                </span>
              </div>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                View Analytics <ArrowRight size={12} />
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <div className="flex gap-3 flex-wrap">
        <Link to="/leads">
          <Button
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus size={14} className="mr-1" /> Add Lead
          </Button>
        </Link>
        <Link to="/reviews">
          <Button size="sm" variant="outline">
            <MessageSquare size={14} className="mr-1" /> Request Review
          </Button>
        </Link>
        <Link to="/audit">
          <Button size="sm" variant="outline">
            <Search size={14} className="mr-1" /> Run Audit
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Activity size={15} /> Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="space-y-3">
            {recentActivity.map((item) => (
              <div
                key={`${item.type}-${item.name}`}
                className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    item.type === "lead"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {item.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-200">{item.action}</p>
                </div>
                <span className="text-xs text-gray-200">{item.time}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100">
            <Link
              to="/analytics"
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
              data-ocid="dashboard.analytics.link"
            >
              View Analytics <ArrowRight size={12} />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
