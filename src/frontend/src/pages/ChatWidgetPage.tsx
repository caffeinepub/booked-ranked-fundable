import { Copy, MessageSquare, Plus, Sparkles, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { useApp } from "../context/AppContext";
import { useActor } from "../hooks/useActor";

const NICHE_MAP: Record<string, { greeting: string; faqItems: string[] }> = {
  plumber: {
    greeting: "Hi! Looking for fast, reliable plumbing help?",
    faqItems: [
      "Do you offer emergency services?",
      "What areas do you serve?",
      "How do I get a quote?",
    ],
  },
  plumbing: {
    greeting: "Hi! Looking for fast, reliable plumbing help?",
    faqItems: [
      "Do you offer emergency services?",
      "What areas do you serve?",
      "How do I get a quote?",
    ],
  },
  cleaner: {
    greeting: "Hi! Ready for a spotless home or office?",
    faqItems: [
      "Do you bring your own supplies?",
      "How long does a cleaning take?",
      "Do you offer recurring services?",
    ],
  },
  cleaning: {
    greeting: "Hi! Ready for a spotless home or office?",
    faqItems: [
      "Do you bring your own supplies?",
      "How long does a cleaning take?",
      "Do you offer recurring services?",
    ],
  },
  dentist: {
    greeting: "Hi! We're here to help you smile with confidence.",
    faqItems: [
      "Are you accepting new patients?",
      "Do you accept insurance?",
      "Do you offer emergency dental care?",
    ],
  },
  dental: {
    greeting: "Hi! We're here to help you smile with confidence.",
    faqItems: [
      "Are you accepting new patients?",
      "Do you accept insurance?",
      "Do you offer emergency dental care?",
    ],
  },
  restaurant: {
    greeting: "Hi! Welcome — ready to place an order or make a reservation?",
    faqItems: [
      "What are your hours?",
      "Do you take reservations?",
      "Do you offer delivery or takeout?",
    ],
  },
  food: {
    greeting: "Hi! Welcome — ready to place an order or make a reservation?",
    faqItems: [
      "What are your hours?",
      "Do you take reservations?",
      "Do you offer delivery or takeout?",
    ],
  },
};

const DEFAULT_PRESET = {
  greeting: "Hi there! How can we help you today?",
  faqItems: [
    "What services do you offer?",
    "How do I contact you?",
    "What are your business hours?",
  ],
};

function getPreset(niche: string) {
  const key = niche.toLowerCase().trim();
  for (const [k, v] of Object.entries(NICHE_MAP)) {
    if (key.includes(k)) return v;
  }
  return DEFAULT_PRESET;
}

interface WidgetState {
  niche: string;
  greeting: string;
  faqItems: string[];
  leadCaptureEnabled: boolean;
  bookingEnabled: boolean;
  active: boolean;
  embedToken: string;
}

type ChatStep = "greeting" | "name" | "phone" | "done";

function WidgetPreview({ config }: { config: WidgetState }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("greeting");
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<
    { role: "bot" | "user"; text: string }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: messages.length is sufficient
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        { role: "bot", text: config.greeting || "Hi! How can I help?" },
      ]);
      setStep("greeting");
    }
    if (!open) {
      setMessages([]);
      setStep("greeting");
    }
  }, [open, config.greeting]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!inputVal.trim()) return;
    const userMsg = inputVal.trim();
    setInputVal("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      if (step === "greeting") {
        if (config.leadCaptureEnabled) {
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: "Great! May I have your name?" },
          ]);
          setStep("name");
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: "Thanks for reaching out! We'll get back to you shortly.",
            },
          ]);
          setStep("done");
        }
      } else if (step === "name") {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: `Nice to meet you, ${userMsg}! What's your phone number?`,
          },
        ]);
        setStep("phone");
      } else if (step === "phone") {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: config.bookingEnabled
              ? "Perfect! Would you like to schedule an appointment? Reply with your preferred time."
              : "Thanks! We'll be in touch soon. 🎉",
          },
        ]);
        setStep("done");
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "Thanks! Is there anything else I can help with?",
          },
        ]);
      }
    }, 500);
  };

  return (
    <div className="relative w-full h-[520px] bg-gray-100 rounded-xl border border-gray-200 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100" />
      <p className="absolute top-3 left-1/2 -translate-x-1/2 text-xs text-gray-400 font-medium">
        Widget Preview
      </p>

      {open && (
        <div
          className="absolute bottom-16 right-4 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ maxHeight: 360 }}
        >
          <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <MessageSquare size={14} className="text-white" />
              </div>
              <span className="text-sm font-semibold text-white">
                {config.niche || "Support"}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: chat messages are append-only
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-1.5 rounded-xl text-xs ${
                    m.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {config.faqItems.length > 0 &&
              step === "greeting" &&
              messages.length === 1 && (
                <div className="space-y-1">
                  {config.faqItems.map((faq, i) => (
                    <button
                      // biome-ignore lint/suspicious/noArrayIndexKey: faq list stable
                      key={i}
                      type="button"
                      onClick={() => {
                        setMessages((prev) => [
                          ...prev,
                          { role: "user", text: faq },
                        ]);
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            {
                              role: "bot",
                              text: "Great question! Let me connect you with our team.",
                            },
                          ]);
                        }, 400);
                      }}
                      className="w-full text-left text-xs px-3 py-1.5 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 transition-colors"
                    >
                      {faq}
                    </button>
                  ))}
                </div>
              )}
            <div ref={bottomRef} />
          </div>
          <div className="p-2 border-t border-gray-100 flex gap-2">
            <input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-indigo-400"
            />
            <button
              type="button"
              onClick={handleSend}
              className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-ocid="chatwidget.canvas_target"
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-indigo-600 shadow-xl flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
      >
        {open ? <X size={20} /> : <MessageSquare size={20} />}
      </button>
    </div>
  );
}

export default function ChatWidgetPage() {
  const { currentTenantId } = useApp();
  const { actor } = useActor();
  const [saving, setSaving] = useState(false);
  const [nicheInput, setNicheInput] = useState("");
  const [newFaq, setNewFaq] = useState("");
  const [config, setConfig] = useState<WidgetState>({
    niche: "",
    greeting: DEFAULT_PRESET.greeting,
    faqItems: [...DEFAULT_PRESET.faqItems],
    leadCaptureEnabled: true,
    bookingEnabled: false,
    active: true,
    embedToken: "",
  });

  useEffect(() => {
    if (!actor) return;
    actor
      .getChatWidgetConfig(currentTenantId)
      .then((res) => {
        if (res) {
          setConfig({
            niche: res.niche,
            greeting: res.greeting,
            faqItems: res.faqItems,
            leadCaptureEnabled: res.leadCaptureEnabled,
            bookingEnabled: res.bookingEnabled,
            active: res.active,
            embedToken: res.embedToken,
          });
          setNicheInput(res.niche);
        }
      })
      .catch(() => {});
  }, [actor, currentTenantId]);

  const handleGenerate = () => {
    if (!nicheInput.trim()) {
      toast.error("Enter a niche to generate.");
      return;
    }
    const preset = getPreset(nicheInput);
    setConfig((prev) => ({
      ...prev,
      niche: nicheInput,
      greeting: preset.greeting,
      faqItems: [...preset.faqItems],
    }));
    toast.success(`Widget generated for ${nicheInput}`);
  };

  const addFaq = () => {
    if (!newFaq.trim()) return;
    setConfig((prev) => ({
      ...prev,
      faqItems: [...prev.faqItems, newFaq.trim()],
    }));
    setNewFaq("");
  };

  const removeFaq = (i: number) => {
    setConfig((prev) => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, idx) => idx !== i),
    }));
  };

  const handleSave = async () => {
    if (!actor) {
      toast.error("Backend not available.");
      return;
    }
    setSaving(true);
    try {
      const token =
        config.embedToken || `widget-${currentTenantId}-${Date.now()}`;
      await actor.upsertChatWidgetConfig({
        tenantId: currentTenantId,
        niche: config.niche,
        greeting: config.greeting,
        faqItems: config.faqItems,
        leadCaptureEnabled: config.leadCaptureEnabled,
        bookingEnabled: config.bookingEnabled,
        active: config.active,
        embedToken: token,
      });
      setConfig((prev) => ({ ...prev, embedToken: token }));
      toast.success("Chat widget saved!");
    } catch {
      toast.error("Failed to save. Changes saved locally.");
    } finally {
      setSaving(false);
    }
  };

  const embedCode = `<script src="https://widget.bookedrankedfundable.com/widget.js" data-token="${config.embedToken || "[save to generate token]"}" async></script>`;

  const copyEmbed = () => {
    navigator.clipboard.writeText(embedCode);
    toast.success("Embed code copied!");
  };

  return (
    <div className="space-y-6">
      {/* AI Generate Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={18} />
          <h2 className="font-semibold text-sm">Generate Widget with AI</h2>
        </div>
        <p className="text-xs text-indigo-100 mb-4">
          Enter your business niche and we'll auto-populate the greeting, FAQs,
          and personality.
        </p>
        <div className="flex gap-2">
          <Input
            value={nicheInput}
            onChange={(e) => setNicheInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="e.g. plumber, dentist, restaurant, cleaning..."
            className="bg-white/20 border-white/30 text-white placeholder:text-indigo-200 focus:border-white"
            data-ocid="chatwidget.search_input"
          />
          <Button
            onClick={handleGenerate}
            className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold whitespace-nowrap"
            data-ocid="chatwidget.primary_button"
          >
            <Sparkles size={14} className="mr-1.5" /> Generate Widget
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Config Form */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-5">
            <h3 className="text-sm font-semibold text-gray-800">
              Widget Configuration
            </h3>

            <div>
              <Label className="text-xs text-gray-600">
                Business Niche / Name
              </Label>
              <Input
                value={config.niche}
                onChange={(e) =>
                  setConfig((p) => ({ ...p, niche: e.target.value }))
                }
                placeholder="e.g. North County Plumbing"
                className="mt-1"
                data-ocid="chatwidget.input"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-600">Greeting Message</Label>
              <Textarea
                value={config.greeting}
                onChange={(e) =>
                  setConfig((p) => ({ ...p, greeting: e.target.value }))
                }
                rows={2}
                className="mt-1 resize-none"
                data-ocid="chatwidget.textarea"
              />
            </div>

            <div>
              <Label className="text-xs text-gray-600 block mb-2">
                FAQ Items
              </Label>
              <div className="space-y-2">
                {config.faqItems.map((faq, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: faq list stable
                  <div key={i} className="flex items-center gap-2">
                    <span className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-gray-700">
                      {faq}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFaq(i)}
                      className="text-red-400 hover:text-red-600 p-1"
                      data-ocid={`chatwidget.delete_button.${i + 1}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newFaq}
                    onChange={(e) => setNewFaq(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addFaq()}
                    placeholder="Add a FAQ..."
                    className="text-xs"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={addFaq}
                    data-ocid="chatwidget.secondary_button"
                  >
                    <Plus size={14} />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-100">
              {(
                [
                  {
                    key: "leadCaptureEnabled",
                    label: "Lead Capture",
                    desc: "Collect name, phone, and email",
                  },
                  {
                    key: "bookingEnabled",
                    label: "Appointment Booking",
                    desc: "Allow scheduling via chat",
                  },
                  {
                    key: "active",
                    label: "Widget Active",
                    desc: "Show widget on embedded sites",
                  },
                ] as const
              ).map(({ key, label, desc }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{label}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                  <Switch
                    checked={config[key]}
                    onCheckedChange={(v) =>
                      setConfig((p) => ({ ...p, [key]: v }))
                    }
                    data-ocid={"chatwidget.switch"}
                  />
                </div>
              ))}
            </div>

            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              data-ocid="chatwidget.save_button"
            >
              {saving ? "Saving..." : "Save Widget"}
            </Button>
          </div>

          {/* Embed Code */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                Your Embed Code
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={copyEmbed}
                className="gap-1.5 text-xs"
                data-ocid="chatwidget.secondary_button"
              >
                <Copy size={13} /> Copy
              </Button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Paste this into your website's{" "}
              <code className="bg-gray-100 px-1 rounded">&lt;body&gt;</code>{" "}
              tag.
            </p>
            <pre className="bg-gray-900 text-green-400 text-xs rounded-lg p-4 overflow-x-auto whitespace-pre-wrap break-all">
              {embedCode}
            </pre>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-6 self-start">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Live Preview
            </h3>
            <WidgetPreview config={config} />
            <p className="text-xs text-gray-400 text-center mt-3">
              Click the chat bubble to test the widget experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
