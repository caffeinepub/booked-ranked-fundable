import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  Database,
  DollarSign,
  Globe,
  Lock,
  Shield,
  TrendingUp,
  Users,
  XCircle,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const FEATURES = [
  {
    icon: Calendar,
    color: "bg-blue-500",
    title: "Booked",
    subtitle: "Never miss a lead again",
    description:
      "AI-powered lead capture and CRM that books appointments automatically.",
    bullets: [
      "Auto-respond to every inquiry",
      "Manage leads through your pipeline",
      "Track conversion rates",
    ],
  },
  {
    icon: TrendingUp,
    color: "bg-emerald-500",
    title: "Ranked",
    subtitle: "Dominate local search",
    description:
      "Reputation management and SEO audit engine to rank you above competitors.",
    bullets: [
      "Monitor Google, Yelp, Facebook reviews",
      "SEO audit with actionable fixes",
      "Citation consistency tracking",
    ],
  },
  {
    icon: DollarSign,
    color: "bg-purple-500",
    title: "Fundable",
    subtitle: "Get business credit ready",
    description:
      "Build your business credit profile and become fundable for growth capital.",
    bullets: [
      "Fundability score with roadmap",
      "Business credit checklist",
      "Loan-readiness assessment",
    ],
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$197",
    color: "border-gray-200",
    features: [
      "1 business location",
      "Lead CRM (up to 100)",
      "Review monitoring",
      "Basic SEO audit",
      "Email support",
    ],
  },
  {
    name: "Growth",
    price: "$397",
    color: "border-indigo-500",
    featured: true,
    features: [
      "3 business locations",
      "Unlimited leads",
      "Review automation",
      "Full SEO audit suite",
      "Fundability scoring",
      "Priority support",
    ],
  },
  {
    name: "Agency",
    price: "$997",
    color: "border-gray-200",
    features: [
      "Unlimited locations",
      "White-label portal",
      "All Growth features",
      "Agency dashboard",
      "Dedicated account manager",
      "Custom reporting",
    ],
  },
];

const BLOCKCHAIN_TILES = [
  {
    icon: Shield,
    title: "Certified Data",
    desc: "Every record is cryptographically signed. No one can fake your scores.",
  },
  {
    icon: Globe,
    title: "Decentralized Infrastructure",
    desc: "No single point of failure. Always online, always accessible.",
  },
  {
    icon: Code2,
    title: "Transparent Canister Logic",
    desc: "Our smart contracts are publicly auditable on the ICP network.",
  },
  {
    icon: Database,
    title: "True Data Ownership",
    desc: "Your business data belongs to you — secured on-chain, forever.",
  },
];

const COMPARISON = [
  {
    aspect: "Tool fragmentation",
    others: "5 separate subscriptions for CRM, SEO, reviews, booking, credit",
    brf: "All-in-one platform — one login, one dashboard, one price",
  },
  {
    aspect: "Data integrity",
    others: "Generic data on shared cloud servers — editable by anyone",
    brf: "Tamper-proof blockchain records — mathematically certified",
  },
  {
    aspect: "Onboarding",
    others: "DIY setup with no guidance or automation",
    brf: "Done-with-you onboarding + AI automation from day one",
  },
  {
    aspect: "Funding access",
    others: "Zero support for business credit or funding readiness",
    brf: "Full fundability roadmap with credit builder & loan-readiness",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Zap,
    title: "Run Your Free Audit",
    desc: "See exactly where your business stands in 60 seconds — website health, SEO, social presence, and fundability score.",
    color: "from-blue-500 to-indigo-600",
  },
  {
    num: "02",
    icon: TrendingUp,
    title: "Activate Your Growth Engines",
    desc: "Turn on your AI booking assistant, reputation management, and fundability builder — all from one dashboard.",
    color: "from-indigo-500 to-purple-600",
  },
  {
    num: "03",
    icon: DollarSign,
    title: "Watch Your Business Scale",
    desc: "More leads auto-captured, more 5-star reviews flowing in, and real capital access when you're ready to grow.",
    color: "from-purple-500 to-pink-600",
  },
];

function FreeAuditBar() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    navigate({ to: "/free-audit", search: { url: url.trim() } as any });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-xl mx-auto">
      <Input
        data-ocid="home.search_input"
        placeholder="https://yourbusiness.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1 h-12 text-base"
      />
      <Button
        type="submit"
        data-ocid="home.free_audit.submit_button"
        size="lg"
        className="bg-indigo-600 hover:bg-indigo-700 text-white whitespace-nowrap h-12"
      >
        Get Free Audit <ArrowRight size={15} className="ml-1.5" />
      </Button>
    </form>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white" style={{ scrollBehavior: "smooth" }}>
      <PublicNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              The Local Business Growth OS — Built on Blockchain
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Book More. Rank Higher.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Get Fundable.
              </span>
            </h1>
            <p className="text-lg text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              The only platform on earth that books customers, dominates local
              search, and builds your fundability — in one tamper-proof
              ecosystem.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/login">
                <Button
                  data-ocid="home.primary_button"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/60 h-12 px-7 text-base"
                >
                  Start Free Trial <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/free-audit">
                <Button
                  data-ocid="home.secondary_button"
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-12 px-7 text-base"
                >
                  Get Free Audit
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-12 flex-wrap"
          >
            {[
              { icon: Users, text: "Trusted by 500+ local businesses" },
              { icon: Lock, text: "Built on ICP Blockchain" },
              { icon: Check, text: "No contracts, cancel anytime" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-slate-400 text-sm"
              >
                <Icon size={14} className="text-indigo-400" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <Zap size={11} /> Free Instant Audit — No Signup Required
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            See How Your Business Ranks — Free
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Get an instant audit of your website, SEO, and social media
            presence. No signup required.
          </p>
          <FreeAuditBar />
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-gray-400 flex-wrap">
            <span className="flex items-center gap-1">
              <Shield size={11} /> No credit card required
            </span>
            <span>✓ Real data from Google PageSpeed</span>
            <span>✓ Social media presence check</span>
          </div>
        </div>
      </section>

      {/* Only Platform Section */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              Industry First
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight">
              The Only Platform on Earth
              <br />
              <span className="text-indigo-400">That Does All Three</span>
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-14 leading-relaxed">
              Every other tool does one thing. We do{" "}
              <strong className="text-white">Booked + Ranked + Fundable</strong>{" "}
              in a single ecosystem — built on technology that makes it
              impossible to manipulate or fake results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: "3",
                unit: "Growth Engines",
                desc: "in 1 Platform",
                color: "border-blue-500/40 bg-blue-500/10",
              },
              {
                stat: "100%",
                unit: "Tamper-Proof Data",
                desc: "ICP Blockchain",
                color: "border-indigo-500/40 bg-indigo-500/10",
              },
              {
                stat: "30-Day",
                unit: "Average Results",
                desc: "From activation to growth",
                color: "border-purple-500/40 bg-purple-500/10",
              },
            ].map(({ stat, unit, desc, color }) => (
              <motion.div
                key={stat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={`rounded-2xl border p-8 ${color}`}
              >
                <div className="text-5xl font-bold text-white mb-2">{stat}</div>
                <div className="text-lg font-semibold text-slate-200">
                  {unit}
                </div>
                <div className="text-sm text-slate-400 mt-1">{desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blockchain Section */}
      <section id="blockchain" className="py-20 px-6 bg-indigo-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
                Blockchain Infrastructure
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                Built on the Internet Computer —
                <span className="text-indigo-400">
                  {" "}
                  Not Just Another Cloud App
                </span>
              </h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  BRF runs on{" "}
                  <strong className="text-white">
                    Internet Computer Protocol (ICP)
                  </strong>
                  , a decentralized blockchain network developed by DFINITY.
                  Unlike traditional platforms hosted on AWS or Google Cloud —
                  where the company can alter, delete, or manipulate your data —
                  ICP uses cryptographic certification.
                </p>
                <p>
                  Every data record — your reviews, audit scores, lead history,
                  and fundability ratings — is{" "}
                  <strong className="text-white">
                    mathematically verified and tamper-proof
                  </strong>
                  . No one, including us, can fake or manipulate your results.
                </p>
                <p>
                  This means your business reputation is protected by the same
                  technology that secures financial systems — not a startup's
                  promise.
                </p>
              </div>
              <Link to="/why-us">
                <Button
                  data-ocid="blockchain.learn_more.button"
                  className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white"
                >
                  Learn Why This Matters{" "}
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {BLOCKCHAIN_TILES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-3">
                    <Icon size={18} className="text-indigo-400" />
                  </div>
                  <h4 className="font-semibold text-white mb-1 text-sm">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Different */}
      <section id="why-us" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-block bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              The Honest Comparison
            </div>
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Why Smart Business Owners
              <br />
              <span className="text-indigo-600">
                Choose BRF Over Everything Else
              </span>
            </h2>
          </motion.div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Comparison
              </div>
              <div className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-l border-slate-200">
                Other Tools
              </div>
              <div className="px-6 py-4 text-xs font-semibold text-indigo-600 uppercase tracking-wider border-l border-slate-200 bg-indigo-50">
                BRF Platform
              </div>
            </div>
            {COMPARISON.map(({ aspect, others, brf }, i) => (
              <div
                key={aspect}
                className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${
                  i % 2 === 1 ? "bg-slate-50/50" : "bg-white"
                }`}
              >
                <div className="px-6 py-5">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {aspect}
                  </span>
                </div>
                <div className="px-6 py-5 border-l border-slate-100 flex gap-2">
                  <XCircle
                    size={16}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-slate-500">{others}</p>
                </div>
                <div className="px-6 py-5 border-l border-slate-100 bg-indigo-50/50 flex gap-2">
                  <CheckCircle2
                    size={16}
                    className="text-emerald-500 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-sm text-slate-700 font-medium">{brf}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-10 text-center text-white"
          >
            <h3 className="text-2xl font-bold mb-2">
              The Easiest Choice You'll Make This Year
            </h3>
            <p className="text-indigo-200 mb-8 max-w-lg mx-auto">
              Stop paying for five tools that don't talk to each other. Start
              winning with one platform built for your growth.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/login">
                <Button
                  data-ocid="why_us.start_trial.primary_button"
                  size="lg"
                  className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-lg h-12 px-7"
                >
                  Start Free Trial <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/free-audit">
                <Button
                  data-ocid="why_us.free_audit.secondary_button"
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 h-12 px-7"
                >
                  Get Free Audit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">
              Up and Running in{" "}
              <span className="text-indigo-600">3 Simple Steps</span>
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              No complicated setup. No tech expertise required. Just results.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-16 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-0.5 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map(({ num, icon: Icon, title, desc, color }, i) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg relative z-10`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="text-xs font-bold text-indigo-500 mb-1 tracking-widest">
                    STEP {num}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3 tracking-tight">
            Three Engines. One Platform.
          </h2>
          <p className="text-center text-slate-500 mb-12">
            Each engine is powerful on its own. Together, they're unstoppable.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map(
              ({
                icon: Icon,
                color,
                title,
                subtitle,
                description,
                bullets,
              }) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div
                    className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                  <p className="text-sm text-indigo-600 font-medium mb-2">
                    {subtitle}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">{description}</p>
                  <ul className="space-y-1.5">
                    {bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <Check
                          size={14}
                          className="text-emerald-500 flex-shrink-0"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-500 mb-12">
            No hidden fees. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, features, featured, color }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border-2 ${color} ${
                  featured ? "shadow-xl relative" : "shadow-sm"
                } bg-white`}
              >
                {featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                <div className="mt-2 mb-6">
                  <span className="text-3xl font-bold text-gray-900">
                    {price}
                  </span>
                  <span className="text-gray-500">/mo</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check size={14} className="text-emerald-500" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/login">
                  <Button
                    data-ocid={`pricing.${name.toLowerCase()}.primary_button`}
                    className={`w-full ${
                      featured
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : ""
                    }`}
                    variant={featured ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
