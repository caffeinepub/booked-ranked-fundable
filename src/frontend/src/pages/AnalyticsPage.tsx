import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { useApp } from "../context/AppContext";
import { AUDIT_SCORES } from "../data/demoData";

const trafficData = [
  { week: "Feb 3", sessions: 142, pageViews: 398, bounceRate: 52 },
  { week: "Feb 10", sessions: 168, pageViews: 441, bounceRate: 49 },
  { week: "Feb 17", sessions: 155, pageViews: 412, bounceRate: 51 },
  { week: "Feb 24", sessions: 189, pageViews: 503, bounceRate: 47 },
  { week: "Mar 3", sessions: 201, pageViews: 534, bounceRate: 45 },
  { week: "Mar 10", sessions: 224, pageViews: 587, bounceRate: 43 },
  { week: "Mar 17", sessions: 198, pageViews: 521, bounceRate: 46 },
  { week: "Mar 24", sessions: 237, pageViews: 621, bounceRate: 41 },
];

const leadSourceData = [
  { name: "Organic Search", value: 38 },
  { name: "Free Audit", value: 24 },
  { name: "Referral", value: 21 },
  { name: "Direct", value: 11 },
  { name: "Social", value: 6 },
];

const LEAD_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899"];

const auditHistoryData = [
  { week: "Week 1", score: 62 },
  { week: "Week 2", score: 65 },
  { week: "Week 3", score: 64 },
  { week: "Week 4", score: 68 },
  { week: "Week 5", score: 70 },
  { week: "Week 6", score: 72 },
];

const topPages = [
  { url: "/home", views: "1,204", avgTime: "2:34", bounceRate: "38%" },
  { url: "/services", views: "847", avgTime: "3:12", bounceRate: "29%" },
  { url: "/contact", views: "612", avgTime: "1:45", bounceRate: "44%" },
  { url: "/about", views: "389", avgTime: "2:01", bounceRate: "51%" },
  { url: "/free-audit", views: "298", avgTime: "4:22", bounceRate: "18%" },
];

export default function AnalyticsPage() {
  const { currentTenantId, auditOverrides } = useApp();
  const [copied, setCopied] = useState(false);
  const performanceScore =
    auditOverrides[currentTenantId] ??
    AUDIT_SCORES[currentTenantId]?.total ??
    72;

  const scriptTag = `<script src="https://track.bookedrankedfundable.com/pixel.js" data-site="${currentTenantId}" async></script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(scriptTag).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const STATUS_CARDS = [
    {
      label: "Website Uptime",
      value: "99.7% uptime",
      badge: "Online",
      badgeColor: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
      sub: "Last checked 2 minutes ago",
    },
    {
      label: "SSL Certificate",
      value: "Valid · Expires in 187 days",
      badge: "Secure",
      badgeColor: "bg-emerald-100 text-emerald-700",
      dot: "bg-emerald-500",
      sub: "Auto-renewal enabled",
    },
    {
      label: "Performance Score",
      value: `${performanceScore}/100`,
      badge: "+4 pts this month",
      badgeColor: "bg-indigo-100 text-indigo-700",
      dot: "bg-indigo-500",
      sub: "Based on latest audit",
    },
    {
      label: "Tech Stack",
      value: "WordPress · Nginx · Cloudflare",
      badge: "Detected",
      badgeColor: "bg-gray-100 text-gray-600",
      dot: "bg-gray-400",
      sub: "3 technologies identified",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden h-40 md:h-48">
        <img
          src="/assets/generated/analytics-hero.dim_800x400.png"
          alt="Analytics visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-indigo-900/40 flex items-center px-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Website Analytics</h2>
            <p className="text-slate-300 text-sm mt-1">
              Real-time performance metrics and traffic insights
            </p>
          </div>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATUS_CARDS.map(({ label, value, badge, badgeColor, dot, sub }) => (
          <Card key={label} className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-500 font-medium">
                  {label}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${dot}`} />
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeColor}`}
                  >
                    {badge}
                  </span>
                </div>
              </div>
              <p className="text-sm font-semibold text-gray-900">{value}</p>
              <p className="text-xs text-gray-400 mt-1">{sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Traffic Overview */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-700">
            Traffic Overview — Last 8 Weeks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={trafficData}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="sessions"
                name="Sessions"
                fill="#6366f1"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="pageViews"
                name="Page Views"
                fill="#a5b4fc"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Source Breakdown */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Lead Source Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={leadSourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {leadSourceData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={LEAD_COLORS[index % LEAD_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 shrink-0">
                {leadSourceData.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: LEAD_COLORS[i] }}
                    />
                    <span className="text-xs text-gray-600">{item.name}</span>
                    <span className="text-xs font-semibold text-gray-800 ml-auto pl-2">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audit Score History */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Audit Score History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                data={auditHistoryData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                <YAxis domain={[55, 80]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Score"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ fill: "#10b981", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-700">
            Top Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Page URL</TableHead>
                <TableHead className="text-xs">Views</TableHead>
                <TableHead className="text-xs">Avg Time</TableHead>
                <TableHead className="text-xs">Bounce Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPages.map((page, i) => (
                <TableRow key={page.url} data-ocid={`analytics.item.${i + 1}`}>
                  <TableCell className="text-xs font-mono text-indigo-700">
                    {page.url}
                  </TableCell>
                  <TableCell className="text-xs font-semibold">
                    {page.views}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {page.avgTime}
                  </TableCell>
                  <TableCell className="text-xs text-gray-600">
                    {page.bounceRate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tracking Script */}
      <Card className="shadow-sm border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-gray-700">
            Tracking Script
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-gray-500 mb-3">
            Paste this script tag in the <code>&lt;head&gt;</code> of your
            website to enable real-time analytics tracking.
          </p>
          <div className="bg-slate-900 rounded-lg p-4 flex items-start justify-between gap-3">
            <code className="text-xs text-emerald-400 font-mono leading-relaxed break-all">
              {scriptTag}
            </code>
            <button
              type="button"
              data-ocid="analytics.copy_script"
              onClick={copyScript}
              className="shrink-0 text-xs bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md transition-colors font-medium"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
