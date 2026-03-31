import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Shield } from "lucide-react";
import { motion } from "motion/react";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  bullets: string[];
  nicheKey: string;
  nicheName?: string;
}

export default function HeroSection({
  headline,
  subheadline,
  bullets,
  nicheKey,
  nicheName,
}: HeroSectionProps) {
  const auditLink = `/free-audit?niche=${encodeURIComponent(nicheKey)}`;
  const auditLabel = nicheName
    ? `Get Free ${nicheName} Growth Audit`
    : "Get Free Growth Audit";

  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white pt-28 pb-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block bg-indigo-500/15 border border-indigo-400/25 text-indigo-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8">
            Built for Local Service Businesses
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-300">
              {headline}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex gap-4 justify-center flex-wrap mb-10">
            <Link to={auditLink as any}>
              <Button
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/60 h-13 px-8 text-base font-semibold"
              >
                {auditLabel} <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Button
              data-ocid="hero.secondary_button"
              size="lg"
              variant="outline"
              className="border-white/25 text-white hover:bg-white/10 h-13 px-8 text-base"
              onClick={() => {
                const el = document.getElementById("audit-form");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Book Demo
            </Button>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <Shield size={13} className="text-indigo-400" />
            <span className="text-xs text-slate-400">
              Built on ICP · Tamper-resistant infrastructure · Certified data
              integrity
            </span>
          </div>

          {/* Bullets */}
          {bullets.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto text-left"
            >
              {bullets.map((bullet) => (
                <div key={bullet} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="text-indigo-400 mt-0.5 flex-shrink-0"
                  />
                  <span className="text-sm text-slate-300">{bullet}</span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
