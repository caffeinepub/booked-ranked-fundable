import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const INDUSTRIES = [
  { label: "Plumbing", href: "/plumbing", icon: "🔧" },
  { label: "Restoration", href: "/restoration", icon: "💧" },
  { label: "HVAC", href: "/hvac", icon: "❄️" },
  { label: "Carpet Cleaning", href: "/carpet-cleaning", icon: "✨" },
  { label: "Roofing", href: "/roofing", icon: "🏠" },
  { label: "Med Spa", href: "/med-spa", icon: "💆" },
];

function IndustriesDropdown() {
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
        data-ocid="nav.industries.toggle"
        onClick={() => setOpen((o) => !o)}
        onMouseEnter={() => setOpen(true)}
        className="flex items-center gap-1 text-sm font-medium text-slate-200 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
        aria-expanded={open}
      >
        Industries
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
            className="absolute top-full left-0 mt-2 w-52 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
            data-ocid="nav.industries.dropdown_menu"
          >
            {INDUSTRIES.map(({ label, href, icon }) => (
              <Link
                key={label}
                to={href as any}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors group"
                data-ocid="nav.industries.link"
              >
                <span className="text-lg">{icon}</span>
                <span className="text-sm font-medium text-slate-200 group-hover:text-white">
                  {label}
                </span>
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
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setMobileIndustriesOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-slate-900/97 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "bg-slate-900/85 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-xs tracking-tight shadow-lg">
              BRF
            </div>
            <span className="font-semibold text-white text-sm hidden sm:block">
              Booked Ranked Fundable
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              data-ocid="nav.home.link"
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Home
            </Link>
            <IndustriesDropdown />
            <Link
              to="/pricing"
              data-ocid="nav.pricing.link"
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Pricing
            </Link>
            <Link
              to="/free-audit"
              data-ocid="nav.free_audit.link"
              className="text-sm font-medium text-slate-200 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              Free Audit
            </Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-2">
            <Link to="/login">
              <Button
                data-ocid="nav.login.button"
                variant="ghost"
                size="sm"
                className="text-slate-300 hover:text-white hover:bg-white/10 font-medium"
              >
                Login
              </Button>
            </Link>
            <Link to="/free-audit">
              <Button
                data-ocid="nav.get_audit.button"
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-900/50 font-semibold"
              >
                Get Free Audit
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
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

      {/* Mobile Menu */}
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
              aria-label="Close menu"
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-slate-900 border-l border-white/10 overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-xs">
                    BRF
                  </div>
                  <span className="font-semibold text-white text-sm">Menu</span>
                </div>
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
                <Link
                  to="/"
                  onClick={closeMobile}
                  className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-white">Home</span>
                </Link>

                {/* Industries expandable */}
                <div>
                  <button
                    type="button"
                    data-ocid="nav.mobile_industries.toggle"
                    onClick={() => setMobileIndustriesOpen((o) => !o)}
                    className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <span className="text-sm font-medium text-white">
                      Industries
                    </span>
                    <ChevronDown
                      size={14}
                      className={`text-slate-400 transition-transform duration-200 ${
                        mobileIndustriesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileIndustriesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 py-1 space-y-0.5">
                          {INDUSTRIES.map(({ label, href, icon }) => (
                            <Link
                              key={label}
                              to={href as any}
                              onClick={closeMobile}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                            >
                              <span className="text-base">{icon}</span>
                              <span className="text-sm text-slate-300">
                                {label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/pricing"
                  onClick={closeMobile}
                  className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-white">
                    Pricing
                  </span>
                </Link>

                <Link
                  to="/free-audit"
                  onClick={closeMobile}
                  className="flex items-center px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-medium text-white">
                    Free Audit
                  </span>
                </Link>

                <div className="border-t border-white/10 my-3 pt-3 space-y-2">
                  <Link to="/free-audit" onClick={closeMobile}>
                    <Button
                      data-ocid="nav.mobile_get_audit.button"
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
                    >
                      Get Free Audit
                    </Button>
                  </Link>
                  <Link to="/login" onClick={closeMobile}>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
