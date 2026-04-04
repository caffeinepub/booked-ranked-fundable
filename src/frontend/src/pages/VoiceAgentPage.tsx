import {
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Loader2,
  Phone,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { VoiceAgentConfig } from "../backend.d";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useApp } from "../context/AppContext";
import { useActor } from "../hooks/useActor";

type Routing = "ai" | "forward" | "voicemail";

export default function VoiceAgentPage() {
  const { currentTenantId, isAdminUser } = useApp();
  const { actor } = useActor();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newService, setNewService] = useState("");

  const [config, setConfig] = useState<{
    greetingScript: string;
    businessHoursText: string;
    services: string[];
    routing: Routing;
    forwardNumber: string;
    voicemailMessage: string;
    twilioNumber: string;
    vapiAgentId: string;
    configured: boolean;
  }>({
    greetingScript:
      "Hi, you've reached [Business Name]. How can I help you today?",
    businessHoursText: "Mon-Fri 8am-6pm, Sat 9am-3pm",
    services: ["General service", "Emergency service"],
    routing: "ai",
    forwardNumber: "",
    voicemailMessage:
      "Please leave your name and number and we'll call you back within 24 hours.",
    twilioNumber: "",
    vapiAgentId: "",
    configured: false,
  });

  useEffect(() => {
    if (!actor) return;
    setLoading(true);
    actor
      .getVoiceAgentConfig(currentTenantId)
      .then((res) => {
        if (res) {
          let routing: Routing = "ai";
          let forwardNumber = "";
          let voicemailMessage =
            "Please leave your name and number and we'll call you back within 24 hours.";
          if (res.callRouting.__kind__ === "forward") {
            routing = "forward";
            forwardNumber = res.callRouting.forward;
          } else if (res.callRouting.__kind__ === "voicemail") {
            routing = "voicemail";
            voicemailMessage = res.callRouting.voicemail;
          }
          setConfig({
            greetingScript: res.greetingScript,
            businessHoursText: res.businessHoursText,
            services: res.services,
            routing,
            forwardNumber,
            voicemailMessage,
            twilioNumber: res.twilioNumber,
            vapiAgentId: res.vapiAgentId,
            configured: res.configured,
          });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor, currentTenantId]);

  const buildCallRouting = (): VoiceAgentConfig["callRouting"] => {
    if (config.routing === "forward")
      return { __kind__: "forward", forward: config.forwardNumber };
    if (config.routing === "voicemail")
      return { __kind__: "voicemail", voicemail: config.voicemailMessage };
    return { __kind__: "ai", ai: null };
  };

  const handleSave = async () => {
    if (!actor) {
      toast.error("Backend not available.");
      return;
    }
    setSaving(true);
    try {
      await actor.upsertVoiceAgentConfig({
        tenantId: currentTenantId,
        greetingScript: config.greetingScript,
        businessHoursText: config.businessHoursText,
        services: config.services,
        callRouting: buildCallRouting(),
        twilioNumber: config.twilioNumber,
        vapiAgentId: config.vapiAgentId,
        configured: config.configured,
      });
      toast.success("Voice agent configuration saved!");
    } catch {
      toast.error("Failed to save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const addService = () => {
    if (!newService.trim()) return;
    setConfig((prev) => ({
      ...prev,
      services: [...prev.services, newService.trim()],
    }));
    setNewService("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={28} />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      {/* Status Banner */}
      <div
        className={`rounded-xl p-4 flex items-center gap-3 ${
          config.configured
            ? "bg-emerald-50 border border-emerald-200"
            : "bg-amber-50 border border-amber-200"
        }`}
        data-ocid="voiceagent.panel"
      >
        {config.configured ? (
          <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
        ) : (
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
        )}
        <div>
          <p
            className={`text-sm font-semibold ${config.configured ? "text-emerald-800" : "text-amber-800"}`}
          >
            {config.configured ? "Voice Agent Active" : "Not Configured"}
          </p>
          <p
            className={`text-xs ${config.configured ? "text-emerald-700" : "text-amber-700"}`}
          >
            {config.configured
              ? "Your voice agent is live and answering calls."
              : "Complete the form below and mark as configured to activate your voice agent."}
          </p>
        </div>
      </div>

      {/* Agency Credentials Notice */}
      {isAdminUser ? (
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-900">
              Twilio & Vapi Credentials
            </p>
            <p className="text-xs text-indigo-700 mt-0.5">
              Configure your agency's telephony credentials in Settings &gt;
              Integrations.
            </p>
          </div>
          <a
            href="/settings"
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800"
          >
            Go to Settings <ChevronRight size={14} />
          </a>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-sm text-gray-700">
            ✅ Your agency has configured the telephony integration.
          </p>
        </div>
      )}

      {/* Main Config Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-6">
        <h3 className="text-sm font-semibold text-gray-800">
          Agent Configuration
        </h3>

        {/* Greeting Script */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label className="text-xs text-gray-600">Greeting Script</Label>
            <span className="text-xs text-gray-200">
              {config.greetingScript.length} chars
            </span>
          </div>
          <Textarea
            value={config.greetingScript}
            onChange={(e) =>
              setConfig((p) => ({ ...p, greetingScript: e.target.value }))
            }
            rows={3}
            className="resize-none"
            placeholder="Hi, you've reached [Business Name]. How can I help you today?"
            data-ocid="voiceagent.textarea"
          />
        </div>

        {/* Business Hours */}
        <div>
          <Label className="text-xs text-gray-600">Business Hours</Label>
          <Input
            value={config.businessHoursText}
            onChange={(e) =>
              setConfig((p) => ({ ...p, businessHoursText: e.target.value }))
            }
            placeholder="Mon-Fri 8am-6pm, Sat 9am-3pm"
            className="mt-1"
            data-ocid="voiceagent.input"
          />
        </div>

        {/* Services */}
        <div>
          <Label className="text-xs text-gray-600 block mb-2">
            Services Offered
          </Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {config.services.map((svc, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: services list stable
                key={i}
                className="flex items-center gap-1.5 text-xs bg-indigo-50 border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-full"
              >
                {svc}
                <button
                  type="button"
                  onClick={() =>
                    setConfig((p) => ({
                      ...p,
                      services: p.services.filter((_, idx) => idx !== i),
                    }))
                  }
                  className="hover:text-red-500"
                  data-ocid={`voiceagent.delete_button.${i + 1}`}
                >
                  <Trash2 size={11} />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newService}
              onChange={(e) => setNewService(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addService()}
              placeholder="Add a service..."
              className="text-xs"
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={addService}
              data-ocid="voiceagent.secondary_button"
            >
              <Plus size={14} />
            </Button>
          </div>
        </div>

        {/* Call Routing */}
        <div>
          <Label className="text-xs text-gray-600 block mb-3">
            Call Routing
          </Label>
          <div className="space-y-3">
            {(
              [
                {
                  value: "ai",
                  label: "AI Handles Call",
                  desc: "Vapi AI agent answers and manages the call",
                },
                {
                  value: "forward",
                  label: "Forward to Number",
                  desc: "Route incoming calls to a staff phone number",
                },
                {
                  value: "voicemail",
                  label: "Send to Voicemail",
                  desc: "Play a message and record caller's voicemail",
                },
              ] as const
            ).map(({ value, label, desc }) => (
              <label
                key={value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  config.routing === value
                    ? "border-indigo-400 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }`}
                data-ocid={"voiceagent.radio"}
              >
                <input
                  type="radio"
                  name="routing"
                  value={value}
                  checked={config.routing === value}
                  onChange={() => setConfig((p) => ({ ...p, routing: value }))}
                  className="mt-0.5 accent-indigo-600"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  <p className="text-xs text-gray-200">{desc}</p>
                  {config.routing === "forward" && value === "forward" && (
                    <Input
                      value={config.forwardNumber}
                      onChange={(e) =>
                        setConfig((p) => ({
                          ...p,
                          forwardNumber: e.target.value,
                        }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className="mt-2 text-xs"
                      data-ocid="voiceagent.input"
                    />
                  )}
                  {config.routing === "voicemail" && value === "voicemail" && (
                    <Textarea
                      value={config.voicemailMessage}
                      onChange={(e) =>
                        setConfig((p) => ({
                          ...p,
                          voicemailMessage: e.target.value,
                        }))
                      }
                      placeholder="Please leave your name and number..."
                      rows={2}
                      className="mt-2 text-xs resize-none"
                      data-ocid="voiceagent.textarea"
                    />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Phone / Vapi info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-200 mb-1">Assigned Phone Number</p>
            <div className="flex items-center gap-1.5">
              <Phone size={14} className="text-indigo-500" />
              <p className="text-sm font-semibold text-gray-800">
                {config.twilioNumber || "Not assigned yet"}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <p className="text-xs text-gray-200 mb-1">Vapi Agent ID</p>
            <p className="text-sm font-semibold text-gray-800 truncate">
              {config.vapiAgentId || "—"}
            </p>
          </div>
        </div>

        {/* Configured toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-800">
              Mark as Configured
            </p>
            <p className="text-xs text-gray-200">
              Activate this voice agent for your business
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={config.configured}
            onClick={() =>
              setConfig((p) => ({ ...p, configured: !p.configured }))
            }
            data-ocid="voiceagent.toggle"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              config.configured ? "bg-emerald-500" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                config.configured ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          data-ocid="voiceagent.save_button"
        >
          {saving ? (
            <>
              <Loader2 size={14} className="animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Configuration"
          )}
        </Button>
      </div>
    </div>
  );
}
