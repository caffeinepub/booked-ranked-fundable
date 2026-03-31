import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useApp } from "../context/AppContext";
import { TENANTS } from "../data/demoData";

const ADMIN_USERNAME = "Admin333";
const ADMIN_EMAIL = "daree1933@gmail.com";
const ADMIN_PASSWORD = "Admin333";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tenantId, setTenantId] = useState("tenant-oceanside");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!username.trim()) errs.username = "Username is required";
    if (!email.trim()) errs.email = "Email is required";
    if (!password.trim()) errs.password = "Password is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    const isAdmin =
      username === ADMIN_USERNAME &&
      email === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD;

    if (isAdmin) {
      login("agency", "tenant-oceanside", true);
    } else {
      login("client", tenantId, false);
    }
    navigate({ to: "/dashboard" });
  };

  const isAdminCreds =
    username === ADMIN_USERNAME &&
    email === ADMIN_EMAIL &&
    password === ADMIN_PASSWORD;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-bold text-lg mx-auto mb-4 shadow-lg shadow-indigo-500/30">
            BRF
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-slate-400 text-sm mt-1">Booked Ranked Fundable</p>
        </div>

        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-2xl p-6 space-y-5 shadow-xl">
          <div>
            <Label className="text-sm font-medium text-slate-300 mb-1.5 block">
              Username
            </Label>
            <Input
              data-ocid="login.input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500"
            />
            {errors.username && (
              <p
                data-ocid="login.error_state"
                className="text-red-400 text-xs mt-1"
              >
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-300 mb-1.5 block">
              Email
            </Label>
            <Input
              data-ocid="login.input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500"
            />
            {errors.email && (
              <p
                data-ocid="login.error_state"
                className="text-red-400 text-xs mt-1"
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-300 mb-1.5 block">
              Password
            </Label>
            <Input
              data-ocid="login.input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-slate-700/60 border-slate-600 text-white placeholder:text-slate-500 focus:border-indigo-500"
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {errors.password && (
              <p
                data-ocid="login.error_state"
                className="text-red-400 text-xs mt-1"
              >
                {errors.password}
              </p>
            )}
          </div>

          {!isAdminCreds && username && email && password && (
            <div>
              <Label className="text-sm font-medium text-slate-300 mb-2 block">
                Select Your Business
              </Label>
              <div className="space-y-2">
                {TENANTS.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTenantId(t.id)}
                    className={`w-full text-left py-2.5 px-4 rounded-lg text-sm border transition-colors ${
                      tenantId === t.id
                        ? "bg-indigo-600/30 border-indigo-500 text-indigo-200 font-medium"
                        : "bg-slate-700/40 border-slate-600 text-slate-300 hover:border-indigo-400"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Button
            data-ocid="login.primary_button"
            type="button"
            onClick={handleLogin}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 shadow-lg shadow-indigo-600/20"
          >
            Sign In
          </Button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          &copy; {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </div>
  );
}
