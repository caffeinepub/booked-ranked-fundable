import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@tanstack/react-router";
import {
  CheckCircle,
  MessageSquare,
  Phone,
  PhoneCall,
  Send,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────
// Voice Agent Demo
// ─────────────────────────────────────────────

type Scenario = "new-customer" | "after-hours" | "pricing";

const SCENARIOS: { id: Scenario; label: string }[] = [
  { id: "new-customer", label: "New Customer Inquiry" },
  { id: "after-hours", label: "After-Hours Emergency" },
  { id: "pricing", label: "Pricing Question" },
];

type Line = { speaker: "Caller" | "AI Agent"; text: string };

const SCRIPTS: Record<Scenario, Line[]> = {
  "new-customer": [
    {
      speaker: "Caller",
      text: "Hi, I need a plumber — my kitchen sink is completely backed up",
    },
    {
      speaker: "AI Agent",
      text: "Hi there! Thanks for calling North County Plumbing Pros. I can definitely help with that. Can I get your name?",
    },
    { speaker: "Caller", text: "Yeah it's Mike" },
    {
      speaker: "AI Agent",
      text: "Great, Mike! Are you available today or would tomorrow work better for a same-day service call?",
    },
    { speaker: "Caller", text: "Today if possible, it's getting bad" },
    {
      speaker: "AI Agent",
      text: "Perfect. I'm booking you for today between 2 and 4 PM. Can I grab your address and best callback number?",
    },
    { speaker: "Caller", text: "Sure, 742 Evergreen Terrace, 619-555-0182" },
    {
      speaker: "AI Agent",
      text: "Got it Mike — you're all set. A technician will call 30 minutes before arrival. Is there anything else I can help with?",
    },
    { speaker: "Caller", text: "No that's great, thank you" },
    {
      speaker: "AI Agent",
      text: "Awesome! We'll see you this afternoon. Have a great day!",
    },
  ],
  "after-hours": [
    {
      speaker: "Caller",
      text: "Hello? It's 11pm and my water heater just burst, there's water everywhere",
    },
    {
      speaker: "AI Agent",
      text: "Hi, you've reached Oceanside Clean & Restore emergency line. I'm so sorry — we handle exactly this. I'm alerting our on-call crew right now. What's your address?",
    },
    { speaker: "Caller", text: "1822 Pacific View Drive" },
    {
      speaker: "AI Agent",
      text: "Thank you. Our emergency team is being dispatched. Estimated arrival is 35 to 45 minutes. Can I confirm a callback number?",
    },
    { speaker: "Caller", text: "Yes — 760-555-0341" },
    {
      speaker: "AI Agent",
      text: "Perfect. You'll get a text confirmation in 2 minutes and a call when the crew is 10 minutes out. Stay safe — help is on the way.",
    },
  ],
  pricing: [
    {
      speaker: "Caller",
      text: "Hey, how much does it cost to clean air ducts for a 3 bedroom house?",
    },
    {
      speaker: "AI Agent",
      text: "Great question! For a standard 3-bedroom home, duct cleaning typically runs between $299 and $499 depending on duct count and condition. Would you like a free on-site estimate?",
    },
    { speaker: "Caller", text: "Yeah that sounds good" },
    {
      speaker: "AI Agent",
      text: "Perfect! I can book a free estimate as early as tomorrow morning. What's your name and best number?",
    },
    { speaker: "Caller", text: "Lisa, 858-555-0277" },
    {
      speaker: "AI Agent",
      text: "Got it Lisa — you're booked for a free estimate tomorrow morning. We'll confirm the exact time tonight via text. Thanks for calling!",
    },
  ],
};

const LEAD_DATA: Record<
  Scenario,
  { name: string; phone: string; service: string }
> = {
  "new-customer": {
    name: "Mike",
    phone: "619-555-0182",
    service: "Drain Clearing — Kitchen Sink",
  },
  "after-hours": {
    name: "Emergency Caller",
    phone: "760-555-0341",
    service: "Water Heater Burst — Emergency Dispatch",
  },
  pricing: {
    name: "Lisa",
    phone: "858-555-0277",
    service: "Air Duct Cleaning — Free Estimate",
  },
};

function VoiceAgentDemo() {
  const [selected, setSelected] = useState<Scenario | null>(null);
  const [status, setStatus] = useState<
    "idle" | "connecting" | "active" | "done"
  >("idle");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showTyping, setShowTyping] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const simulationRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    setStatus("idle");
    setVisibleLines(0);
    setShowTyping(false);
    setShowLead(false);
  };

  const startCall = () => {
    if (!selected) return;
    reset();
    setStatus("connecting");
    setTimeout(() => {
      setStatus("active");
      playLines(SCRIPTS[selected]);
    }, 1200);
  };

  const playLines = (lines: Line[]) => {
    let delay = 0;
    lines.forEach((line, i) => {
      const isAI = line.speaker === "AI Agent";
      if (isAI) {
        setTimeout(() => setShowTyping(true), delay);
        delay += 900;
        setTimeout(() => {
          setShowTyping(false);
          setVisibleLines(i + 1);
        }, delay);
      } else {
        setTimeout(() => setVisibleLines(i + 1), delay);
      }
      delay += 1000;
    });
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => setShowLead(true), 400);
    }, delay + 200);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef.current is intentionally excluded
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleLines, showTyping]);

  // Scroll simulation container into view when scenario is selected
  useEffect(() => {
    if (selected && simulationRef.current) {
      setTimeout(() => {
        simulationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [selected]);

  const lines = selected ? SCRIPTS[selected] : [];
  const lead = selected ? LEAD_DATA[selected] : null;

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            data-ocid={`demo.voice.${s.id}.button`}
            onClick={() => {
              setSelected(s.id);
              reset();
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selected === s.id
                ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/40"
                : "border-white/20 text-slate-200 hover:border-indigo-500/50 hover:text-white bg-white/5"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {selected && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selected}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 w-full"
            ref={simulationRef}
          >
            {/* Phone mockup */}
            <div className="w-[340px] rounded-[2.5rem] bg-slate-900 border-2 border-white/10 shadow-2xl overflow-hidden">
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 pt-4 pb-1">
                <span className="text-xs text-slate-200">9:41 AM</span>
                <div className="flex gap-1.5">
                  {([3, 4, 4] as const).map((h, idx) => (
                    <div
                      key={`signal-bar-${idx}-${h}`}
                      style={{ height: h * 3 }}
                      className="w-1 rounded-sm bg-slate-400"
                    />
                  ))}
                  <div className="w-4 h-3 rounded-sm border border-slate-400 ml-1" />
                </div>
              </div>

              {/* Call header */}
              <div className="flex flex-col items-center py-4 border-b border-white/5">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center mb-2 shadow-lg">
                  <Phone size={28} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm">
                  {selected === "after-hours"
                    ? "Oceanside Clean & Restore"
                    : "North County Plumbing Pros"}
                </p>
                <div className="flex items-center gap-1.5 mt-1">
                  {status === "connecting" && (
                    <>
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                      <span className="text-xs text-yellow-400">
                        Connecting...
                      </span>
                    </>
                  )}
                  {(status === "active" || status === "done") && (
                    <>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          status === "active"
                            ? "bg-green-400 animate-pulse"
                            : "bg-slate-500"
                        }`}
                      />
                      <span
                        className={`text-xs ${
                          status === "active"
                            ? "text-green-400"
                            : "text-slate-200"
                        }`}
                      >
                        {status === "active" ? "Call Connected" : "Call Ended"}
                      </span>
                    </>
                  )}
                  {status === "idle" && (
                    <span className="text-xs text-slate-200">Ready</span>
                  )}
                </div>
              </div>

              {/* Transcript */}
              <div
                ref={scrollRef}
                className="h-56 overflow-y-auto px-4 py-3 space-y-2 scroll-smooth"
              >
                {lines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={`${line.speaker}-${i}-${line.text.slice(0, 10)}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${
                      line.speaker === "AI Agent"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed ${
                        line.speaker === "AI Agent"
                          ? "bg-indigo-600 text-white rounded-br-sm"
                          : "bg-slate-700 text-slate-200 rounded-bl-sm"
                      }`}
                    >
                      {line.text}
                    </div>
                  </motion.div>
                ))}
                {showTyping && (
                  <div className="flex justify-end">
                    <div className="bg-indigo-600/60 px-3 py-2 rounded-2xl rounded-br-sm">
                      <div className="flex gap-1 items-center h-3">
                        {[0, 1, 2].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                            style={{ animationDelay: `${i * 0.15}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Phone actions */}
              <div className="flex justify-center py-4 border-t border-white/5">
                {status === "done" ? (
                  <span className="text-xs text-slate-200 italic">
                    Lead automatically captured ↓
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={startCall}
                    disabled={status === "connecting" || status === "active"}
                    data-ocid="demo.voice.start_call.button"
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                      status === "idle"
                        ? "bg-green-500 hover:bg-green-400 text-white shadow-lg"
                        : "bg-slate-700 text-slate-200 cursor-not-allowed"
                    }`}
                  >
                    <PhoneCall size={14} />
                    {status === "idle"
                      ? "Start Demo Call"
                      : status === "connecting"
                        ? "Calling..."
                        : "In Progress..."}
                  </button>
                )}
              </div>
            </div>

            {/* Lead card */}
            <AnimatePresence>
              {showLead && lead && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-[340px] bg-slate-800 border border-green-500/30 rounded-2xl p-4 shadow-xl"
                  data-ocid="demo.voice.lead_card"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                      Lead Captured
                    </span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      New
                    </Badge>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-slate-200" />
                      <span className="text-sm text-white font-medium">
                        {lead.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-slate-200" />
                      <span className="text-sm text-slate-200">
                        {lead.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-slate-200" />
                      <span className="text-sm text-slate-200">
                        {lead.service}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                    <span className="text-xs text-slate-200">Just now</span>
                    <span className="text-xs text-green-400 font-medium">
                      ✓ Saved to CRM
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      )}

      {!selected && (
        <p className="text-slate-200 text-sm text-center mt-4">
          Select a scenario above to start the demo call
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// Chat Widget Demo
// ─────────────────────────────────────────────

type Niche =
  | "Plumbing"
  | "HVAC"
  | "Restoration"
  | "Carpet Cleaning"
  | "Roofing"
  | "Med Spa";

const NICHE_CONFIGS: Record<Niche, { business: string; greeting: string }> = {
  Plumbing: {
    business: "North County Plumbing Pros",
    greeting:
      "Hi there! Welcome to North County Plumbing Pros. I'm your AI assistant. What can I help you with today — a repair, estimate, or emergency?",
  },
  HVAC: {
    business: "Comfort Zone HVAC",
    greeting:
      "Hi! Welcome to your HVAC comfort experts. Heating, cooling, or maintenance — what can I help you with?",
  },
  Restoration: {
    business: "Oceanside Clean & Restore",
    greeting:
      "Hi — you've reached Oceanside Clean & Restore. Are you dealing with an emergency or looking to schedule a service?",
  },
  "Carpet Cleaning": {
    business: "Fresh Step Carpet Care",
    greeting:
      "Hi! Welcome to Fresh Step Carpet Care. Looking for a quote, scheduling, or have an urgent spill situation? I'm here to help!",
  },
  Roofing: {
    business: "Summit Roofing Solutions",
    greeting:
      "Hello! Welcome to Summit Roofing Solutions. Inspection, repair, or full replacement — what brings you in today?",
  },
  "Med Spa": {
    business: "Revive Med Spa",
    greeting:
      "Welcome to Revive Med Spa! Looking to book a consultation, learn about treatments, or have a question? I'm happy to help.",
  },
};

// ─────────────────────────────────────────────
// Chat Widget Demo — Enhanced Lead Qualification
// ─────────────────────────────────────────────

type ChatMessage = { role: "user" | "bot"; text: string; id: number };

type LeadData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  appointmentDay: string;
  appointmentTime: string;
};

type FlowStep = {
  key: string;
  botMessage: string;
  storeAs: keyof LeadData | null;
  options?: string[];
};

const NICHE_FLOWS: Record<Niche, FlowStep[]> = {
  Plumbing: [
    {
      key: "service_type",
      botMessage: "What type of plumbing issue are you experiencing?",
      storeAs: "serviceType",
      options: [
        "Drain clog",
        "Leak / burst pipe",
        "Water heater",
        "Toilet issue",
        "Other repair",
      ],
    },
    {
      key: "duration",
      botMessage: "How long has this been going on?",
      storeAs: null,
      options: [
        "Just started",
        "A few hours",
        "1–2 days",
        "Longer than 2 days",
      ],
    },
    {
      key: "flooding",
      botMessage: "Is there any water damage or active flooding right now?",
      storeAs: null,
      options: ["Yes, active flooding", "Minor drip/leak", "No flooding"],
    },
    {
      key: "name",
      botMessage: "Got it — let's get someone out to you. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage: "What's the service address where we'll be coming out?",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your best email address?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "When is the best day for us to come out and take a look?",
      storeAs: "appointmentDay",
      options: ["Today", "Tomorrow", "This week", "Flexible — any day"],
    },
    {
      key: "appt_time",
      botMessage: "What time works best for you?",
      storeAs: "appointmentTime",
      options: ["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"],
    },
  ],
  HVAC: [
    {
      key: "service_type",
      botMessage:
        "Are you having an issue with heating, cooling, or is this routine maintenance?",
      storeAs: "serviceType",
      options: [
        "AC not cooling",
        "Heater not working",
        "Strange noise/smell",
        "Routine tune-up",
      ],
    },
    {
      key: "urgency",
      botMessage: "How urgent is this for you?",
      storeAs: null,
      options: [
        "Emergency — need help today",
        "Within a few days",
        "Just scheduling ahead",
      ],
    },
    {
      key: "system_age",
      botMessage: "Roughly how old is your current HVAC system?",
      storeAs: null,
      options: [
        "Less than 5 years",
        "5–10 years",
        "10–15 years",
        "Over 15 years / unsure",
      ],
    },
    {
      key: "name",
      botMessage: "Great — let's get a technician scheduled. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage: "What's the service address?",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your best email address for confirmation?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "What day works best for our technician to come out?",
      storeAs: "appointmentDay",
      options: ["Today", "Tomorrow", "This week", "Flexible"],
    },
    {
      key: "appt_time",
      botMessage: "What time window works for you?",
      storeAs: "appointmentTime",
      options: ["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"],
    },
  ],
  Restoration: [
    {
      key: "service_type",
      botMessage: "What type of damage are you dealing with?",
      storeAs: "serviceType",
      options: [
        "Water / flood damage",
        "Fire / smoke damage",
        "Mold remediation",
        "Storm damage",
      ],
    },
    {
      key: "timeline",
      botMessage: "When did this happen?",
      storeAs: null,
      options: [
        "Just now / ongoing",
        "Within the last 24 hours",
        "A few days ago",
        "Over a week ago",
      ],
    },
    {
      key: "insurance",
      botMessage: "Will you be filing an insurance claim?",
      storeAs: null,
      options: [
        "Yes, filing a claim",
        "Not sure yet",
        "No, paying out of pocket",
      ],
    },
    {
      key: "name",
      botMessage: "Understood — we're here to help. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage: "What's the property address that needs restoration?",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you at?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your best email address?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "When can we send our assessment team out?",
      storeAs: "appointmentDay",
      options: ["Today — urgent", "Tomorrow", "This week", "Flexible"],
    },
    {
      key: "appt_time",
      botMessage: "What time works best for the assessment?",
      storeAs: "appointmentTime",
      options: ["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"],
    },
  ],
  "Carpet Cleaning": [
    {
      key: "service_type",
      botMessage: "What type of carpet cleaning are you looking for?",
      storeAs: "serviceType",
      options: [
        "Routine deep clean",
        "Stain / spill emergency",
        "Pet odor treatment",
        "Post-move clean",
      ],
    },
    {
      key: "rooms",
      botMessage: "Roughly how many rooms need cleaning?",
      storeAs: null,
      options: ["1–2 rooms", "3–4 rooms", "5+ rooms", "Whole home"],
    },
    {
      key: "material",
      botMessage: "What type of flooring or carpet?",
      storeAs: null,
      options: [
        "Standard carpet",
        "Berber / loop pile",
        "Area rugs",
        "Mixed / unsure",
      ],
    },
    {
      key: "name",
      botMessage: "Awesome — let's get you booked. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage: "What's the address where you need service?",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your email for your booking confirmation?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "What day works best for our crew to come out?",
      storeAs: "appointmentDay",
      options: ["Today", "Tomorrow", "This week", "Flexible"],
    },
    {
      key: "appt_time",
      botMessage: "What time window works best?",
      storeAs: "appointmentTime",
      options: ["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"],
    },
  ],
  Roofing: [
    {
      key: "service_type",
      botMessage: "What's the main reason you're reaching out about your roof?",
      storeAs: "serviceType",
      options: [
        "Repair / fix a leak",
        "Free inspection",
        "Full replacement quote",
        "Storm damage",
      ],
    },
    {
      key: "leaking",
      botMessage: "Is there any active leaking inside the home right now?",
      storeAs: null,
      options: [
        "Yes, actively leaking",
        "Intermittent / after rain",
        "No leak, just damage",
      ],
    },
    {
      key: "roof_age",
      botMessage: "Do you know roughly how old your roof is?",
      storeAs: null,
      options: [
        "Less than 10 years",
        "10–20 years",
        "Over 20 years",
        "Not sure",
      ],
    },
    {
      key: "name",
      botMessage: "We can get someone out to take a look. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage: "What's the property address?",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your best email address?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "When would you like us to come out for the inspection?",
      storeAs: "appointmentDay",
      options: ["Today", "Tomorrow", "This week", "Flexible"],
    },
    {
      key: "appt_time",
      botMessage: "What time works best for you?",
      storeAs: "appointmentTime",
      options: ["Morning (8am–12pm)", "Afternoon (12–5pm)", "Evening (5–8pm)"],
    },
  ],
  "Med Spa": [
    {
      key: "service_type",
      botMessage: "What type of treatment are you most interested in?",
      storeAs: "serviceType",
      options: [
        "Botox / fillers",
        "Laser treatments",
        "Facial / skincare",
        "Body contouring",
        "Consultation",
      ],
    },
    {
      key: "prior_treatment",
      botMessage: "Have you had this type of treatment before?",
      storeAs: null,
      options: [
        "Yes, I'm a returning patient",
        "Yes, at a different spa",
        "No, this is my first time",
      ],
    },
    {
      key: "goal",
      botMessage: "What's your main goal for this visit?",
      storeAs: null,
      options: [
        "Anti-aging / wrinkle reduction",
        "Skin rejuvenation",
        "Body sculpting",
        "Just exploring options",
      ],
    },
    {
      key: "name",
      botMessage:
        "Wonderful! Let's get you booked for a consultation. What's your name?",
      storeAs: "name",
    },
    {
      key: "address",
      botMessage:
        "What city are you located in? (So we can confirm the nearest location)",
      storeAs: "address",
    },
    {
      key: "phone",
      botMessage: "Best phone number to reach you?",
      storeAs: "phone",
    },
    {
      key: "email",
      botMessage: "And your best email for your appointment confirmation?",
      storeAs: "email",
    },
    {
      key: "appt_day",
      botMessage: "What day works best for your consultation?",
      storeAs: "appointmentDay",
      options: ["This week", "Next week", "Within the month", "Flexible"],
    },
    {
      key: "appt_time",
      botMessage: "What time of day works best for you?",
      storeAs: "appointmentTime",
      options: ["Morning (9am–12pm)", "Afternoon (12–5pm)", "Evening (5–7pm)"],
    },
  ],
};

function ChatWidgetDemo() {
  const [niche, setNiche] = useState<Niche>("Plumbing");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState<LeadData | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const stepIndex = useRef(0);
  const leadData = useRef<LeadData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    appointmentDay: "",
    appointmentTime: "",
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const config = NICHE_CONFIGS[niche];

  const resetChat = (n: Niche) => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
    setLeadCaptured(null);
    setCurrentOptions([]);
    stepIndex.current = 0;
    leadData.current = {
      name: "",
      phone: "",
      email: "",
      address: "",
      serviceType: "",
      appointmentDay: "",
      appointmentTime: "",
    };
    setNiche(n);
  };

  const openChat = () => {
    setOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        const greeting = NICHE_CONFIGS[niche].greeting;
        const firstStep = NICHE_FLOWS[niche][0];
        setMessages([{ role: "bot", text: greeting, id: Date.now() }]);
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: firstStep.botMessage, id: Date.now() + 1 },
          ]);
          setCurrentOptions(firstStep.options ?? []);
        }, 800);
      }, 500);
    }
  };

  const sendMessage = (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = { role: "user", text, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setCurrentOptions([]);
    setIsTyping(true);

    const flow = NICHE_FLOWS[niche];
    const currentStepIdx = stepIndex.current;
    const currentStep = flow[currentStepIdx];

    // Store the answer
    if (currentStep?.storeAs) {
      leadData.current[currentStep.storeAs] = text;
    }

    const nextStepIdx = currentStepIdx + 1;
    stepIndex.current = nextStepIdx;

    const delay = 800 + Math.random() * 300;
    setTimeout(() => {
      setIsTyping(false);

      if (nextStepIdx < flow.length) {
        // More steps remaining
        const nextStep = flow[nextStepIdx];
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: nextStep.botMessage, id: Date.now() },
        ]);
        setCurrentOptions(nextStep.options ?? []);
      } else {
        // All steps complete — show confirmation
        const ld = leadData.current;
        const confirmMsg = `Perfect, ${ld.name}! 🎉 We have all your information and our team will be contacting you immediately to confirm your ${ld.appointmentDay} ${ld.appointmentTime} appointment. We\'re looking forward to helping you!`;
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: confirmMsg, id: Date.now() },
        ]);
        // Trigger the notification panel after a short delay
        setTimeout(() => {
          setLeadCaptured({ ...leadData.current });
        }, 600);
      }
    }, delay);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrollRef.current is intentionally excluded
  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const nicheEmailDomain: Record<Niche, string> = {
    Plumbing: "plumbing",
    HVAC: "hvac",
    Restoration: "restoration",
    "Carpet Cleaning": "carpetcleaning",
    Roofing: "roofing",
    "Med Spa": "medspa",
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6 items-start">
      {/* Website preview — left */}
      <div className="lg:col-span-3 relative">
        <div
          className="rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200"
          style={{ minHeight: 420 }}
        >
          {/* Mock browser bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 border-b border-slate-200">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-slate-600 mx-2">
              {config.business.toLowerCase().replace(/\s+/g, "")}.com
            </div>
          </div>
          {/* Mock website content */}
          <div className="p-6">
            <div className="h-8 bg-indigo-600 rounded-lg w-48 mb-4 flex items-center px-3">
              <span className="text-white text-xs font-bold">
                {config.business}
              </span>
            </div>
            <div className="h-24 bg-slate-100 rounded-xl mb-4 flex items-center justify-center">
              <span className="text-slate-600 text-sm">Hero Banner Area</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {["Our Services", "About Us", "Contact"].map((t) => (
                <div
                  key={t}
                  className="h-16 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center"
                >
                  <span className="text-slate-600 text-xs font-medium">
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {["80%", "60%", "70%"].map((w) => (
                <div
                  key={w}
                  className="h-3 bg-slate-100 rounded"
                  style={{ width: w }}
                />
              ))}
            </div>
          </div>

          {/* Chat bubble */}
          <div className="absolute bottom-4 right-4">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  className="absolute bottom-14 right-0 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden"
                  style={{ zIndex: 10 }}
                >
                  {/* Widget header */}
                  <div className="bg-indigo-600 px-4 py-3 flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold text-xs">
                        {config.business}
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                        <span className="text-indigo-200 text-xs">
                          Online — AI Assistant
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="text-indigo-200 hover:text-white text-lg leading-none"
                    >
                      ×
                    </button>
                  </div>

                  {/* Messages */}
                  <div
                    ref={scrollRef}
                    className="h-44 overflow-y-auto p-3 space-y-2 bg-slate-50"
                  >
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${
                            msg.role === "user"
                              ? "bg-indigo-600 text-white"
                              : "bg-white border border-slate-200 text-slate-700 shadow-sm"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-sm">
                          <div className="flex gap-1">
                            {[0, 1, 2].map((i) => (
                              <div
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
                                style={{ animationDelay: `${i * 0.15}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Quick-reply chips */}
                  {currentOptions.length > 0 && (
                    <div className="px-2 pb-1 pt-1 bg-white border-t border-slate-100 flex flex-wrap gap-1">
                      {currentOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => sendMessage(opt)}
                          className="bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-2 border-t border-slate-200 bg-white flex gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      data-ocid="demo.chat.input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 text-xs px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-400 bg-slate-50"
                    />
                    <button
                      type="button"
                      data-ocid="demo.chat.send.button"
                      onClick={() => sendMessage()}
                      className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-500 transition-colors flex-shrink-0"
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              data-ocid="demo.chat.bubble.button"
              onClick={open ? () => setOpen(false) : openChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center shadow-xl hover:bg-indigo-500 transition-colors"
            >
              <MessageSquare size={20} className="text-white" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="lg:col-span-2 space-y-5">
        <div>
          <p className="text-xs font-semibold text-slate-200 uppercase tracking-widest mb-2">
            Try a Different Niche
          </p>
          <Select
            value={niche}
            onValueChange={(v) => {
              resetChat(v as Niche);
            }}
          >
            <SelectTrigger
              data-ocid="demo.chat.niche.select"
              className="bg-slate-800 border-white/10 text-white"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-white/10">
              {(
                [
                  "Plumbing",
                  "HVAC",
                  "Restoration",
                  "Carpet Cleaning",
                  "Roofing",
                  "Med Spa",
                ] as Niche[]
              ).map((n) => (
                <SelectItem
                  key={n}
                  value={n}
                  className="text-slate-200 focus:bg-white/10"
                >
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <button
          type="button"
          data-ocid="demo.chat.open_widget.button"
          onClick={openChat}
          className="w-full py-2.5 rounded-xl border border-indigo-500/40 text-indigo-400 text-sm font-medium hover:bg-indigo-500/10 transition-colors"
        >
          {open ? "Widget is open ↙" : "Click the chat bubble to try it →"}
        </button>

        {/* Business owner notifications — shown after lead captured */}
        <AnimatePresence>
          {leadCaptured && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-4"
              data-ocid="demo.chat.lead_card"
            >
              {/* Green badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-green-500/15 text-green-400 border border-green-500/30 text-xs font-semibold px-3 py-1.5 rounded-full">
                  ✅ Sent in real-time — both notifications delivered in under 3
                  seconds
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-200 uppercase tracking-widest">
                What the Business Owner Receives Instantly
              </p>

              {/* SMS Notification Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="bg-slate-900 rounded-2xl p-4 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    📱 Text Message
                  </span>
                  <span className="text-xs text-slate-400">
                    To: Business Owner
                  </span>
                </div>
                {/* iMessage-style bubble */}
                <div className="flex justify-end">
                  <div className="bg-green-500 text-white text-xs rounded-2xl rounded-br-sm px-4 py-3 max-w-[90%] leading-relaxed whitespace-pre-line">
                    {`🔔 NEW LEAD — ${leadCaptured.serviceType}
Name: ${leadCaptured.name}
Phone: ${leadCaptured.phone}
Address: ${leadCaptured.address}
Appt: ${leadCaptured.appointmentDay} ${leadCaptured.appointmentTime}
Sent via Booked, Ranked & Fundable`}
                  </div>
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-slate-500">Delivered ✓✓</span>
                </div>
              </motion.div>

              {/* Email Notification Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">📧</span>
                  <span className="text-xs font-semibold text-slate-800">
                    Email Notification
                  </span>
                  <span className="ml-auto text-xs text-green-600 font-medium">
                    ● Sent
                  </span>
                </div>
                <div className="space-y-1 text-xs text-slate-600 mb-3 pb-3 border-b border-slate-100">
                  <div>
                    <span className="font-medium text-slate-700">From:</span>{" "}
                    noreply@bookedrankedfundable.com
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">To:</span>{" "}
                    businessowner@{nicheEmailDomain[niche]}.com
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Subject:</span>{" "}
                    <span className="text-slate-800 font-medium">
                      New Lead: {leadCaptured.serviceType} — {leadCaptured.name}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                  <p>
                    A new lead has been qualified through your AI chat widget.
                  </p>
                  <div className="bg-slate-50 rounded-lg p-3 space-y-1 text-slate-700">
                    <div>
                      <span className="font-semibold">Customer:</span>{" "}
                      {leadCaptured.name}
                    </div>
                    <div>
                      <span className="font-semibold">Service Requested:</span>{" "}
                      {leadCaptured.serviceType}
                    </div>
                    <div>
                      <span className="font-semibold">Address:</span>{" "}
                      {leadCaptured.address}
                    </div>
                    <div>
                      <span className="font-semibold">Phone:</span>{" "}
                      {leadCaptured.phone}
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span>{" "}
                      {leadCaptured.email}
                    </div>
                    <div>
                      <span className="font-semibold">
                        Preferred Appointment:
                      </span>{" "}
                      {leadCaptured.appointmentDay},{" "}
                      {leadCaptured.appointmentTime}
                    </div>
                  </div>
                  <p className="text-slate-600">
                    This lead has been added to your CRM dashboard. Reply to
                    this email or log in to follow up.
                  </p>
                  <p className="text-slate-500 text-xs pt-1 border-t border-slate-100">
                    — Booked, Ranked &amp; Fundable
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature list — shown when no lead captured yet */}
        {!leadCaptured && (
          <div className="bg-slate-800 rounded-xl p-4 border border-white/5 space-y-3">
            <p className="text-xs font-semibold text-slate-200 uppercase tracking-widest">
              What your visitors experience
            </p>
            <ul className="space-y-2">
              {[
                "Niche-aware qualifying questions",
                "Captures name, phone, email & address",
                "Schedules appointments automatically",
                "Instant SMS + email to business owner",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle
                    size={14}
                    className="text-indigo-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Fundability Snapshot
// ─────────────────────────────────────────────

type FundForm = {
  businessName: string;
  yearsInBusiness: string;
  monthlyRevenue: string;
  businessType: string;
};

type FundResult = {
  total: number;
  creditProfile: number;
  cashFlow: number;
  legalCompliance: number;
  revenueStability: number;
  gaps: string[];
};

function calculateScore(form: FundForm): FundResult {
  let score = 20;
  const yearMap: Record<string, number> = {
    "<1": 0,
    "1-2": 5,
    "3-5": 12,
    "6-10": 18,
    "10+": 25,
  };
  const revenueMap: Record<string, number> = {
    "<10k": 0,
    "10-25k": 5,
    "25-50k": 10,
    "50-100k": 15,
    "100k+": 20,
  };
  const typeMap: Record<string, number> = {
    sole: 0,
    partnership: 3,
    llc: 8,
    scorp: 10,
    ccorp: 10,
  };
  score += yearMap[form.yearsInBusiness] ?? 0;
  score += revenueMap[form.monthlyRevenue] ?? 0;
  score += typeMap[form.businessType] ?? 0;
  score = Math.min(score, 75);

  const revenueVal = revenueMap[form.monthlyRevenue] ?? 0;
  const yearVal = yearMap[form.yearsInBusiness] ?? 0;
  const typeVal = typeMap[form.businessType] ?? 0;

  const creditProfile = Math.round(score * 0.8);
  const cashFlow = Math.min(Math.round(revenueVal * 4 + 20), 80);
  const legalCompliance = Math.min(typeVal * 5 + 30, 90);
  const revenueStability = Math.min(
    Math.round((yearVal + revenueVal) * 1.5 + 20),
    85,
  );

  const gaps: string[] = [];
  if (form.businessType === "sole") {
    gaps.push(
      "⚠️ Operating as a sole proprietor limits access to business credit lines and SBA financing. An LLC or S-Corp structure can unlock $50K–$250K in business credit.",
    );
  }
  if (["<1", "1-2"].includes(form.yearsInBusiness)) {
    gaps.push(
      "⚠️ Most lenders require 2+ years in business for prime financing. You're building toward this threshold.",
    );
  }
  if (["<10k", "10-25k"].includes(form.monthlyRevenue)) {
    gaps.push(
      "⚠️ Revenue below $25K/month limits loan amounts. Growth in this area directly expands your financing options.",
    );
  }
  if (
    ["llc", "scorp", "ccorp"].includes(form.businessType) &&
    ["3-5", "6-10", "10+"].includes(form.yearsInBusiness) &&
    ["25-50k", "50-100k", "100k+"].includes(form.monthlyRevenue)
  ) {
    gaps.push(
      "✅ Your business structure and tenure qualify you for business lines of credit, equipment financing, and SBA loan programs.",
    );
  }
  if (gaps.length === 0) {
    gaps.push(
      "✅ You're on a solid foundation. A full fundability roadmap will identify your fastest path to premium financing.",
    );
  }

  return {
    total: score,
    creditProfile,
    cashFlow,
    legalCompliance,
    revenueStability,
    gaps,
  };
}

const SCORE_STATUS_MESSAGES = [
  "Analyzing business structure...",
  "Evaluating revenue profile...",
  "Checking credit readiness...",
  "Generating your score...",
];

function ScoreCircle({ score }: { score: number }) {
  const color = score < 35 ? "#ef4444" : score < 55 ? "#f59e0b" : "#22c55e";
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg
        width="140"
        height="140"
        viewBox="0 0 140 140"
        role="img"
        aria-label="Fundability score gauge"
      >
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
        />
        <motion.circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="68"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="28"
          fontWeight="700"
        >
          {score}
        </text>
        <text x="70" y="88" textAnchor="middle" fill="#94a3b8" fontSize="10">
          /100
        </text>
      </svg>
      <span className="text-sm text-slate-200 font-medium mt-1">
        Fundability Score
      </span>
    </div>
  );
}

function PillarCard({
  label,
  value,
  maxVal = 100,
}: { label: string; value: number; maxVal?: number }) {
  const pct = Math.round((value / maxVal) * 100);
  const status =
    pct < 40 ? "Needs attention" : pct < 65 ? "Building" : "Strong";
  const color =
    pct < 40 ? "text-red-400" : pct < 65 ? "text-amber-400" : "text-green-400";
  return (
    <div className="bg-slate-800/60 rounded-xl p-4 border border-white/5">
      <p className="text-xs text-slate-200 mb-1">{label}</p>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-xs font-medium ${color}`}>{status}</span>
      </div>
      <Progress value={pct} className="h-1.5" />
    </div>
  );
}

function FundabilitySnapshot() {
  const [form, setForm] = useState<FundForm>({
    businessName: "",
    yearsInBusiness: "",
    monthlyRevenue: "",
    businessType: "",
  });
  const [phase, setPhase] = useState<"form" | "loading" | "result">("form");
  const [progress, setProgress] = useState(0);
  const [statusMsg, setStatusMsg] = useState(SCORE_STATUS_MESSAGES[0]);
  const [result, setResult] = useState<FundResult | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll to top of snapshot container whenever phase changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: containerRef.current is intentionally excluded
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [phase]);

  const isValid =
    form.businessName &&
    form.yearsInBusiness &&
    form.monthlyRevenue &&
    form.businessType;

  const runSnapshot = () => {
    if (!isValid) return;
    setPhase("loading");
    setProgress(0);
    const computed = calculateScore(form);

    let msgIdx = 0;
    const msgInterval = setInterval(() => {
      msgIdx++;
      if (msgIdx < SCORE_STATUS_MESSAGES.length) {
        setStatusMsg(SCORE_STATUS_MESSAGES[msgIdx]);
      } else {
        clearInterval(msgInterval);
      }
    }, 750);

    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progInterval);
          return 100;
        }
        return p + 2;
      });
    }, 60);

    setTimeout(() => {
      setResult(computed);
      setPhase("result");
    }, 3200);
  };

  if (phase === "loading") {
    return (
      <div
        ref={containerRef}
        className="max-w-lg mx-auto flex flex-col items-center gap-6 py-12"
      >
        <div className="w-16 h-16 rounded-full bg-indigo-600/20 flex items-center justify-center">
          <TrendingUp size={28} className="text-indigo-400 animate-pulse" />
        </div>
        <div className="w-full space-y-3 text-center">
          <p className="text-white font-semibold">{statusMsg}</p>
          <Progress value={progress} className="h-2" />
          <p className="text-slate-200 text-sm">{progress}% complete</p>
        </div>
      </div>
    );
  }

  if (phase === "result" && result) {
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-xl mx-auto space-y-6"
        data-ocid="demo.fundability.result.panel"
      >
        <div className="flex justify-center">
          <ScoreCircle score={result.total} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <PillarCard
            label="Business Credit Profile"
            value={result.creditProfile}
          />
          <PillarCard label="Banking & Cash Flow" value={result.cashFlow} />
          <PillarCard
            label="Legal & Compliance"
            value={result.legalCompliance}
          />
          <PillarCard
            label="Revenue Stability"
            value={result.revenueStability}
          />
        </div>

        <div className="bg-slate-800 rounded-xl p-5 border border-white/5 space-y-3">
          <p className="text-sm font-semibold text-slate-200">Gap Analysis</p>
          {result.gaps.map((g) => (
            <p
              key={g.slice(0, 30)}
              className="text-sm text-slate-200 leading-relaxed"
            >
              {g}
            </p>
          ))}
        </div>

        <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/30 rounded-2xl p-6 border border-indigo-500/20 text-center space-y-3">
          <p className="text-white font-bold text-lg">
            Your full roadmap is ready.
          </p>
          <p className="text-slate-200 text-sm">
            See exactly what steps to take to reach 90+ fundability and unlock
            the financing your business needs.
          </p>
          <Link to="/free-audit">
            <Button
              data-ocid="demo.fundability.strategy_call.button"
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold w-full"
            >
              Book a Strategy Call
            </Button>
          </Link>
          <Link
            to="/free-audit"
            className="block text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            Get Free Audit →
          </Link>
        </div>

        <button
          type="button"
          data-ocid="demo.fundability.reset.button"
          onClick={() => {
            setPhase("form");
            setResult(null);
            setForm({
              businessName: "",
              yearsInBusiness: "",
              monthlyRevenue: "",
              businessType: "",
            });
          }}
          className="w-full py-2 text-slate-200 hover:text-slate-200 text-sm transition-colors"
        >
          ← Run another snapshot
        </button>
      </motion.div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="max-w-lg mx-auto space-y-5"
      data-ocid="demo.fundability.form"
    >
      <div className="space-y-2">
        <label
          htmlFor="fund-business-name"
          className="text-sm font-medium text-slate-200"
        >
          Business Name
        </label>
        <input
          id="fund-business-name"
          type="text"
          data-ocid="demo.fundability.business_name.input"
          value={form.businessName}
          onChange={(e) =>
            setForm((f) => ({ ...f, businessName: e.target.value }))
          }
          placeholder="e.g. North County Plumbing Pros"
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-200">Years in Business</p>
        <Select
          value={form.yearsInBusiness}
          onValueChange={(v) => setForm((f) => ({ ...f, yearsInBusiness: v }))}
        >
          <SelectTrigger
            data-ocid="demo.fundability.years.select"
            className="bg-slate-800 border-white/10 text-white"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-white/10">
            <SelectItem value="<1" className="text-slate-200 focus:bg-white/10">
              Less than 1 year
            </SelectItem>
            <SelectItem
              value="1-2"
              className="text-slate-200 focus:bg-white/10"
            >
              1–2 years
            </SelectItem>
            <SelectItem
              value="3-5"
              className="text-slate-200 focus:bg-white/10"
            >
              3–5 years
            </SelectItem>
            <SelectItem
              value="6-10"
              className="text-slate-200 focus:bg-white/10"
            >
              6–10 years
            </SelectItem>
            <SelectItem
              value="10+"
              className="text-slate-200 focus:bg-white/10"
            >
              10+ years
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-200">Monthly Revenue</p>
        <Select
          value={form.monthlyRevenue}
          onValueChange={(v) => setForm((f) => ({ ...f, monthlyRevenue: v }))}
        >
          <SelectTrigger
            data-ocid="demo.fundability.revenue.select"
            className="bg-slate-800 border-white/10 text-white"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-white/10">
            <SelectItem
              value="<10k"
              className="text-slate-200 focus:bg-white/10"
            >
              Under $10K
            </SelectItem>
            <SelectItem
              value="10-25k"
              className="text-slate-200 focus:bg-white/10"
            >
              $10K–$25K
            </SelectItem>
            <SelectItem
              value="25-50k"
              className="text-slate-200 focus:bg-white/10"
            >
              $25K–$50K
            </SelectItem>
            <SelectItem
              value="50-100k"
              className="text-slate-200 focus:bg-white/10"
            >
              $50K–$100K
            </SelectItem>
            <SelectItem
              value="100k+"
              className="text-slate-200 focus:bg-white/10"
            >
              $100K+
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-200">Business Structure</p>
        <Select
          value={form.businessType}
          onValueChange={(v) => setForm((f) => ({ ...f, businessType: v }))}
        >
          <SelectTrigger
            data-ocid="demo.fundability.type.select"
            className="bg-slate-800 border-white/10 text-white"
          >
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="bg-slate-900 border-white/10">
            <SelectItem
              value="sole"
              className="text-slate-200 focus:bg-white/10"
            >
              Sole Proprietor
            </SelectItem>
            <SelectItem
              value="llc"
              className="text-slate-200 focus:bg-white/10"
            >
              LLC
            </SelectItem>
            <SelectItem
              value="scorp"
              className="text-slate-200 focus:bg-white/10"
            >
              S-Corp
            </SelectItem>
            <SelectItem
              value="ccorp"
              className="text-slate-200 focus:bg-white/10"
            >
              C-Corp
            </SelectItem>
            <SelectItem
              value="partnership"
              className="text-slate-200 focus:bg-white/10"
            >
              Partnership
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        data-ocid="demo.fundability.submit.button"
        onClick={runSnapshot}
        disabled={!isValid}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-base disabled:opacity-70 disabled:cursor-not-allowed"
      >
        Run Fundability Snapshot
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Demo Page
// ─────────────────────────────────────────────

const TABS = [
  { id: "voice", label: "Voice Agent", icon: Phone },
  { id: "chat", label: "Chat Widget", icon: MessageSquare },
  { id: "fundability", label: "Fundability Snapshot", icon: TrendingUp },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState<TabId>("voice");
  const tabContentRef = useRef<HTMLElement>(null);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Also scroll the tab section into view after a brief delay for the animation
    setTimeout(() => {
      tabContentRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <PublicNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative py-20 px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-slate-950 to-slate-950 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 mb-5 text-xs font-semibold tracking-wide px-4 py-1.5">
                LIVE INTERACTIVE DEMO
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight tracking-tight">
                See the Platform
                <br />
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  In Action
                </span>
              </h1>
              <p className="text-lg text-slate-200 max-w-xl mx-auto leading-relaxed">
                Try the AI voice agent, chat widget, and fundability snapshot —
                exactly how your clients experience them. No login required.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab section */}
        <section ref={tabContentRef} className="max-w-6xl mx-auto px-4 pb-20">
          {/* Pill tabs */}
          <div className="flex justify-center mb-10">
            <div className="flex gap-1 bg-slate-900 border border-white/10 rounded-2xl p-1.5">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  data-ocid={`demo.${id}.tab`}
                  onClick={() => handleTabChange(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-900/40"
                      : "text-slate-200 hover:text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <Icon size={15} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="bg-slate-900 border border-white/8 rounded-3xl p-6 md:p-10 shadow-2xl"
            >
              {activeTab === "voice" && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      AI Voice Agent Demo
                    </h2>
                    <p className="text-slate-200 text-sm">
                      Pick a scenario and watch the AI handle the call —
                      capturing the lead automatically.
                    </p>
                  </div>
                  <VoiceAgentDemo />
                </div>
              )}
              {activeTab === "chat" && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Live Chat Widget Demo
                    </h2>
                    <p className="text-slate-200 text-sm">
                      Click the chat bubble on the mock website and type a
                      message — the AI responds in real time.
                    </p>
                  </div>
                  <ChatWidgetDemo />
                </div>
              )}
              {activeTab === "fundability" && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                      Fundability Snapshot
                    </h2>
                    <p className="text-slate-200 text-sm">
                      Enter your business details and get an instant fundability
                      score with your gap analysis and roadmap.
                    </p>
                  </div>
                  <FundabilitySnapshot />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </section>

        {/* Bottom CTA */}
        <section className="border-t border-white/5 py-16 px-4 text-center bg-slate-900/50">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to see this working for your business?
            </h2>
            <p className="text-slate-200 mb-8">
              Get a free audit of your business and see exactly what's costing
              you bookings, rankings, and fundability.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/free-audit">
                <Button
                  data-ocid="demo.cta.get_audit.button"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3 text-base w-full sm:w-auto"
                >
                  Get Free Audit
                </Button>
              </Link>
              <Link to="/free-audit">
                <Button
                  data-ocid="demo.cta.book_demo.button"
                  variant="outline"
                  className="bg-transparent border-white/20 text-white hover:bg-white/10 font-semibold px-8 py-3 text-base w-full sm:w-auto"
                >
                  Book a Demo
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
