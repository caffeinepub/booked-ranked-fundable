import { Link, useNavigate } from "@tanstack/react-router";
import { Building2, PlayCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useApp } from "../context/AppContext";

const ADMIN_USERNAME = "Admin333";
const ADMIN_EMAIL = "daree1933@gmail.com";
const ADMIN_PASSWORD = "admin123";

const CLIENT_CREDS: Record<string, { tenantId: string }> = {
  "plumbing@demo.com": { tenantId: "tenant-plumbing" },
  "medspa@demo.com": { tenantId: "tenant-medspa" },
  "oceanside@demo.com": { tenantId: "tenant-oceanside" },
};

type Path = "admin" | "client" | null;

export default function LoginPage() {
  const [activePath, setActivePath] = useState<Path>(null);
  const [adminUser, setAdminUser] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPass, setClientPass] = useState("");
  const [clientError, setClientError] = useState("");

  const { login, onboardingComplete, agencyOnboardingComplete } = useApp();
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (
      adminUser === ADMIN_USERNAME &&
      adminEmail === ADMIN_EMAIL &&
      adminPass === ADMIN_PASSWORD
    ) {
      login("agency", "tenant-oceanside", true);
      if (!agencyOnboardingComplete) {
        navigate({ to: "/onboarding" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } else {
      setAdminError("Invalid admin credentials.");
    }
  };

  const handleClientLogin = () => {
    const match = CLIENT_CREDS[clientEmail.toLowerCase()];
    if (match && clientPass === "demo123") {
      login("client", match.tenantId, false);
      if (!onboardingComplete[match.tenantId]) {
        navigate({ to: "/onboarding" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } else {
      setClientError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-indigo-500/30">
          BRF
        </div>
        <h1 className="text-3xl font-bold text-white">
          Booked Ranked Fundable
        </h1>
        <p className="text-slate-200 text-sm mt-2">
          Choose how you'd like to access the platform
        </p>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Admin Card */}
        <div
          className={`bg-slate-800/80 backdrop-blur border rounded-2xl p-6 shadow-xl transition-all ${
            activePath === "admin"
              ? "border-amber-500 shadow-amber-500/20"
              : "border-slate-700"
          }`}
        >
          <button
            type="button"
            className="flex items-center gap-3 mb-4 w-full text-left"
            onClick={() =>
              setActivePath(activePath === "admin" ? null : "admin")
            }
          >
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Platform Administration
              </h2>
              <p className="text-slate-200 text-xs">Full admin access</p>
            </div>
          </button>

          {activePath === "admin" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-slate-200 mb-1 block">
                  Username
                </Label>
                <Input
                  value={adminUser}
                  onChange={(e) => {
                    setAdminUser(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="Admin username"
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-200 focus:border-amber-500 h-9 text-sm"
                  data-ocid="admin.username.input"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-200 mb-1 block">
                  Email
                </Label>
                <Input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => {
                    setAdminEmail(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="Admin email"
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-200 focus:border-amber-500 h-9 text-sm"
                  data-ocid="admin.email.input"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-200 mb-1 block">
                  Password
                </Label>
                <Input
                  type="password"
                  value={adminPass}
                  onChange={(e) => {
                    setAdminPass(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="Password"
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-200 focus:border-amber-500 h-9 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                  data-ocid="admin.password.input"
                />
              </div>
              {adminError && (
                <p
                  className="text-red-400 text-xs"
                  data-ocid="admin.login.error_state"
                >
                  {adminError}
                </p>
              )}
              <Button
                onClick={handleAdminLogin}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold h-9 text-sm"
                data-ocid="admin.login.submit_button"
              >
                Sign In as Admin
              </Button>
            </div>
          ) : (
            <p className="text-slate-200 text-xs">Click to expand login</p>
          )}
        </div>

        {/* Client Card */}
        <div
          className={`bg-slate-800/80 backdrop-blur border rounded-2xl p-6 shadow-xl transition-all ${
            activePath === "client"
              ? "border-indigo-500 shadow-indigo-500/20"
              : "border-slate-700"
          }`}
        >
          <button
            type="button"
            className="flex items-center gap-3 mb-4 w-full text-left"
            onClick={() =>
              setActivePath(activePath === "client" ? null : "client")
            }
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
              <Building2 size={20} className="text-indigo-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Client Dashboard
              </h2>
              <p className="text-slate-200 text-xs">For active subscribers</p>
            </div>
          </button>

          {activePath === "client" ? (
            <div className="space-y-3">
              <div>
                <Label className="text-xs font-medium text-slate-200 mb-1 block">
                  Email
                </Label>
                <Input
                  type="email"
                  value={clientEmail}
                  onChange={(e) => {
                    setClientEmail(e.target.value);
                    setClientError("");
                  }}
                  placeholder="your@email.com"
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-200 focus:border-indigo-500 h-9 text-sm"
                  data-ocid="client.email.input"
                />
              </div>
              <div>
                <Label className="text-xs font-medium text-slate-200 mb-1 block">
                  Password
                </Label>
                <Input
                  type="password"
                  value={clientPass}
                  onChange={(e) => {
                    setClientPass(e.target.value);
                    setClientError("");
                  }}
                  placeholder="Password"
                  className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-200 focus:border-indigo-500 h-9 text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleClientLogin()}
                  data-ocid="client.password.input"
                />
              </div>
              {clientError && (
                <p
                  className="text-red-400 text-xs"
                  data-ocid="client.login.error_state"
                >
                  {clientError}
                </p>
              )}
              <Button
                onClick={handleClientLogin}
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold h-9 text-sm"
                data-ocid="client.login.submit_button"
              >
                Sign In
              </Button>
              <p className="text-slate-200 text-xs text-center pt-1">
                Not a client yet?{" "}
                <Link
                  to="/pricing"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  View plans
                </Link>
              </p>
            </div>
          ) : (
            <p className="text-slate-200 text-xs">Click to expand login</p>
          )}
        </div>

        {/* Demo Card */}
        <div className="relative bg-gradient-to-br from-indigo-900/80 to-purple-900/80 backdrop-blur border border-purple-500/60 rounded-2xl p-6 shadow-xl shadow-purple-500/10 ring-1 ring-purple-500/20">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              No Login Required
            </span>
          </div>
          <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="w-10 h-10 rounded-xl bg-purple-500/30 flex items-center justify-center">
              <PlayCircle size={20} className="text-purple-300" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-sm">
                Try the Platform Live
              </h2>
              <p className="text-purple-300 text-xs">
                See your business on the platform
              </p>
            </div>
          </div>
          <p className="text-slate-200 text-xs leading-relaxed mb-5">
            Enter your business details and we'll generate a live, personalized
            simulation of your dashboard — fully white-labeled to your business
            in 60 seconds.
          </p>
          <Link to="/demo-login">
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold h-10 text-sm shadow-lg shadow-purple-700/30"
              data-ocid="demo.launch.button"
            >
              Launch My Demo →
            </Button>
          </Link>
          <p className="text-purple-400/60 text-[10px] text-center mt-3">
            No credit card · No account · Takes 60 seconds
          </p>
        </div>
      </div>

      <p className="text-center text-xs text-slate-600 mt-8">
        &copy; {new Date().getFullYear()} Booked Ranked Fundable. Built on
        Internet Computer infrastructure.
      </p>
    </div>
  );
}
