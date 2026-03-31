import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { useApp } from "../context/AppContext";
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

export default function SettingsPage() {
  const { currentTenantId, isAdmin, isAdminUser } = useApp();
  const { actor } = useActor();
  const tenant = TENANTS.find((t) => t.id === currentTenantId);

  const [form, setForm] = useState({
    name: tenant?.name ?? "",
    phone: tenant?.phone ?? "",
    website: tenant?.website ?? "",
    address: tenant?.address ?? "",
  });

  const [agencySettings, setAgencySettings] = useState({
    twilioSid: "",
    twilioAuth: "",
    twilioNumber: "",
    vapiKey: "",
  });
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
        {isAdminUser && (
          <TabsTrigger value="integrations" data-ocid="settings.tab">
            Integrations
          </TabsTrigger>
        )}
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl space-y-4">
          <h3 className="text-sm font-semibold text-gray-800">
            Business Profile
          </h3>
          <div>
            <Label>Business Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="mt-1"
              data-ocid="settings.input"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.input"
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                value={form.website}
                onChange={(e) =>
                  setForm((p) => ({ ...p, website: e.target.value }))
                }
                className="mt-1"
                data-ocid="settings.input"
              />
            </div>
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              className="mt-1"
              data-ocid="settings.input"
            />
          </div>
          <Button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            data-ocid="settings.save_button"
          >
            Save Changes
          </Button>
        </div>
      </TabsContent>

      {/* Notifications Tab */}
      <TabsContent value="notifications">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-3">
            {[
              "Email notifications for new leads",
              "SMS alerts for new reviews",
              "Weekly performance summary",
            ].map((pref) => (
              <div key={pref} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{pref}</span>
                <div className="w-10 h-5 bg-indigo-500 rounded-full relative cursor-pointer">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabsContent>

      {/* Clients Tab */}
      {isAdmin && (
        <TabsContent value="clients">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Client Businesses
            </h3>
            <table className="w-full text-sm">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">
                    Business
                  </th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">
                    Type
                  </th>
                  <th className="text-left py-2 text-xs font-semibold text-gray-500 uppercase">
                    Website
                  </th>
                </tr>
              </thead>
              <tbody>
                {TENANTS.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="py-2.5 font-medium text-gray-900">
                      {t.name}
                    </td>
                    <td className="py-2.5 text-gray-600">{t.type}</td>
                    <td className="py-2.5 text-indigo-600">{t.website}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      )}

      {/* Integrations Tab (admin only) */}
      {isAdminUser && (
        <TabsContent value="integrations">
          <div className="space-y-6 max-w-2xl">
            {loadingIntegrations ? (
              <div
                className="flex items-center justify-center h-32"
                data-ocid="settings.loading_state"
              >
                <Loader2 className="animate-spin text-indigo-600" size={24} />
              </div>
            ) : (
              <>
                {/* Twilio Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-red-600">T</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Twilio (SMS & Voice)
                      </h3>
                      <p className="text-xs text-gray-500">
                        Required for SMS review requests and voice routing
                      </p>
                    </div>
                  </div>
                  <PasswordField
                    label="Account SID"
                    value={agencySettings.twilioSid}
                    onChange={(v) =>
                      setAgencySettings((p) => ({ ...p, twilioSid: v }))
                    }
                    placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    ocid="settings.input"
                  />
                  <PasswordField
                    label="Auth Token"
                    value={agencySettings.twilioAuth}
                    onChange={(v) =>
                      setAgencySettings((p) => ({ ...p, twilioAuth: v }))
                    }
                    placeholder="Your Twilio auth token"
                    ocid="settings.input"
                  />
                  <div>
                    <Label className="text-xs text-gray-600">
                      Agency Phone Number
                    </Label>
                    <Input
                      value={agencySettings.twilioNumber}
                      onChange={(e) =>
                        setAgencySettings((p) => ({
                          ...p,
                          twilioNumber: e.target.value,
                        }))
                      }
                      placeholder="+1 (555) 000-0000"
                      className="mt-1"
                      data-ocid="settings.input"
                    />
                  </div>
                </div>

                {/* Vapi Section */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-purple-600">
                        V
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Vapi.ai (AI Voice Agents)
                      </h3>
                      <p className="text-xs text-gray-500">
                        Required for AI-powered inbound call handling
                      </p>
                    </div>
                  </div>
                  <PasswordField
                    label="API Key"
                    value={agencySettings.vapiKey}
                    onChange={(v) =>
                      setAgencySettings((p) => ({ ...p, vapiKey: v }))
                    }
                    placeholder="vapi_xxxxxxxxxxxxxxxx"
                    ocid="settings.input"
                  />
                </div>

                <Button
                  onClick={handleSaveIntegrations}
                  disabled={savingIntegrations}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                  data-ocid="settings.save_button"
                >
                  {savingIntegrations ? (
                    <>
                      <Loader2 size={14} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Credentials"
                  )}
                </Button>
              </>
            )}
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
