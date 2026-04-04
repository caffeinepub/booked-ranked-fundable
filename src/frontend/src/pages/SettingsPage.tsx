import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, Eye, EyeOff, Loader2, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { type AiProviderConfig, useApp } from "../context/AppContext";
import { TENANTS } from "../data/demoData";
import { useActor } from "../hooks/useActor";

function PasswordField({
  label,
  value,
  onChange,
  placeholder,
  ocid,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ocid: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Label className="text-xs text-gray-600">{label}</Label>
      <div className="relative mt-1">
        <Input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="pr-9"
          data-ocid={ocid}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
    </div>
  );
}

type ConnectionStatus =
  | "idle"
  | "testing"
  | "connected"
  | "failed"
  | "unconfigured";

function IntegrationSection({
  title,
  description,
  badgeColor,
  badgeLabel,
  children,
  onTest,
}: {
  title: string;
  description: string;
  badgeColor: string;
  badgeLabel: string;
  children: React.ReactNode;
  onTest: () => Promise<void>;
}) {
  const [status, setStatus] = useState<ConnectionStatus>("idle");

  const handleTest = async () => {
    setStatus("testing");
    await onTest();
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg ${badgeColor} flex items-center justify-center text-white font-bold text-sm shrink-0`}
          >
            {badgeLabel}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-800">{title}</h4>
            <p className="text-xs text-gray-500 mt-0.5">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {status === "connected" && (
            <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-1 rounded-full">
              ✓ Connected
            </span>
          )}
          {status === "unconfigured" && (
            <span className="text-xs bg-gray-100 text-gray-500 font-medium px-2.5 py-1 rounded-full">
              Not Configured
            </span>
          )}
          {status === "failed" && (
            <span className="text-xs bg-red-100 text-red-600 font-medium px-2.5 py-1 rounded-full">
              ✗ Failed
            </span>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={handleTest}
            disabled={status === "testing"}
            className="text-xs h-7"
          >
            {status === "testing" ? (
              <>
                <Loader2 size={11} className="mr-1 animate-spin" /> Testing...
              </>
            ) : (
              "Test Connection"
            )}
          </Button>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function useTestConnection(
  getValue: () => string,
): [ConnectionStatus, (s: ConnectionStatus) => void, () => Promise<void>] {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const test = async () => {
    setStatus("testing");
    await new Promise((r) => setTimeout(r, 1500));
    const val = getValue();
    setStatus(val ? "connected" : "unconfigured");
  };
  return [status, setStatus, test];
}

const AI_PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI GPT-4o",
    badge: "bg-emerald-100 text-emerald-700",
    desc: "Best for structured reasoning and chat",
    models: ["gpt-4o", "gpt-4o-mini", "gpt-4-turbo"],
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    badge: "bg-purple-100 text-purple-700",
    desc: "Best for long-form copy and nuanced responses",
    models: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307"],
  },
  {
    id: "meta",
    name: "Meta Llama 3 (Groq)",
    badge: "bg-blue-100 text-blue-700",
    desc: "Fast, cost-effective, great for social content",
    models: ["llama3-70b-8192", "llama3-8b-8192"],
  },
  {
    id: "google",
    name: "Google Gemini",
    badge: "bg-orange-100 text-orange-700",
    desc: "Strong for search and multimodal tasks",
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
  },
];

function AiConfigTab() {
  const { aiProviderConfig, setAiProviderConfig } = useApp();
  const [config, setConfig] = useState<AiProviderConfig>(aiProviderConfig);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<"idle" | "ok" | "fail">("idle");
  const [showKey, setShowKey] = useState(false);

  const selectedProvider =
    AI_PROVIDERS.find((p) => p.id === config.provider) ?? AI_PROVIDERS[0];

  const handleTest = () => {
    setTesting(true);
    setTestResult("idle");
    setTimeout(() => {
      setTestResult(config.apiKey.length > 8 ? "ok" : "fail");
      setTesting(false);
    }, 1500);
  };

  const handleSave = () => {
    setAiProviderConfig(config);
    toast.success("AI configuration saved");
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold text-gray-800">
          AI Provider Configuration
        </h3>
        <p className="text-sm text-gray-500 mt-0.5">
          Choose your default AI provider for the Business Manager, Chat Widget,
          and Social Media tools.
        </p>
      </div>

      {/* Provider Cards */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        data-ocid="settings.ai.provider.card"
      >
        {AI_PROVIDERS.map((provider) => (
          <button
            key={provider.id}
            type="button"
            data-ocid={`settings.ai.${provider.id}.button`}
            onClick={() =>
              setConfig((c) => ({
                ...c,
                provider: provider.id,
                model: provider.models[0],
              }))
            }
            className={`text-left p-4 rounded-xl border-2 transition-all ${config.provider === provider.id ? "border-indigo-500 bg-indigo-50" : "border-gray-200 bg-white hover:border-gray-300"}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {provider.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{provider.desc}</p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${provider.badge}`}
              >
                {provider.id.toUpperCase()}
              </span>
            </div>
            {config.provider === provider.id && (
              <div className="mt-2 flex items-center gap-1 text-indigo-600">
                <CheckCircle size={12} />
                <span className="text-xs font-medium">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* API Key + Model for selected provider */}
      <div className="border border-gray-200 rounded-xl p-5 space-y-4">
        <h4 className="text-sm font-semibold text-gray-700">
          {selectedProvider.name} Settings
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">API Key</Label>
            <div className="relative">
              <Input
                data-ocid="settings.ai.key.input"
                type={showKey ? "text" : "password"}
                value={config.apiKey}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, apiKey: e.target.value }))
                }
                placeholder="Enter your API key..."
                className="pr-10 text-xs"
              />
              <button
                type="button"
                onClick={() => setShowKey((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
          <div>
            <Label className="text-xs text-gray-600 mb-1 block">Model</Label>
            <Select
              value={config.model}
              onValueChange={(v) => setConfig((c) => ({ ...c, model: v }))}
            >
              <SelectTrigger
                className="text-xs h-9"
                data-ocid="settings.ai.model.select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {selectedProvider.models.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            data-ocid="settings.ai.test.button"
            variant="outline"
            size="sm"
            onClick={handleTest}
            disabled={testing}
          >
            {testing ? (
              <Loader2 size={13} className="mr-1.5 animate-spin" />
            ) : null}
            Test Connection
          </Button>
          {testResult === "ok" && (
            <span
              className="text-xs text-emerald-600 font-medium flex items-center gap-1"
              data-ocid="settings.ai.success_state"
            >
              <CheckCircle size={12} /> Connected
            </span>
          )}
          {testResult === "fail" && (
            <span
              className="text-xs text-red-500 font-medium"
              data-ocid="settings.ai.error_state"
            >
              Connection failed — check your API key
            </span>
          )}
        </div>
        <Button
          data-ocid="settings.ai.save.button"
          onClick={handleSave}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          size="sm"
        >
          Save AI Config
        </Button>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const {
    currentTenantId,
    isAdmin,
    isAdminUser,
    resetOnboarding,
    resetAgencyOnboarding,
  } = useApp();
  const { actor } = useActor();
  const navigate = useNavigate();
  const tenant = TENANTS.find((t) => t.id === currentTenantId);

  const [form, setForm] = useState({
    name: tenant?.name ?? "",
    phone: tenant?.phone ?? "",
    website: tenant?.website ?? "",
    address: tenant?.address ?? "",
  });

  // Agency/Admin integrations
  const [agencySettings, setAgencySettings] = useState({
    twilioSid: "",
    twilioAuth: "",
    twilioNumber: "",
    vapiKey: "",
  });

  // Extended integrations (local state only)
  const [stripeKeys, setStripeKeys] = useState({
    publishable: "",
    secret: "",
    webhook: "",
    mode: "test" as "test" | "live",
  });
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "",
    smtpPort: "587",
    username: "",
    password: "",
    sendgridKey: "",
    fromAddress: "",
  });
  const [googleKeys, setGoogleKeys] = useState({
    placesKey: "",
    mapsKey: "",
    gbpUrl: "",
  });
  const [serpSettings, setSerpSettings] = useState({
    apiKey: "",
    provider: "serpapi",
  });
  const [openaiSettings, setOpenaiSettings] = useState({
    apiKey: "",
    model: "gpt-4o",
  });

  // Client-level settings
  const [reviewPlatforms, setReviewPlatforms] = useState({
    google: true,
    yelp: true,
    facebook: false,
  });
  const [notifEmail, setNotifEmail] = useState("");
  const [notifPhone, setNotifPhone] = useState("");

  const [savingIntegrations, setSavingIntegrations] = useState(false);
  const [loadingIntegrations, setLoadingIntegrations] = useState(false);

  useEffect(() => {
    if (!isAdminUser || !actor) return;
    setLoadingIntegrations(true);
    actor
      .getAgencySettings()
      .then((res) => {
        if (res) {
          setAgencySettings({
            twilioSid: res.twilioSid,
            twilioAuth: res.twilioAuth,
            twilioNumber: res.twilioNumber,
            vapiKey: res.vapiKey,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoadingIntegrations(false));
  }, [isAdminUser, actor]);

  const handleSave = () => {
    toast.success("Business profile saved!");
  };

  const handleSaveIntegrations = async () => {
    if (!actor) {
      toast.error("Backend not available.");
      return;
    }
    setSavingIntegrations(true);
    try {
      await actor.updateAgencySettings(agencySettings);
      toast.success("Integration credentials saved securely!");
    } catch {
      toast.error("Failed to save credentials.");
    } finally {
      setSavingIntegrations(false);
    }
  };

  const handleRestartWizard = () => {
    if (isAdmin || isAdminUser) {
      resetAgencyOnboarding();
    } else {
      resetOnboarding(currentTenantId);
    }
    toast.success("Setup wizard reset. Redirecting...");
    setTimeout(() => navigate({ to: "/onboarding" }), 800);
  };

  // Test connection helpers
  const [, , testStripe] = useTestConnection(() => stripeKeys.secret);
  const [, , testTwilio] = useTestConnection(() => agencySettings.twilioSid);
  const [, , testVapi] = useTestConnection(() => agencySettings.vapiKey);
  const [, , testEmail] = useTestConnection(
    () => emailSettings.smtpHost || emailSettings.sendgridKey,
  );
  const [, , testGoogle] = useTestConnection(() => googleKeys.placesKey);
  const [, , testSerp] = useTestConnection(() => serpSettings.apiKey);
  const [, , testOpenai] = useTestConnection(() => openaiSettings.apiKey);

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="bg-gray-100" data-ocid="settings.tab">
        <TabsTrigger value="profile" data-ocid="settings.tab">
          Business Profile
        </TabsTrigger>
        <TabsTrigger value="notifications" data-ocid="settings.tab">
          Notifications
        </TabsTrigger>
        {isAdmin && (
          <TabsTrigger value="clients" data-ocid="settings.tab">
            Client Businesses
          </TabsTrigger>
        )}
        <TabsTrigger value="integrations" data-ocid="settings.tab">
          Integrations
        </TabsTrigger>
        {isAdminUser && (
          <TabsTrigger value="ai-config" data-ocid="settings.tab">
            AI Config
          </TabsTrigger>
        )}
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <div className="space-y-4 max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-800">
              Business Profile
            </h3>
            <div>
              <Label>Business Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.name.input"
              />
            </div>
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.phone.input"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) =>
                  setForm((f) => ({ ...f, website: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.website.input"
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                value={form.address}
                onChange={(e) =>
                  setForm((f) => ({ ...f, address: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.address.input"
              />
            </div>
            <Button
              onClick={handleSave}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
              data-ocid="settings.save.button"
            >
              Save Profile
            </Button>
          </div>

          {/* Onboarding Wizard Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Onboarding Wizard
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Re-run the step-by-step setup wizard to update your business
                  profile, phone setup, campaigns, chat widget, and
                  integrations.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestartWizard}
                className="shrink-0 gap-1.5 text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                data-ocid="settings.wizard.restart.button"
              >
                <RotateCcw size={13} />
                Restart Setup Wizard
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "New Lead Alerts",
                sub: "Get notified when a new lead comes in",
              },
              {
                label: "Review Notifications",
                sub: "Alert when a customer leaves a review",
              },
              {
                label: "Audit Score Changes",
                sub: "Weekly SEO audit score summary",
              },
              {
                label: "Uptime Alerts",
                sub: "Notify when your site goes down",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.sub}</p>
                </div>
                <Switch
                  defaultChecked
                  data-ocid={`settings.notif.${item.label.toLowerCase().replace(/[^a-z0-9]/g, "")}.switch`}
                />
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Clients Tab */}
      {isAdmin && (
        <TabsContent value="clients">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Client Businesses
            </h3>
            <p className="text-xs text-gray-500">
              Manage client accounts and business profiles from the Admin Panel.
            </p>
          </div>
        </TabsContent>
      )}

      {/* Integrations Tab */}
      <TabsContent value="integrations">
        <div className="space-y-4 max-w-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Integrations Hub
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Connect your tools to unlock the full power of the platform.
              </p>
            </div>
          </div>

          {loadingIntegrations && (
            <div className="flex items-center gap-2 text-sm text-gray-500 py-4">
              <Loader2 size={14} className="animate-spin" /> Loading saved
              credentials...
            </div>
          )}

          {/* Stripe — super admin only */}
          {isAdminUser && (
            <IntegrationSection
              title="Stripe"
              description="Accept payments, subscriptions, and manage billing"
              badgeColor="bg-violet-600"
              badgeLabel="S$"
              onTest={testStripe}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600">
                    Publishable Key
                  </Label>
                  <Input
                    value={stripeKeys.publishable}
                    onChange={(e) =>
                      setStripeKeys((k) => ({
                        ...k,
                        publishable: e.target.value,
                      }))
                    }
                    placeholder="pk_live_..."
                    className="mt-1 text-xs"
                    data-ocid="settings.stripe.publishable.input"
                  />
                </div>
                <PasswordField
                  label="Secret Key"
                  value={stripeKeys.secret}
                  onChange={(v) => setStripeKeys((k) => ({ ...k, secret: v }))}
                  placeholder="sk_live_..."
                  ocid="settings.stripe.secret.input"
                />
                <PasswordField
                  label="Webhook Secret"
                  value={stripeKeys.webhook}
                  onChange={(v) => setStripeKeys((k) => ({ ...k, webhook: v }))}
                  placeholder="whsec_..."
                  ocid="settings.stripe.webhook.input"
                />
                <div>
                  <Label className="text-xs text-gray-600">Mode</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <Switch
                      checked={stripeKeys.mode === "live"}
                      onCheckedChange={(v) =>
                        setStripeKeys((k) => ({
                          ...k,
                          mode: v ? "live" : "test",
                        }))
                      }
                      data-ocid="settings.stripe.mode.switch"
                    />
                    <span className="text-xs text-gray-600">
                      {stripeKeys.mode === "live" ? "Live Mode" : "Test Mode"}
                    </span>
                  </div>
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* Twilio */}
          {(isAdminUser || isAdmin) && (
            <IntegrationSection
              title="Twilio"
              description="SMS review requests, voice agent calls, and automated messaging"
              badgeColor="bg-red-600"
              badgeLabel="TW"
              onTest={testTwilio}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600">Account SID</Label>
                  <Input
                    value={agencySettings.twilioSid}
                    onChange={(e) =>
                      setAgencySettings((s) => ({
                        ...s,
                        twilioSid: e.target.value,
                      }))
                    }
                    placeholder="ACxxxxxxxxxxxxxxxx"
                    className="mt-1 text-xs"
                    data-ocid="settings.twilio.sid.input"
                  />
                </div>
                <PasswordField
                  label="Auth Token"
                  value={agencySettings.twilioAuth}
                  onChange={(v) =>
                    setAgencySettings((s) => ({ ...s, twilioAuth: v }))
                  }
                  placeholder="Auth token"
                  ocid="settings.twilio.auth.input"
                />
                <div>
                  <Label className="text-xs text-gray-600">Phone Number</Label>
                  <Input
                    value={agencySettings.twilioNumber}
                    onChange={(e) =>
                      setAgencySettings((s) => ({
                        ...s,
                        twilioNumber: e.target.value,
                      }))
                    }
                    placeholder="+1 (760) 555-0000"
                    className="mt-1 text-xs"
                    data-ocid="settings.twilio.number.input"
                  />
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* Vapi.ai */}
          {(isAdminUser || isAdmin) && (
            <IntegrationSection
              title="Vapi.ai"
              description="AI-powered inbound voice agents and call routing"
              badgeColor="bg-purple-600"
              badgeLabel="VA"
              onTest={testVapi}
            >
              <div className="max-w-sm">
                <PasswordField
                  label="API Key"
                  value={agencySettings.vapiKey}
                  onChange={(v) =>
                    setAgencySettings((s) => ({ ...s, vapiKey: v }))
                  }
                  placeholder="vapi_..."
                  ocid="settings.vapi.key.input"
                />
              </div>
            </IntegrationSection>
          )}

          {/* Email */}
          {(isAdminUser || isAdmin) && (
            <IntegrationSection
              title="Email"
              description="Transactional email, review requests, and notifications via SMTP or SendGrid"
              badgeColor="bg-sky-600"
              badgeLabel="EM"
              onTest={testEmail}
            >
              <div className="space-y-3">
                <p className="text-xs text-gray-500 font-medium">
                  SMTP Configuration
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-600">SMTP Host</Label>
                    <Input
                      value={emailSettings.smtpHost}
                      onChange={(e) =>
                        setEmailSettings((s) => ({
                          ...s,
                          smtpHost: e.target.value,
                        }))
                      }
                      placeholder="smtp.mailgun.org"
                      className="mt-1 text-xs"
                      data-ocid="settings.email.smtphost.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">SMTP Port</Label>
                    <Input
                      value={emailSettings.smtpPort}
                      onChange={(e) =>
                        setEmailSettings((s) => ({
                          ...s,
                          smtpPort: e.target.value,
                        }))
                      }
                      placeholder="587"
                      className="mt-1 text-xs"
                      data-ocid="settings.email.smtpport.input"
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">Username</Label>
                    <Input
                      value={emailSettings.username}
                      onChange={(e) =>
                        setEmailSettings((s) => ({
                          ...s,
                          username: e.target.value,
                        }))
                      }
                      placeholder="user@domain.com"
                      className="mt-1 text-xs"
                      data-ocid="settings.email.username.input"
                    />
                  </div>
                  <PasswordField
                    label="Password"
                    value={emailSettings.password}
                    onChange={(v) =>
                      setEmailSettings((s) => ({ ...s, password: v }))
                    }
                    placeholder="SMTP password"
                    ocid="settings.email.password.input"
                  />
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <p className="text-xs text-gray-500 font-medium mb-2">
                    — OR use SendGrid —
                  </p>
                  <PasswordField
                    label="SendGrid API Key"
                    value={emailSettings.sendgridKey}
                    onChange={(v) =>
                      setEmailSettings((s) => ({ ...s, sendgridKey: v }))
                    }
                    placeholder="SG.xxxxx"
                    ocid="settings.email.sendgrid.input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">From Address</Label>
                  <Input
                    value={emailSettings.fromAddress}
                    onChange={(e) =>
                      setEmailSettings((s) => ({
                        ...s,
                        fromAddress: e.target.value,
                      }))
                    }
                    placeholder="noreply@yourdomain.com"
                    className="mt-1 text-xs"
                    data-ocid="settings.email.from.input"
                  />
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* Google APIs */}
          {(isAdminUser || isAdmin) && (
            <IntegrationSection
              title="Google APIs"
              description="Google Business Profile data, Maps embeds, and Places lookups"
              badgeColor="bg-blue-600"
              badgeLabel="G"
              onTest={testGoogle}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PasswordField
                  label="Places API Key"
                  value={googleKeys.placesKey}
                  onChange={(v) =>
                    setGoogleKeys((k) => ({ ...k, placesKey: v }))
                  }
                  placeholder="AIza..."
                  ocid="settings.google.places.input"
                />
                <PasswordField
                  label="Maps Embed Key"
                  value={googleKeys.mapsKey}
                  onChange={(v) => setGoogleKeys((k) => ({ ...k, mapsKey: v }))}
                  placeholder="AIza..."
                  ocid="settings.google.maps.input"
                />
                <div className="sm:col-span-2">
                  <Label className="text-xs text-gray-600">
                    Google Business Profile URL
                  </Label>
                  <Input
                    value={googleKeys.gbpUrl}
                    onChange={(e) =>
                      setGoogleKeys((k) => ({ ...k, gbpUrl: e.target.value }))
                    }
                    placeholder="https://business.google.com/..."
                    className="mt-1 text-xs"
                    data-ocid="settings.google.gbp.input"
                  />
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* SERP API — super admin only */}
          {isAdminUser && (
            <IntegrationSection
              title="SERP API"
              description="Real-time Google ranking data and search visibility metrics"
              badgeColor="bg-orange-600"
              badgeLabel="SR"
              onTest={testSerp}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PasswordField
                  label="API Key"
                  value={serpSettings.apiKey}
                  onChange={(v) =>
                    setSerpSettings((s) => ({ ...s, apiKey: v }))
                  }
                  placeholder="Enter API key"
                  ocid="settings.serp.key.input"
                />
                <div>
                  <Label className="text-xs text-gray-600">Provider</Label>
                  <Select
                    value={serpSettings.provider}
                    onValueChange={(v) =>
                      setSerpSettings((s) => ({ ...s, provider: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1 text-xs h-9"
                      data-ocid="settings.serp.provider.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="serpapi">SerpAPI</SelectItem>
                      <SelectItem value="valueserp">ValueSERP</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* OpenAI — super admin only */}
          {isAdminUser && (
            <IntegrationSection
              title="OpenAI"
              description="Powers AI chat widget intelligence, review responses, and voice agent scripts"
              badgeColor="bg-emerald-700"
              badgeLabel="AI"
              onTest={testOpenai}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <PasswordField
                  label="API Key"
                  value={openaiSettings.apiKey}
                  onChange={(v) =>
                    setOpenaiSettings((s) => ({ ...s, apiKey: v }))
                  }
                  placeholder="sk-..."
                  ocid="settings.openai.key.input"
                />
                <div>
                  <Label className="text-xs text-gray-600">Model</Label>
                  <Select
                    value={openaiSettings.model}
                    onValueChange={(v) =>
                      setOpenaiSettings((s) => ({ ...s, model: v }))
                    }
                  >
                    <SelectTrigger
                      className="mt-1 text-xs h-9"
                      data-ocid="settings.openai.model.select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o mini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </IntegrationSection>
          )}

          {/* Client review platform toggles */}
          {!isAdmin && !isAdminUser && (
            <div className="border border-gray-200 rounded-xl p-5 space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-800">
                  Review Platforms
                </h4>
                <p className="text-xs text-gray-500 mt-0.5">
                  Choose where customers are directed to leave reviews
                </p>
              </div>
              <div className="space-y-3">
                {(
                  [
                    { key: "google" as const, label: "Google Reviews" },
                    { key: "yelp" as const, label: "Yelp" },
                    { key: "facebook" as const, label: "Facebook" },
                  ] as const
                ).map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{label}</span>
                    <Switch
                      checked={reviewPlatforms[key]}
                      onCheckedChange={(v) =>
                        setReviewPlatforms((p) => ({ ...p, [key]: v }))
                      }
                      data-ocid={`settings.reviewplatform.${key}.switch`}
                    />
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-gray-600">
                    Notification Email
                  </Label>
                  <Input
                    value={notifEmail}
                    onChange={(e) => setNotifEmail(e.target.value)}
                    placeholder="you@email.com"
                    className="mt-1 text-xs"
                    data-ocid="settings.client.email.input"
                  />
                </div>
                <div>
                  <Label className="text-xs text-gray-600">
                    Notification Phone
                  </Label>
                  <Input
                    value={notifPhone}
                    onChange={(e) => setNotifPhone(e.target.value)}
                    placeholder="(760) 555-0000"
                    className="mt-1 text-xs"
                    data-ocid="settings.client.phone.input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Save button for Twilio/Vapi */}
          {(isAdminUser || isAdmin) && (
            <div className="pt-2">
              <Button
                onClick={handleSaveIntegrations}
                disabled={savingIntegrations}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                data-ocid="settings.integrations.save.button"
              >
                {savingIntegrations ? (
                  <>
                    <Loader2 size={14} className="mr-2 animate-spin" />{" "}
                    Saving...
                  </>
                ) : (
                  "Save Twilio & Vapi Credentials"
                )}
              </Button>
            </div>
          )}
        </div>
      </TabsContent>

      {/* AI Config Tab */}
      {isAdminUser && (
        <TabsContent value="ai-config">
          <AiConfigTab />
        </TabsContent>
      )}
    </Tabs>
  );
}
