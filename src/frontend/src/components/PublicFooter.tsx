import { Link } from "@tanstack/react-router";

export default function PublicFooter() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-xs">
              BRF
            </div>
            <span className="font-semibold text-white text-sm">
              Booked Ranked Fundable
            </span>
          </div>
          <p className="text-sm text-slate-500 leading-relaxed">
            The only platform that books, ranks, and funds your business — built
            on tamper-proof blockchain infrastructure.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Solutions
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Get Booked
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Get Ranked
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Get Fundable
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Platform
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/free-audit"
                className="hover:text-white transition-colors"
              >
                Free Business Audit
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                SEO Audit
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Chat Widget
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Voice Agent
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                Review Requests
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-4">
            Company
          </p>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/why-us" className="hover:text-white transition-colors">
                Why Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
        <p>
          &copy; {year} Booked Ranked Fundable. Built on Internet Computer
          Protocol.
        </p>
        <p>
          Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
