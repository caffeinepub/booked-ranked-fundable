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
import { useEffect } from "react";

interface NichePageProps {
  nicheKey: string;
}

export default function NichePage({ nicheKey }: NichePageProps) {
  const niche = getNiche(nicheKey);

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
      <PublicFooter />
    </div>
  );
}
