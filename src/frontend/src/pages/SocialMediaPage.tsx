import {
  Calendar,
  Copy,
  Facebook,
  Instagram,
  Loader2,
  Lock,
  MessageSquare,
  Plus,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { useApp } from "../context/AppContext";

const MOCK_POSTS = [
  {
    id: "p1",
    day: "Mon",
    slot: 0,
    platform: "fb",
    text: "Start the week right! Emergency service available 24/7. Call us now.",
    time: "9:00 AM",
  },
  {
    id: "p2",
    day: "Wed",
    slot: 1,
    platform: "ig",
    text: "Summer HVAC Special — Book Now and Save 15%. Limited spots available this month.",
    time: "12:00 PM",
  },
  {
    id: "p3",
    day: "Fri",
    slot: 0,
    platform: "google",
    text: "Thank you to all our 5-star reviewers this week! We love serving our community.",
    time: "10:00 AM",
  },
  {
    id: "p4",
    day: "Sat",
    slot: 2,
    platform: "fb",
    text: "Weekend availability — same great service. Book online or call us directly.",
    time: "8:00 AM",
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["Morning", "Midday", "Evening"];

const MOCK_REVIEWS = [
  {
    id: "r1",
    author: "Marcus T.",
    rating: 5,
    text: "Absolutely fantastic service! They showed up within the hour and fixed everything perfectly. Will definitely use again.",
    platform: "Google",
  },
  {
    id: "r2",
    author: "Sandra K.",
    rating: 4,
    text: "Good work overall, a little late but communicated well. Price was fair and quality was excellent.",
    platform: "Yelp",
  },
  {
    id: "r3",
    author: "David R.",
    rating: 3,
    text: "Did the job but the crew left a bit of a mess. Would probably try someone else next time.",
    platform: "Facebook",
  },
];

const AI_POST_RESULTS: Record<string, string> = {
  Professional:
    "We're proud to offer industry-leading service backed by certified technicians and a 100% satisfaction guarantee. Contact us today to schedule your appointment and experience the difference.",
  Friendly:
    "Hey neighbors! 👋 We're your local go-to for fast, reliable service — and we love what we do. Reach out anytime, we're always happy to help!",
  Urgent:
    "⚠️ Don't wait — limited spots available this week! Get fast, professional service before the rush. Call now or book online in 60 seconds.",
};

const AD_COPY_RESULTS: Record<
  string,
  { headline: string; primary: string; cta: string }
> = {
  "More Calls": {
    headline: "More Calls. Less Missed Jobs.",
    primary:
      "Stop losing leads to competitors. Our AI front desk answers every call, books appointments automatically, and follows up — so you never miss a job again.",
    cta: "Call Now",
  },
  "More Website Visits": {
    headline: "Rank Higher. Get Found First.",
    primary:
      "Local homeowners search Google every day for exactly what you offer. Make sure they find you — not your competition. See how we improve your local rankings.",
    cta: "Learn More",
  },
  "Promote a Service": {
    headline: "Fast, Reliable Service in Your Area",
    primary:
      "Certified technicians. Same-day availability. 5-star reviewed by your neighbors. Book your appointment online in under 2 minutes.",
    cta: "Book Now",
  },
  "Seasonal Offer": {
    headline: "Limited-Time Offer — Book Before It's Gone",
    primary:
      "Seasonal demand is surging. Lock in your spot now and save on our most popular service packages. Offer expires at end of month.",
    cta: "Claim Offer",
  },
};

const REVIEW_RESPONSES: Record<number, string> = {
  5: "Thank you so much for the kind words! It was a pleasure serving you, and we're thrilled everything went smoothly. We look forward to helping you again in the future! 🙌",
  4: "Thank you for your feedback! We're glad you had a great experience overall, and we appreciate you noting the communication. We're always working to improve our scheduling — we hope to exceed your expectations next time!",
  3: "Thank you for taking the time to share your experience. We're sorry the cleanup wasn't up to our usual standard — that's not the experience we aim to deliver. We'd love to make it right. Please reach out to us directly so we can address this properly.",
};

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "fb")
    return <Facebook size={12} className="text-indigo-600" />;
  if (platform === "ig")
    return <Instagram size={12} className="text-pink-500" />;
  return <MessageSquare size={12} className="text-green-600" />;
}

export default function SocialMediaPage() {
  const { currentTenantId, socialMediaEnabled } = useApp();
  const isEnabled = socialMediaEnabled[currentTenantId] ?? false;

  const [addPostOpen, setAddPostOpen] = useState(false);
  const [newPostText, setNewPostText] = useState("");
  const [posts, setPosts] = useState(MOCK_POSTS);

  // AI Post Generator
  const [postDesc, setPostDesc] = useState("");
  const [postTone, setPostTone] = useState("Professional");
  const [platformsFb, setPlatformsFb] = useState(true);
  const [platformsIg, setPlatformsIg] = useState(true);
  const [generatingPost, setGeneratingPost] = useState(false);
  const [generatedPost, setGeneratedPost] = useState("");

  // Ad Copy
  const [adObjective, setAdObjective] = useState("More Calls");
  const [adDesc, setAdDesc] = useState("");
  const [generatingAd, setGeneratingAd] = useState(false);
  const [generatedAd, setGeneratedAd] = useState<{
    headline: string;
    primary: string;
    cta: string;
  } | null>(null);

  // Review responses
  const [generatingReply, setGeneratingReply] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});

  const handleGeneratePost = () => {
    setGeneratingPost(true);
    setGeneratedPost("");
    setTimeout(() => {
      setGeneratedPost(
        AI_POST_RESULTS[postTone] ?? AI_POST_RESULTS.Professional,
      );
      setGeneratingPost(false);
    }, 1500);
  };

  const handleGenerateAd = () => {
    setGeneratingAd(true);
    setGeneratedAd(null);
    setTimeout(() => {
      setGeneratedAd(
        AD_COPY_RESULTS[adObjective] ?? AD_COPY_RESULTS["More Calls"],
      );
      setGeneratingAd(false);
    }, 1500);
  };

  const handleDraftReply = (reviewId: string, rating: number) => {
    setGeneratingReply(reviewId);
    setTimeout(() => {
      setReplies((prev) => ({
        ...prev,
        [reviewId]: REVIEW_RESPONSES[rating] ?? REVIEW_RESPONSES[5],
      }));
      setGeneratingReply(null);
    }, 1500);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success(`${label} copied to clipboard`);
    });
  };

  if (!isEnabled) {
    return (
      <div className="max-w-2xl mx-auto pt-8" data-ocid="social.locked.panel">
        <div className="relative rounded-2xl border border-gray-200 overflow-hidden">
          {/* Blurred preview */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4">
              <Lock size={28} className="text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Social Media Management
            </h2>
            <p className="text-sm text-gray-200 max-w-sm mb-6">
              Automate your content, ads, and review responses — all from one
              place. Ask your agency to unlock this module.
            </p>
            <ul className="space-y-2 mb-6 text-left">
              {[
                {
                  icon: Calendar,
                  label:
                    "Content Calendar — schedule posts across Facebook, Instagram & Google",
                },
                {
                  icon: Sparkles,
                  label:
                    "AI Post Generator — write niche-specific posts in seconds",
                },
                {
                  icon: Zap,
                  label:
                    "Facebook Ad Copy — generate high-converting ad copy by objective",
                },
                {
                  icon: MessageSquare,
                  label:
                    "Review Response Drafts — AI-drafted responses for every review",
                },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Icon size={15} className="text-indigo-500 mt-0.5 shrink-0" />
                  {label}
                </li>
              ))}
            </ul>
            <Button
              data-ocid="social.upgrade.button"
              onClick={() =>
                toast.info("Your account manager has been notified")
              }
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Contact Your Agency to Upgrade
            </Button>
          </div>
          {/* Background preview (blurred) */}
          <div className="p-6 opacity-80 pointer-events-none select-none">
            <div className="h-8 w-48 bg-gray-200 rounded mb-4" />
            <div className="grid grid-cols-7 gap-2">
              {[
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
              ].map((k) => (
                <div key={k} className="h-16 bg-gray-100 rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Social Media</h1>
        <p className="text-sm text-gray-200 mt-1">
          Content calendar, AI post generator, ad copy, and review responses
        </p>
      </div>

      <Tabs defaultValue="calendar" data-ocid="social.tab">
        <TabsList className="bg-gray-100">
          <TabsTrigger value="calendar" data-ocid="social.tab">
            Content Calendar
          </TabsTrigger>
          <TabsTrigger value="generator" data-ocid="social.tab">
            AI Post Generator
          </TabsTrigger>
          <TabsTrigger value="ads" data-ocid="social.tab">
            Facebook Ad Copy
          </TabsTrigger>
          <TabsTrigger value="reviews" data-ocid="social.tab">
            Review Responses
          </TabsTrigger>
        </TabsList>

        {/* Content Calendar */}
        <TabsContent value="calendar">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-base font-semibold">
                This Week
              </CardTitle>
              <Button
                size="sm"
                data-ocid="social.post.open_modal_button"
                onClick={() => setAddPostOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus size={14} className="mr-1" /> Add Post
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Header */}
                  <div className="grid grid-cols-7 gap-2 mb-2">
                    {DAYS.map((d) => (
                      <div
                        key={d}
                        className="text-xs font-semibold text-gray-200 text-center"
                      >
                        {d}
                      </div>
                    ))}
                  </div>
                  {/* Slots */}
                  {SLOTS.map((slot, slotIndex) => (
                    <div key={slot} className="grid grid-cols-7 gap-2 mb-2">
                      {DAYS.map((day) => {
                        const post = posts.find(
                          (p) => p.day === day && p.slot === slotIndex,
                        );
                        return (
                          <div key={`${day}-${slot}`} className="min-h-[72px]">
                            {post ? (
                              <div className="h-full bg-indigo-50 border border-indigo-200 rounded-lg p-1.5">
                                <div className="flex items-center gap-1 mb-1">
                                  <PlatformIcon platform={post.platform} />
                                  <span className="text-[10px] text-gray-200">
                                    {post.time}
                                  </span>
                                </div>
                                <p className="text-[10px] text-gray-700 line-clamp-3">
                                  {post.text}
                                </p>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setAddPostOpen(true)}
                                data-ocid="social.calendar.button"
                                className="h-full w-full border border-dashed border-gray-200 rounded-lg flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                              >
                                <Plus size={14} className="text-gray-200" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Post Generator */}
        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                AI Post Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Describe your service, promotion, or update
                </Label>
                <Textarea
                  data-ocid="social.post.textarea"
                  value={postDesc}
                  onChange={(e) => setPostDesc(e.target.value)}
                  placeholder="e.g. We're offering 15% off HVAC tune-ups this summer, limited spots..."
                  className="min-h-[80px]"
                />
              </div>
              <div className="flex flex-wrap gap-6">
                <div>
                  <Label className="text-xs text-gray-600 mb-2 block">
                    Platforms
                  </Label>
                  <div className="flex gap-4">
                    {[
                      {
                        id: "fb",
                        label: "Facebook",
                        checked: platformsFb,
                        set: setPlatformsFb,
                      },
                      {
                        id: "ig",
                        label: "Instagram",
                        checked: platformsIg,
                        set: setPlatformsIg,
                      },
                    ].map(({ id, label, checked, set }) => (
                      <div key={id} className="flex items-center gap-2">
                        <Checkbox
                          id={`platform-${id}`}
                          checked={checked}
                          onCheckedChange={(v) => set(Boolean(v))}
                          data-ocid={`social.platform.${id}.checkbox`}
                        />
                        <Label
                          htmlFor={`platform-${id}`}
                          className="text-sm cursor-pointer"
                        >
                          {label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-600 mb-1 block">
                    Tone
                  </Label>
                  <Select value={postTone} onValueChange={setPostTone}>
                    <SelectTrigger
                      className="w-36 h-8 text-xs"
                      data-ocid="social.tone.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professional">Professional</SelectItem>
                      <SelectItem value="Friendly">Friendly</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                data-ocid="social.generate.button"
                onClick={handleGeneratePost}
                disabled={generatingPost}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {generatingPost ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} className="mr-2" /> Generate Post
                  </>
                )}
              </Button>

              {generatedPost && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {generatedPost}
                    </p>
                    <button
                      type="button"
                      data-ocid="social.copy.button"
                      onClick={() => copyToClipboard(generatedPost, "Post")}
                      className="shrink-0 p-1.5 hover:bg-gray-200 rounded text-gray-200 hover:text-gray-700"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {platformsFb && (
                      <Badge variant="secondary" className="text-[10px]">
                        <Facebook size={9} className="mr-1" />
                        Facebook
                      </Badge>
                    )}
                    {platformsIg && (
                      <Badge variant="secondary" className="text-[10px]">
                        <Instagram size={9} className="mr-1" />
                        Instagram
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Facebook Ad Copy */}
        <TabsContent value="ads">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Facebook Ad Copy Generator
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Campaign Objective
                </Label>
                <Select value={adObjective} onValueChange={setAdObjective}>
                  <SelectTrigger
                    className="max-w-xs"
                    data-ocid="social.ad.objective.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="More Calls">More Calls</SelectItem>
                    <SelectItem value="More Website Visits">
                      More Website Visits
                    </SelectItem>
                    <SelectItem value="Promote a Service">
                      Promote a Service
                    </SelectItem>
                    <SelectItem value="Seasonal Offer">
                      Seasonal Offer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs text-gray-600 mb-1 block">
                  Service Description (optional)
                </Label>
                <Textarea
                  data-ocid="social.ad.textarea"
                  value={adDesc}
                  onChange={(e) => setAdDesc(e.target.value)}
                  placeholder="e.g. Emergency plumbing, same-day response, licensed and insured..."
                  className="min-h-[60px]"
                />
              </div>
              <Button
                data-ocid="social.ad.generate.button"
                onClick={handleGenerateAd}
                disabled={generatingAd}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {generatingAd ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap size={14} className="mr-2" /> Generate Ad Copy
                  </>
                )}
              </Button>

              {generatedAd && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-200 uppercase tracking-wide">
                      Ad Preview
                    </p>
                    <button
                      type="button"
                      data-ocid="social.ad.copy.button"
                      onClick={() =>
                        copyToClipboard(
                          `${generatedAd.headline}\n\n${generatedAd.primary}\n\nCTA: ${generatedAd.cta}`,
                          "Ad Copy",
                        )
                      }
                      className="p-1.5 hover:bg-gray-200 rounded text-gray-200 hover:text-gray-700"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                  <div className="border border-blue-200 rounded-lg bg-white p-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                        <Facebook size={12} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          Your Business
                        </p>
                        <p className="text-[10px] text-gray-200">Sponsored</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-700">
                      {generatedAd.primary}
                    </p>
                    <div className="border border-gray-200 rounded p-2 flex items-center justify-between bg-gray-50">
                      <span className="text-xs font-bold text-gray-800">
                        {generatedAd.headline}
                      </span>
                      <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded">
                        {generatedAd.cta}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white border rounded p-2">
                      <p className="text-gray-200 text-[10px]">
                        Headline (30 chars)
                      </p>
                      <p className="font-medium text-gray-700 truncate">
                        {generatedAd.headline}
                      </p>
                    </div>
                    <div className="bg-white border rounded p-2">
                      <p className="text-gray-200 text-[10px]">Primary Text</p>
                      <p className="font-medium text-gray-700 truncate">
                        {generatedAd.primary.slice(0, 40)}...
                      </p>
                    </div>
                    <div className="bg-white border rounded p-2">
                      <p className="text-gray-200 text-[10px]">CTA</p>
                      <p className="font-medium text-gray-700">
                        {generatedAd.cta}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Review Responses */}
        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                AI Review Response Drafts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {MOCK_REVIEWS.map((review, i) => (
                <div
                  key={review.id}
                  data-ocid={`social.review.item.${i + 1}`}
                  className="border border-gray-200 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-800">
                          {review.author}
                        </p>
                        <Badge variant="secondary" className="text-[10px]">
                          {review.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        {Array.from({ length: 5 }, (_, si) => si).map((si) => (
                          <Star
                            key={si}
                            size={11}
                            className={
                              si < review.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-200 fill-gray-200"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      data-ocid={`social.review.draft.button.${i + 1}`}
                      onClick={() => handleDraftReply(review.id, review.rating)}
                      disabled={generatingReply === review.id}
                      variant="outline"
                      className="text-xs h-7"
                    >
                      {generatingReply === review.id ? (
                        <Loader2 size={11} className="animate-spin" />
                      ) : (
                        <>
                          <Sparkles size={11} className="mr-1" /> Draft Response
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{review.text}</p>
                  {replies[review.id] && (
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-semibold text-indigo-700">
                        AI Draft Response:
                      </p>
                      <Textarea
                        value={replies[review.id]}
                        onChange={(e) =>
                          setReplies((prev) => ({
                            ...prev,
                            [review.id]: e.target.value,
                          }))
                        }
                        className="text-sm min-h-[80px] bg-white"
                        data-ocid={`social.review.textarea.${i + 1}`}
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        data-ocid={`social.review.copy.button.${i + 1}`}
                        onClick={() =>
                          copyToClipboard(replies[review.id], "Response")
                        }
                        className="text-xs h-7"
                      >
                        <Copy size={11} className="mr-1" /> Copy Response
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Post Dialog */}
      <Dialog open={addPostOpen} onOpenChange={setAddPostOpen}>
        <DialogContent data-ocid="social.post.dialog">
          <DialogHeader>
            <DialogTitle>Add Scheduled Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Textarea
              data-ocid="social.post.new.textarea"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
              placeholder="Write your post content..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                data-ocid="social.post.cancel_button"
                onClick={() => setAddPostOpen(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="social.post.submit_button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                onClick={() => {
                  if (newPostText.trim()) {
                    setPosts((prev) => [
                      ...prev,
                      {
                        id: `p${Date.now()}`,
                        day: "Tue",
                        slot: 0,
                        platform: "fb",
                        text: newPostText,
                        time: "9:00 AM",
                      },
                    ]);
                    setNewPostText("");
                    setAddPostOpen(false);
                    toast.success("Post added to calendar");
                  }
                }}
              >
                Add Post
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
