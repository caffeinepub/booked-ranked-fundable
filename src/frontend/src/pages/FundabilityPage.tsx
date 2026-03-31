import { Calendar, CheckCircle, Circle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useApp } from "../context/AppContext";
import { FUNDABILITY_ITEMS, FUNDABILITY_SCORES } from "../data/demoData";

function ScoreGauge({ score }: { score: number }) {
  const tier = score >= 70 ? "Bankable" : score >= 40 ? "Builder" : "Starter";
  const barColor =
    score >= 70
      ? "bg-emerald-500"
      : score >= 40
        ? "bg-amber-400"
        : "bg-red-400";

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-500">
          Fundability Score
        </h3>
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${score >= 70 ? "bg-emerald-100 text-emerald-700" : score >= 40 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"}`}
        >
          {tier}
        </span>
      </div>
      <div className="flex items-end gap-4 mb-4">
        <span className="text-5xl font-bold text-gray-900">{score}</span>
        <span className="text-gray-400 mb-1">/100</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-gray-400 mt-1">
        <span>Starter</span>
        <span>Builder</span>
        <span>Bankable</span>
      </div>
    </div>
  );
}

export default function FundabilityPage() {
  const { currentTenantId } = useApp();
  const score = FUNDABILITY_SCORES[currentTenantId] ?? 0;
  const items = FUNDABILITY_ITEMS[currentTenantId] ?? [];

  const completed = items.filter((i) => i.completed).length;
  const pct = items.length ? Math.round((completed / items.length) * 100) : 0;

  const categories = [...new Set(items.map((i) => i.category))];

  return (
    <div className="space-y-6">
      <ScoreGauge score={score} />

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-700">
            Checklist Progress
          </p>
          <p className="text-sm text-gray-500">
            {completed}/{items.length} complete
          </p>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-500 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">{pct}% complete</p>
      </div>

      {/* Checklist by category */}
      {categories.map((cat) => (
        <div
          key={cat}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
        >
          <h4 className="text-sm font-semibold text-gray-800 mb-3">{cat}</h4>
          <div className="space-y-2">
            {items
              .filter((i) => i.category === cat)
              .map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-1.5">
                  {item.completed ? (
                    <CheckCircle
                      size={17}
                      className="text-emerald-500 flex-shrink-0"
                    />
                  ) : (
                    <Circle size={17} className="text-gray-300 flex-shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      item.completed ? "text-gray-700" : "text-gray-500"
                    }`}
                  >
                    {item.item}
                  </span>
                  <span
                    className={`ml-auto text-xs font-medium ${
                      item.completed ? "text-emerald-600" : "text-amber-600"
                    }`}
                  >
                    {item.completed ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="text-center pt-2">
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => toast.info("Consultation scheduling coming soon!")}
        >
          <Calendar size={15} className="mr-2" /> Schedule Consultation
        </Button>
      </div>
    </div>
  );
}
