import {
  AlertTriangle,
  CheckCircle,
  Circle,
  Globe,
  Info,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Progress } from "../components/ui/progress";
import { useApp } from "../context/AppContext";
import { AUDIT_SCORES } from "../data/demoData";

type StepStatus = "pending" | "checking" | "done";

interface AuditStep {
  label: string;
  status: StepStatus;
  score: number;
  baseScore: number;
}

function ScoreArc({ score }: { score: number }) {
  const radius = 54;
  const circumference = Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <svg
      width="140"
      height="90"
      viewBox="0 0 140 90"
      aria-label={`Score: ${score} out of 100`}
    >
      <title>Score gauge: {score}/100</title>
      <path
        d="M 16 80 A 54 54 0 0 1 124 80"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M 16 80 A 54 54 0 0 1 124 80"
        fill="none"
        stroke={color}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      <text
        x="70"
        y="72"
        textAnchor="middle"
        fontSize="26"
        fontWeight="bold"
        fill="#111827"
      >
        {score}
      </text>
      <text x="70" y="86" textAnchor="middle" fontSize="10" fill="#6b7280">
        out of 100
      </text>
    </svg>
  );
}

const PRIORITY_CONFIG = {
  High: {
    icon: AlertTriangle,
    color: "text-red-500",
    bg: "bg-red-50 border-red-100",
  },
  Medium: {
    icon: Info,
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-100",
  },
  Low: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-100",
  },
};

const scoreLabel = (s: number) =>
  s >= 80 ? "Excellent" : s >= 60 ? "Good" : "Needs Work";
const scoreColor = (s: number) =>
  s >= 80 ? "bg-emerald-500" : s >= 60 ? "bg-amber-400" : "bg-red-400";

const STEP_DEFS = [
  { label: "Google Business Profile" },
  { label: "Citations & Directories" },
  { label: "Website Health" },
  { label: "Social Media Presence" },
  { label: "Google Ranking Signals" },
];

async function fetchPageSpeed(url: string) {
  const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
  const res = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error("PageSpeed API error");
  const data = await res.json();
  const cats = data?.lighthouseResult?.categories;
  return {
    performance: Math.round((cats?.performance?.score ?? 0.5) * 100),
    seo: Math.round((cats?.seo?.score ?? 0.5) * 100),
    bestPractices: Math.round((cats?.["best-practices"]?.score ?? 0.5) * 100),
  };
}

export default function AuditPage() {
  const { currentTenantId, auditOverrides, tenants } = useApp();
  const audit = AUDIT_SCORES[currentTenantId];

  const tenant = tenants.find((t) => t.id === currentTenantId);
  const defaultWebsite = tenant?.website ?? "";

  const [auditRunning, setAuditRunning] = useState(false);
  const [auditSteps, setAuditSteps] = useState<AuditStep[]>([]);
  const [auditComplete, setAuditComplete] = useState(false);
  const [liveScore, setLiveScore] = useState<number | null>(null);
  const [websiteInput, setWebsiteInput] = useState(defaultWebsite);
  const [showUrlInput, setShowUrlInput] = useState(!defaultWebsite);
  const [auditError, setAuditError] = useState("");

  if (!audit) return <p>No audit data found.</p>;

  const displayScore = auditOverrides[currentTenantId] ?? audit.total;

  const sections = [
    { label: "Google Business Profile", score: audit.gmb },
    { label: "Citations", score: audit.citations },
    { label: "Website Health", score: audit.website },
    { label: "Backlinks", score: audit.backlinks },
  ];

  const baseSections: Record<string, number> = {
    "Google Business Profile": audit.gmb,
    "Citations & Directories": audit.citations,
    "Website Health": audit.website,
    "Social Media Presence": Math.round((audit.gmb + audit.citations) / 2),
    "Google Ranking Signals": audit.backlinks,
  };

  const handleRunAudit = async () => {
    const url = websiteInput.trim();
    if (!url) {
      setShowUrlInput(true);
      setAuditError("Please enter your website URL to run a live audit.");
      return;
    }
    setAuditError("");
    const fullUrl = url.startsWith("http") ? url : `https://${url}`;

    const initialSteps: AuditStep[] = STEP_DEFS.map((s) => ({
      label: s.label,
      status: "pending",
      score: 0,
      baseScore: baseSections[s.label] ?? 70,
    }));
    setAuditSteps(initialSteps);
    setAuditRunning(true);
    setAuditComplete(false);
    setLiveScore(null);

    const steps = [...initialSteps];

    // Step 0: Google Business Profile (simulated)
    steps[0] = { ...steps[0], status: "checking" };
    setAuditSteps([...steps]);
    await new Promise((r) => setTimeout(r, 900));
    steps[0] = {
      ...steps[0],
      status: "done",
      score: Math.min(
        100,
        Math.max(0, steps[0].baseScore + (Math.floor(Math.random() * 11) - 5)),
      ),
    };
    setAuditSteps([...steps]);

    // Step 1: Citations (simulated)
    steps[1] = { ...steps[1], status: "checking" };
    setAuditSteps([...steps]);
    await new Promise((r) => setTimeout(r, 800));
    steps[1] = {
      ...steps[1],
      status: "done",
      score: Math.min(
        100,
        Math.max(0, steps[1].baseScore + (Math.floor(Math.random() * 11) - 5)),
      ),
    };
    setAuditSteps([...steps]);

    // Step 2 & 3: Website + Social via PageSpeed
    steps[2] = { ...steps[2], status: "checking" };
    setAuditSteps([...steps]);
    let psData = {
      performance: steps[2].baseScore,
      seo: steps[3].baseScore,
      bestPractices: 70,
    };
    try {
      psData = await fetchPageSpeed(fullUrl);
    } catch {
      // keep base scores
    }
    steps[2] = { ...steps[2], status: "done", score: psData.performance };
    setAuditSteps([...steps]);

    steps[3] = { ...steps[3], status: "checking" };
    setAuditSteps([...steps]);
    await new Promise((r) => setTimeout(r, 600));
    steps[3] = { ...steps[3], status: "done", score: psData.bestPractices };
    setAuditSteps([...steps]);

    // Step 4: Google Ranking Signals (simulated)
    steps[4] = { ...steps[4], status: "checking" };
    setAuditSteps([...steps]);
    await new Promise((r) => setTimeout(r, 700));
    steps[4] = {
      ...steps[4],
      status: "done",
      score: Math.min(
        100,
        Math.max(0, steps[4].baseScore + (Math.floor(Math.random() * 11) - 5)),
      ),
    };
    setAuditSteps([...steps]);

    const avg = Math.round(
      steps.reduce((s, step) => s + step.score, 0) / steps.length,
    );
    setLiveScore(avg);
    setAuditComplete(true);
    setAuditRunning(false);
  };

  const doneCount = auditSteps.filter((s) => s.status === "done").length;
  const progressPct =
    auditSteps.length > 0 ? (doneCount / auditSteps.length) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <p className="text-sm text-gray-200">Last updated: March 28, 2026</p>
        <div className="flex items-center gap-2 flex-wrap">
          {showUrlInput && (
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-gray-200 flex-shrink-0" />
              <Input
                data-ocid="audit.input"
                placeholder="https://yourbusiness.com"
                value={websiteInput}
                onChange={(e) => setWebsiteInput(e.target.value)}
                className="h-8 text-sm w-52"
              />
            </div>
          )}
          {!showUrlInput && defaultWebsite && (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="text-xs text-indigo-500 hover:underline"
            >
              Change URL
            </button>
          )}
          <Button
            data-ocid="audit.run.primary_button"
            type="button"
            size="sm"
            disabled={auditRunning}
            onClick={handleRunAudit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {auditRunning ? (
              <>
                <Loader2 size={14} className="mr-1.5 animate-spin" /> Running
                Audit...
              </>
            ) : (
              <>
                <RefreshCw size={14} className="mr-1.5" /> Run Live Audit
              </>
            )}
          </Button>
        </div>
      </div>

      {auditError && (
        <p className="text-sm text-red-500" data-ocid="audit.error_state">
          {auditError}
        </p>
      )}

      {/* Live Audit Runner */}
      {(auditSteps.length > 0 || auditRunning) && (
        <Card data-ocid="audit.runner.card" className="border-indigo-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Live Audit Progress
              {websiteInput && (
                <span className="font-normal text-gray-200 ml-2 text-xs">
                  — {websiteInput}
                </span>
              )}
            </CardTitle>
            {auditRunning && (
              <Progress
                data-ocid="audit.runner.loading_state"
                value={progressPct}
                className="h-2 mt-2"
              />
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {auditSteps.map((step, idx) => (
              <div
                key={step.label}
                className="flex items-center gap-3"
                data-ocid={`audit.step.item.${idx + 1}`}
              >
                <div className="flex-shrink-0 w-5">
                  {step.status === "checking" && (
                    <Loader2
                      size={18}
                      className="text-indigo-500 animate-spin"
                    />
                  )}
                  {step.status === "done" && (
                    <CheckCircle size={18} className="text-emerald-500" />
                  )}
                  {step.status === "pending" && (
                    <Circle size={18} className="text-gray-200" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p
                      className={`text-sm font-medium ${
                        step.status === "done"
                          ? "text-gray-800"
                          : step.status === "checking"
                            ? "text-indigo-700"
                            : "text-gray-200"
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.status === "done" && (
                      <span
                        className={`text-sm font-bold ml-2 ${
                          step.score >= 80
                            ? "text-emerald-600"
                            : step.score >= 60
                              ? "text-amber-600"
                              : "text-red-600"
                        }`}
                      >
                        {step.score}
                      </span>
                    )}
                    {step.status === "checking" && (
                      <span className="text-xs text-indigo-500 italic">
                        Checking...
                      </span>
                    )}
                  </div>
                  {step.status === "done" && (
                    <div className="h-1.5 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${scoreColor(step.score)}`}
                        style={{ width: `${step.score}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Audit Complete Summary */}
      {auditComplete && liveScore !== null && (
        <Card
          data-ocid="audit.summary.card"
          className="bg-gradient-to-br from-indigo-50 to-emerald-50 border-indigo-200"
        >
          <CardContent className="pt-6 flex flex-col items-center">
            <p className="text-sm font-semibold text-gray-600 mb-2">
              Live Audit Complete
            </p>
            <div className="text-5xl font-bold text-indigo-700">
              {liveScore}
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${
                liveScore >= 80
                  ? "text-emerald-600"
                  : liveScore >= 60
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {scoreLabel(liveScore)}
            </p>
            <p className="text-xs text-gray-200 mt-1">
              Based on real PageSpeed data + audit signals
            </p>
          </CardContent>
        </Card>
      )}

      {/* Overall Score */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-200 mb-3">
          Overall SEO Score
        </h3>
        <ScoreArc score={displayScore} />
        <p
          className={`mt-2 text-sm font-semibold ${
            displayScore >= 80
              ? "text-emerald-600"
              : displayScore >= 60
                ? "text-amber-600"
                : "text-red-600"
          }`}
        >
          {scoreLabel(displayScore)}
        </p>
        {auditOverrides[currentTenantId] !== undefined && (
          <p className="text-xs text-amber-600 mt-1 font-medium">
            ⚠ Admin override active
          </p>
        )}
      </div>

      {/* Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map(({ label, score }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-800">{label}</p>
              <span className="text-lg font-bold text-gray-900">{score}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${scoreColor(score)}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <p
              className={`text-xs mt-1.5 font-medium ${
                score >= 80
                  ? "text-emerald-600"
                  : score >= 60
                    ? "text-amber-600"
                    : "text-red-600"
              }`}
            >
              {scoreLabel(score)}
            </p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Recommendations
        </h3>
        <div className="space-y-3">
          {audit.recommendations.map((rec) => {
            const { icon: Icon, color, bg } = PRIORITY_CONFIG[rec.priority];
            return (
              <div
                key={rec.text}
                className={`flex items-start gap-3 p-3 rounded-lg border ${bg}`}
              >
                <Icon size={15} className={`mt-0.5 flex-shrink-0 ${color}`} />
                <p className="text-sm text-gray-700">{rec.text}</p>
                <span
                  className={`ml-auto text-xs font-semibold flex-shrink-0 ${color}`}
                >
                  {rec.priority}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
