import { CheckCircle2, Copy, MessageSquare, Star, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { useApp } from "../context/AppContext";
import { REVIEWS } from "../data/demoData";

const PLATFORMS = ["All", "Google", "Yelp", "Facebook"] as const;
type Platform = (typeof PLATFORMS)[number];

const PLATFORM_COLORS: Record<string, string> = {
  Google: "bg-blue-100 text-blue-700",
  Yelp: "bg-red-100 text-red-700",
  Facebook: "bg-indigo-100 text-indigo-700",
};

function generateDraftResponse({
  author,
  rating,
  platform,
  niche,
  businessName,
  variant,
}: {
  author: string;
  rating: number;
  platform: string;
  niche: string;
  businessName: string;
  variant: number;
}): string {
  const firstName = author.split(" ")[0]?.replace(/\.$/, "") ?? "there";
  const isPlumbing =
    niche.toLowerCase().includes("plumb") ||
    businessName.toLowerCase().includes("plumb");
  const isMedSpa =
    niche.toLowerCase().includes("spa") ||
    niche.toLowerCase().includes("med") ||
    businessName.toLowerCase().includes("spa");

  if (rating >= 5) {
    const templates = [
      `Thank you so much, ${firstName}! We're thrilled to hear about your positive experience with ${businessName}. Reviews like yours mean the world to our team${isPlumbing ? " — we know how stressful plumbing emergencies can be, and we're glad we could help" : isMedSpa ? " — your confidence in us is what drives us every day" : ""}. We hope to serve you again soon!`,
      `${firstName}, you just made our day! \u2605\u2605\u2605\u2605\u2605 Thank you for taking the time to share this on ${platform}. At ${businessName}, we work hard to deliver exactly this kind of experience${isPlumbing ? " — from the first call to the final fix" : isMedSpa ? " — from your first consultation to your ongoing results" : ""}. We look forward to seeing you again!`,
      `We can't thank you enough for this wonderful review, ${firstName}! Your feedback truly motivates our entire team at ${businessName} to keep delivering our best work. Please don't hesitate to call us any time you need us — we're always here for you.`,
    ];
    return templates[variant % templates.length];
  }

  if (rating >= 3) {
    const templates = [
      `Thank you for taking the time to review us, ${firstName}. We're glad your overall experience was positive, and we truly appreciate your honest feedback. At ${businessName}, we're always working to improve — if there's anything specific we could have done better, we'd love to hear from you directly${isPlumbing ? " at (760) 555-0202" : isMedSpa ? " at (619) 555-0303" : ""}.`,
      `${firstName}, thank you for your feedback — we take every review seriously. It sounds like we did most things right, but we missed the mark in some areas. We'd love a chance to make it right and earn that 5th star. Please reach out to ${businessName} directly and we'll take great care of you.`,
      `We really appreciate your honest review, ${firstName}. Your feedback helps us improve and serve our customers better every day. We'd welcome the opportunity to exceed your expectations next time — please feel free to contact our team at ${businessName} directly.`,
    ];
    return templates[variant % templates.length];
  }

  // 1-2 star
  const templates = [
    `${firstName}, I'm sincerely sorry to hear about your experience. This is not the standard we hold ourselves to at ${businessName}, and I want to make this right. Please contact us directly${isPlumbing ? " at (760) 555-0202" : isMedSpa ? " at (619) 555-0303" : ""} so we can address your concerns personally. Your satisfaction is our top priority and I'd like the opportunity to resolve this for you.`,
    `We're truly sorry, ${firstName}. I've shared your feedback with our entire team — this is exactly the kind of honest response that helps us improve. Please reach out to ${businessName} directly so we can have a personal conversation and make things right. We stand behind every customer experience and want a chance to earn your trust back.`,
    `${firstName}, thank you for being honest with us — even though I wish your experience had been better. I'd like to personally look into what happened and make it right. Please contact ${businessName} at your earliest convenience so we can discuss how to resolve this. We value every customer and genuinely want to fix this.`,
  ];
  return templates[variant % templates.length];
}

export default function ReviewsPage() {
  const { currentTenantId, tenants } = useApp();
  const reviews = REVIEWS[currentTenantId] ?? [];
  const [activeTab, setActiveTab] = useState<Platform>("All");
  const [respondedIds, setRespondedIds] = useState<Set<string>>(new Set());
  const [draftOpen, setDraftOpen] = useState<string | null>(null);
  const [draftVariants, setDraftVariants] = useState<Record<string, number>>(
    {},
  );
  const [draftEdits, setDraftEdits] = useState<Record<string, string>>({});

  const currentTenant = tenants.find((t) => t.id === currentTenantId);
  const businessName = currentTenant?.name ?? "Our Business";
  const niche = currentTenant?.type ?? "";

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

  const openDraft = (reviewId: string, review: (typeof reviews)[number]) => {
    const currentVariant = draftVariants[reviewId] ?? 0;
    if (!draftEdits[reviewId]) {
      const draft = generateDraftResponse({
        author: review.author,
        rating: review.rating,
        platform: review.platform,
        niche,
        businessName,
        variant: currentVariant,
      });
      setDraftEdits((prev) => ({ ...prev, [reviewId]: draft }));
    }
    setDraftOpen(reviewId);
  };

  const closeDraft = () => setDraftOpen(null);

  const copyDraft = (reviewId: string) => {
    const text = draftEdits[reviewId] ?? "";
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch(() => toast.error("Could not copy to clipboard"));
  };

  const markResponded = (reviewId: string) => {
    setRespondedIds((prev) => new Set([...prev, reviewId]));
    setDraftOpen(null);
    toast.success("Marked as responded!");
  };

  const regenerateDraft = (
    reviewId: string,
    review: (typeof reviews)[number],
  ) => {
    const nextVariant = (draftVariants[reviewId] ?? 0) + 1;
    setDraftVariants((prev) => ({ ...prev, [reviewId]: nextVariant }));
    const draft = generateDraftResponse({
      author: review.author,
      rating: review.rating,
      platform: review.platform,
      niche,
      businessName,
      variant: nextVariant,
    });
    setDraftEdits((prev) => ({ ...prev, [reviewId]: draft }));
  };

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
        {filtered.map((review) => {
          const isResponded = respondedIds.has(review.id);
          const isDraftShown = draftOpen === review.id;

          return (
            <div
              key={review.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <div className="p-5">
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
                                : "text-gray-300"
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

                {/* Response row */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div>
                    {isResponded ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 size={13} /> Responded
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openDraft(review.id, review)}
                        data-ocid="reviews.draft.button"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                      >
                        <MessageSquare size={13} />
                        {isDraftShown ? "Hide Draft" : "Draft Response"}
                      </button>
                    )}
                  </div>
                  {!isResponded && (
                    <button
                      type="button"
                      onClick={() =>
                        isDraftShown
                          ? closeDraft()
                          : openDraft(review.id, review)
                      }
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {isDraftShown ? <X size={14} /> : null}
                    </button>
                  )}
                </div>
              </div>

              {/* Draft Response Section */}
              {isDraftShown && !isResponded && (
                <div className="border-t border-indigo-100 bg-indigo-50/40 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                      AI-Generated Response Draft
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => regenerateDraft(review.id, review)}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
                      >
                        Try another variant
                      </button>
                      <button
                        type="button"
                        onClick={closeDraft}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>

                  <Textarea
                    data-ocid="reviews.draft.textarea"
                    value={draftEdits[review.id] ?? ""}
                    onChange={(e) =>
                      setDraftEdits((prev) => ({
                        ...prev,
                        [review.id]: e.target.value,
                      }))
                    }
                    rows={4}
                    className="text-sm text-gray-700 bg-white border-indigo-200 focus-visible:ring-indigo-400 resize-none"
                  />

                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      data-ocid="reviews.draft.copy.secondary_button"
                      onClick={() => copyDraft(review.id)}
                      className="flex items-center gap-1.5 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                    >
                      <Copy size={13} /> Copy Response
                    </Button>
                    <Button
                      size="sm"
                      data-ocid="reviews.draft.mark_responded.primary_button"
                      onClick={() => markResponded(review.id)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5"
                    >
                      <CheckCircle2 size={13} /> Mark as Responded
                    </Button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {filtered.length === 0 && (
          <p
            className="text-center text-gray-400 py-10 text-sm"
            data-ocid="reviews.empty_state"
          >
            No reviews for this platform yet.
          </p>
        )}
      </div>
    </div>
  );
}
