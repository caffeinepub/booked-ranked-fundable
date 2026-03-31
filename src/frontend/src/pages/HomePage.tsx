import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "../components/ui/button";

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

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
            BRF
          </div>
          <span className="font-semibold text-gray-900">
            Booked Ranked Fundable
          </span>
        </div>
        <Link to="/login">
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
            The Local Business Growth OS
          </div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Book More. Rank Higher.
            <br />
            <span className="text-indigo-400">Get Fundable.</span>
          </h1>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            The all-in-one platform that helps local service businesses win more
            customers, dominate local search, and access growth capital.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Start Free Trial <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10"
              >
                See Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Three Engines. One Platform.
          </h2>
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
                <div
                  key={title}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                >
                  <div
                    className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}
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
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-center text-gray-500 mb-12">
            No hidden fees. Cancel anytime.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.map(({ name, price, features, featured, color }) => (
              <div
                key={name}
                className={`rounded-xl p-6 border-2 ${color} ${
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-sm py-8 px-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Booked Ranked Fundable. Built on
          Internet Computer Protocol. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
