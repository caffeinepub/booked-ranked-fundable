import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Bot,
  Calendar,
  ChevronDown,
  DollarSign,
  FileSearch,
  Menu,
  Mic,
  Star,
  TrendingUp,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SOLUTIONS = [
  { icon: Calendar, label: "Get Booked", sub: "AI Front Desk", href: "/login" },
  {
    icon: TrendingUp,
    label: "Get Ranked",
    sub: "SEO & Reviews",
    href: "/login",
  },
  {
    icon: DollarSign,
    label: "Get Fundable",
    sub: "Business Credit",
    href: "/login",
  },
];

const PLATFORM = [
  { icon: BarChart3, label: "Live SEO Audit", href: "/login" },
  { icon: FileSearch, label: "Free Business Audit", href: "/free-audit" },
  { icon: Bot, label: "Chat Widget", href: "/login" },
  { icon: Mic, label: "Voice Agent", href: "/login" },
  { icon: Star, label: "Review Requests", href: "/login" },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: {
    icon: React.ElementType;
    label: string;
    sub?: string;
    href: string;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        data-ocid={`nav.${label.toLowerCase().replace(" ", "-")}.toggle`}
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            onMouseLeave={() => setOpen(false)}
            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50"
          >
            {items.map(({ icon: Icon, label: itemLabel, sub, href }) => (
              <Link
                key={itemLabel}
                to={href as any}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center transition-colors">
                  <Icon size={15} className="text-indigo-600" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-900">
                    {itemLabel}
                  </div>
                  {sub && <div className="text-xs text-slate-500">{sub}</div>}
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function PublicNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "bg-slate-900/80 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-lg">
              BRF
            </div>
            <span className="font-semibold text-white text-sm hidden sm:block">
              Booked Ranked Fundable
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <NavDropdown label="Solutions" items={SOLUTIONS} />
            <NavDropdown label="Platform" items={PLATFORM} />
            <Link
              to="/why-us"
              data-ocid="nav.why_us.link"
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Why Us
            </Link>
            <button
              type="button"
              data-ocid="nav.pricing.link"
              onClick={() => scrollTo("pricing")}
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Pricing
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <Link to="/free-audit">
              <Button
                data-ocid="nav.free_audit.button"
                variant="ghost"
                size="sm"
                className="text-indigo-300 hover:text-white hover:bg-indigo-500/20 font-medium"
              >
                Free Audit
              </Button>
            </Link>
            <Link to="/login">
              <Button
                data-ocid="nav.sign_in.button"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <button
            type="button"
            data-ocid="nav.mobile_menu.toggle"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/60 w-full"
              onClick={closeMobile}
              onKeyDown={(e) => e.key === "Escape" && closeMobile()}
              aria-label="Close menu"
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-slate-900 border-l border-white/10 overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <span className="font-semibold text-white text-sm">Menu</span>
                <button
                  type="button"
                  onClick={closeMobile}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 space-y-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2">
                  Solutions
                </p>
                {SOLUTIONS.map(({ icon: Icon, label, sub, href }) => (
                  <Link
                    key={label}
                    to={href as any}
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Icon size={16} className="text-indigo-400" />
                    <div>
                      <div className="text-sm font-medium text-white">
                        {label}
                      </div>
                      {sub && (
                        <div className="text-xs text-slate-400">{sub}</div>
                      )}
                    </div>
                  </Link>
                ))}
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-2 mt-4">
                  Platform
                </p>
                {PLATFORM.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    to={href as any}
                    onClick={closeMobile}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <Icon size={16} className="text-indigo-400" />
                    <span className="text-sm font-medium text-white">
                      {label}
                    </span>
                  </Link>
                ))}
                <div className="border-t border-white/10 my-3" />
                <Link
                  to="/why-us"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-white">Why Us</span>
                </Link>
                <button
                  type="button"
                  onClick={() => scrollTo("pricing")}
                  className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-white">
                    Pricing
                  </span>
                </button>
                <div className="border-t border-white/10 my-3" />
                <Link to="/free-audit" onClick={closeMobile}>
                  <Button className="w-full mb-2 bg-indigo-600 hover:bg-indigo-500 text-white">
                    Get Free Audit
                  </Button>
                </Link>
                <Link to="/login" onClick={closeMobile}>
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
