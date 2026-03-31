import { MessageSquare, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useApp } from "../context/AppContext";
import { REVIEWS } from "../data/demoData";

const PLATFORMS = ["All", "Google", "Yelp", "Facebook"] as const;
type Platform = (typeof PLATFORMS)[number];

const PLATFORM_COLORS: Record<string, string> = {
  Google: "bg-blue-100 text-blue-700",
  Yelp: "bg-red-100 text-red-700",
  Facebook: "bg-indigo-100 text-indigo-700",
};

export default function ReviewsPage() {
  const { currentTenantId } = useApp();
  const reviews = REVIEWS[currentTenantId] ?? [];
  const [activeTab, setActiveTab] = useState<Platform>("All");

  const avgRating = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const filtered =
    activeTab === "All"
      ? reviews
      : reviews.filter((r) => r.platform === activeTab);

  const starCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex gap-8 items-start">
          <div className="text-center">
            <p className="text-5xl font-bold text-gray-900">
              {avgRating.toFixed(1)}
            </p>
            <div className="flex gap-0.5 mt-2 justify-center">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={14}
                  className={
                    s <= Math.round(avgRating)
                      ? "text-amber-400 fill-amber-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {reviews.length} reviews
            </p>
          </div>
          <div className="flex-1 space-y-1.5">
            {starCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-600 w-4">{star}</span>
                <Star size={11} className="text-amber-400 fill-amber-400" />
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full"
                    style={{
                      width: reviews.length
                        ? `${(count / reviews.length) * 100}%`
                        : "0%",
                    }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-4">{count}</span>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => toast.info("Review request feature coming soon!")}
          >
            <MessageSquare size={14} className="mr-1" /> Request Review
          </Button>
        </div>
      </div>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
        {PLATFORMS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setActiveTab(p)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === p
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm p-5"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm flex items-center justify-center">
                  {review.author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {review.author}
                  </p>
                  <div className="flex gap-0.5 mt-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={11}
                        className={
                          s <= review.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${PLATFORM_COLORS[review.platform]}`}
                >
                  {review.platform}
                </span>
                <span className="text-xs text-gray-400">{review.date}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-10 text-sm">
            No reviews for this platform yet.
          </p>
        )}
      </div>
    </div>
  );
}
