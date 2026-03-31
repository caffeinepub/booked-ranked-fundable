import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import FAQSection from "@/components/marketing/FAQSection";
import FinalCTASection from "@/components/marketing/FinalCTASection";
import PricingSection from "@/components/marketing/PricingSection";
import { useEffect } from "react";

const PRICING_FAQS = [
  {
    question: "What's included in the onboarding fee?",
    answer:
      "The one-time onboarding fee covers full system setup, third-party integrations (Twilio, Google, CRM), initial configuration, and a done-with-you onboarding session to make sure everything is working from day one.",
  },
  {
    question: "Are there long-term contracts?",
    answer:
      "No long-term contracts. All plans are month-to-month. We'd rather earn your business every month than lock you in.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes. You can change plans at any time. Upgrades take effect immediately. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "What's the difference between plans?",
    answer:
      "The Booked plan focuses on lead capture and booking automation. Booked & Ranked adds full local SEO and reputation management. Booked, Ranked & Fundable adds the complete fundability system including business credit assessment and capital readiness guidance.",
  },
  {
    question: "Is there an agency or enterprise option?",
    answer:
      "Yes. If you manage multiple locations or want to white-label the platform for clients, contact us for custom agency pricing.",
  },
  {
    question: "Do I need to provide my own API keys for integrations?",
    answer:
      "Most integrations are handled through our agency-level accounts. For certain features like Google Analytics or SERP data, you may optionally connect your own accounts for richer reporting.",
  },
];

export default function PricingPage() {
  useEffect(() => {
    document.title = "Pricing | Booked Ranked Fundable Growth Plans";
    return () => {
      document.title = "Booked Ranked Fundable";
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      <PublicNav />
      <div className="pt-16">
        <div className="py-16 px-6 bg-gradient-to-b from-slate-950 to-slate-900 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-block bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              Simple, Transparent Pricing
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Invest in Growth. Not Just Software.
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Every plan is a complete growth system — not a collection of
              features you have to figure out yourself.
            </p>
          </div>
        </div>
        <PricingSection />
        <FAQSection faqs={PRICING_FAQS} headline="Pricing Questions" />
        <FinalCTASection
          headline="Ready to Start Growing?"
          subtext="Get your free audit first. We'll show you exactly what's possible for your business before you spend a dollar."
        />
      </div>
      <PublicFooter />
    </div>
  );
}
