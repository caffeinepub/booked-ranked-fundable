import { BookDemoModal, BookDemoTrigger } from "@/components/BookDemoModal";
import PublicFooter from "@/components/PublicFooter";
import PublicNav from "@/components/PublicNav";
import AuditFormSection from "@/components/marketing/AuditFormSection";
import FAQSection from "@/components/marketing/FAQSection";
import FinalCTASection from "@/components/marketing/FinalCTASection";
import HeroSection from "@/components/marketing/HeroSection";
import HowItWorksSection from "@/components/marketing/HowItWorksSection";
import ImagineSection from "@/components/marketing/ImagineSection";
import NichePainSection from "@/components/marketing/NichePainSection";
import NoOneElseSection from "@/components/marketing/NoOneElseSection";
import PricingSection from "@/components/marketing/PricingSection";
import StatCallout from "@/components/marketing/StatCallout";
import ThreeEnginesSection from "@/components/marketing/ThreeEnginesSection";
import TrustInfrastructureSection from "@/components/marketing/TrustInfrastructureSection";
import { getNiche } from "@/data/nicheData";
import { useEffect, useState } from "react";

interface NichePageProps {
  nicheKey: string;
}

export default function NichePage({ nicheKey }: NichePageProps) {
  const niche = getNiche(nicheKey);
  const [bookDemoOpen, setBookDemoOpen] = useState(false);

  useEffect(() => {
    if (niche?.seo.title) {
      document.title = niche.seo.title;
    }
    return () => {
      document.title = "Booked Ranked Fundable";
    };
  }, [niche]);

  if (!niche) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <p>Page not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <PublicNav />
      <HeroSection
        headline={niche.heroHeadline}
        subheadline={niche.heroSubheadline}
        bullets={niche.heroBullets}
        nicheKey={niche.key}
        nicheName={niche.name}
      />

      {/* Book a Strategy Call strip */}
      <div className="bg-indigo-950/60 border-y border-indigo-800/40 py-5 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/80 text-sm text-center sm:text-left">
            Want to see exactly how this works for{" "}
            <span className="text-white font-medium">{niche.name}</span>{" "}
            businesses?
          </p>
          <BookDemoTrigger
            label="Book a Strategy Call"
            variant="outline"
            size="sm"
            defaultNiche={niche.name}
            className="bg-transparent border-white/30 text-white hover:bg-white/10 whitespace-nowrap"
          />
        </div>
      </div>

      <ImagineSection lines={niche.imagineLines} />
      <NichePainSection nicheName={niche.name} painPoints={niche.painPoints} />
      <ThreeEnginesSection engines={niche.engines} />
      <NoOneElseSection />
      <AuditFormSection
        headline={niche.auditHeadline}
        subcopy={niche.auditSubcopy}
        nicheKey={niche.key}
        nicheName={niche.name}
      />
      <HowItWorksSection steps={niche.howItWorks} />
      <TrustInfrastructureSection />
      <StatCallout />
      <PricingSection />
      <FAQSection faqs={niche.faqs} />
      <FinalCTASection
        headline={niche.finalCTAHeadline}
        subtext={niche.finalCTASubtext}
        nicheKey={niche.key}
      />

      {/* Book Demo Modal — controlled from this page */}
      <BookDemoModal
        open={bookDemoOpen}
        onOpenChange={setBookDemoOpen}
        defaultNiche={niche.name}
      />

      <PublicFooter />
    </div>
  );
}
