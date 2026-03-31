import {
  AlertTriangle,
  CheckCircle,
  Circle,
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

export default function AuditPage() {
  const { currentTenantId, auditOverrides } = useApp();
  const audit = AUDIT_SCORES[currentTenantId];

  const [auditRunning, setAuditRunning] = useState(false);
  const [auditSteps, setAuditSteps] = useState<AuditStep[]>([]);
  const [auditComplete, setAuditComplete] = useState(false);
  const [liveScore, setLiveScore] = useState<number | null>(null);

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

    for (let i = 0; i < steps.length; i++) {
      // Set current step to checking
      steps[i] = { ...steps[i], status: "checking" };
      setAuditSteps([...steps]);

      await new Promise((r) => setTimeout(r, 1200));

      // Randomize score ±5 from base, clamped 0-100
      const variation = Math.floor(Math.random() * 11) - 5;
      const score = Math.min(100, Math.max(0, steps[i].baseScore + variation));
      steps[i] = { ...steps[i], status: "done", score };
      setAuditSteps([...steps]);
    }

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
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">Last updated: March 28, 2026</p>
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

      {/* Live Audit Runner */}
      {(auditSteps.length > 0 || auditRunning) && (
        <Card data-ocid="audit.runner.card" className="border-indigo-100">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">
              Live Audit Progress
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
                    <Circle size={18} className="text-gray-300" />
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
                            : "text-gray-400"
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
              Audit Complete — Live Score
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
            <p className="text-xs text-gray-500 mt-1">
              Average across all 5 audit categories
            </p>
          </CardContent>
        </Card>
      )}

      {/* Overall Score */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-gray-500 mb-3">
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
