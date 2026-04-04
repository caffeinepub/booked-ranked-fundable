import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import ImagineSection from "@/components/marketing/ImagineSection";
import IndustryCardGrid from "@/components/marketing/IndustryCardGrid";
import NoOneElseSection from "@/components/marketing/NoOneElseSection";
import PricingSection from "@/components/marketing/PricingSection";
import StatCallout from "@/components/marketing/StatCallout";
import TrustInfrastructureSection from "@/components/marketing/TrustInfrastructureSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle2,
  Code2,
  Database,
  DollarSign,
  Globe,
  Lock,
  Shield,
  TrendingUp,
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
    subtitle: "Capture More Leads",
    description:
      "AI-powered lead capture and CRM that responds to every inquiry automatically and keeps your pipeline full.",
    bullets: [
      "Auto-respond to every inquiry 24/7",
      "Manage leads through your pipeline",
      "Never lose a lead to voicemail again",
    ],
  },
  {
    icon: TrendingUp,
    color: "bg-emerald-500",
    title: "Ranked",
    subtitle: "Win More Local Search",
    description:
      "Reputation management and SEO audit engine that improves your visibility where it matters most: local search.",
    bullets: [
      "Monitor and improve Google, Yelp, Facebook reviews",
      "SEO audit with actionable visibility fixes",
      "Citation consistency and Google Maps ranking",
    ],
  },
  {
    icon: DollarSign,
    color: "bg-purple-500",
    title: "Fundable",
    subtitle: "Build a Growth-Ready Business",
    description:
      "Build your business credit profile and fundability score so you're ready for the capital that fuels real growth.",
    bullets: [
      "Fundability score with a clear roadmap",
      "Business credit assessment and checklist",
      "Loan-readiness evaluation and guidance",
    ],
  },
];

const COMPARISON = [
  {
    aspect: "Tool fragmentation",
    others:
      "5 separate subscriptions for CRM, SEO, reviews, booking, and credit",
    brf: "One platform — one login, one dashboard, one growth system",
  },
  {
    aspect: "Data integrity",
    others: "Generic data on shared cloud servers — vulnerable to tampering",
    brf: "Tamper-resistant infrastructure powered by blockchain architecture",
  },
  {
    aspect: "Onboarding",
    others: "DIY setup with no guidance or automation",
    brf: "Done-with-you onboarding plus AI automation from day one",
  },
  {
    aspect: "Funding access",
    others: "Zero support for business credit or funding readiness",
    brf: "Full fundability roadmap with credit builder and loan-readiness",
  },
];

const STEPS = [
  {
    num: "01",
    icon: Zap,
    title: "Run Your Free Audit",
    desc: "See exactly where your business stands — website health, SEO, social presence, and fundability — in under 60 seconds.",
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
    title: "Watch Your Business Grow",
    desc: "More leads captured, more 5-star reviews, better local visibility, and a business profile ready for capital access.",
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
              One Growth System for Local Service Businesses
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
              Book More. Rank Higher.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Get Fundable.
              </span>
            </h1>
            <p className="text-lg text-slate-200 mb-10 max-w-2xl mx-auto leading-relaxed">
              One platform for bookings, rankings, reputation, and fundability —
              built for local service businesses that want to grow without
              juggling five different tools.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/free-audit">
                <Button
                  data-ocid="home.primary_button"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/60 h-12 px-7 text-base font-semibold"
                >
                  Get Free Growth Audit{" "}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/demo-login">
                <Button
                  data-ocid="home.secondary_button"
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-7 text-base"
                >
                  See It Live →
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
              { icon: Lock, text: "Built on ICP blockchain infrastructure" },
              { icon: Shield, text: "Tamper-resistant data integrity" },
              { icon: Check, text: "No long-term contracts" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 text-slate-200 text-sm"
              >
                <Icon size={14} className="text-indigo-400" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <ImagineSection />

      {/* Free Audit CTA */}
      <section className="py-16 px-6 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
            <Zap size={11} /> Free Instant Audit — No Signup Required
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            See What's Costing Your Business Jobs Right Now
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Get an instant audit of your website, SEO, and local presence. No
            signup, no credit card.
          </p>
          <FreeAuditBar />
          <div className="flex items-center justify-center gap-6 mt-5 text-xs text-gray-600 flex-wrap">
            <span className="flex items-center gap-1">
              <Shield size={11} /> No credit card required
            </span>
            <span>✓ Real data from Google PageSpeed</span>
            <span>✓ Social media presence check</span>
          </div>
        </div>
      </section>

      {/* Industry Cards */}
      <IndustryCardGrid />

      {/* Three Engines */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Three Growth Engines
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Tool Your Business Needs. One System.
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Most local businesses run 4-6 disconnected tools. We built
              everything into one platform so nothing falls through the cracks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-slate-50 border border-slate-100 rounded-2xl p-7 hover:shadow-lg transition-shadow"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-5`}
                  >
                    <Icon size={22} className="text-white" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-1">
                    {f.title}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {f.subtitle}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {f.description}
                  </p>
                  <ul className="space-y-2">
                    {f.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-indigo-500 mt-0.5 flex-shrink-0"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-5">
              Simple Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Up and Running in Days, Not Months
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step, i) => {
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xl font-bold mx-auto mb-5 shadow-lg`}
                  >
                    {step.num}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <NoOneElseSection />

      {/* Comparison */}
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Local Businesses Choose BRF
            </h2>
            <p className="text-slate-200 max-w-xl mx-auto">
              Most platforms solve one problem. We built the only system that
              solves all three — bookings, rankings, and fundability — in one
              place.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 pr-6 text-sm font-semibold text-slate-200 w-1/3">
                    What You're Dealing With
                  </th>
                  <th className="text-center py-4 px-4 text-sm font-semibold text-slate-200">
                    Typical Tools
                  </th>
                  <th className="text-center py-4 pl-4 text-sm font-semibold text-indigo-300">
                    Booked Ranked Fundable
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.aspect}
                    className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}
                  >
                    <td className="py-4 pr-6 text-sm font-medium text-slate-200">
                      {row.aspect}
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-200 text-center">
                      <div className="flex items-start gap-2 justify-center">
                        <XCircle
                          size={14}
                          className="text-red-500 mt-0.5 flex-shrink-0"
                        />
                        <span>{row.others}</span>
                      </div>
                    </td>
                    <td className="py-4 pl-4 text-sm text-slate-200 text-center">
                      <div className="flex items-start gap-2 justify-center">
                        <CheckCircle2
                          size={14}
                          className="text-indigo-400 mt-0.5 flex-shrink-0"
                        />
                        <span>{row.brf}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Trust / ICP */}
      <TrustInfrastructureSection />

      {/* Pricing */}
      <StatCallout />

      <PricingSection />

      {/* Final CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300">
                Ready to Stop Losing Jobs to Competitors?
              </span>
            </h2>
            <p className="text-slate-200 mb-10 text-lg max-w-xl mx-auto">
              Get your free growth audit today. See exactly where leads are
              being lost and what it takes to fix it.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link to="/free-audit">
                <Button
                  data-ocid="home.cta.primary_button"
                  size="lg"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/60 h-12 px-8 text-base font-semibold"
                >
                  Get Free Growth Audit{" "}
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link to="/demo-login">
                <Button
                  data-ocid="home.cta.secondary_button"
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 h-12 px-8 text-base"
                >
                  Try Live Demo →
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
