import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useApp } from "../context/AppContext";
import { TENANTS } from "../data/demoData";

export default function SettingsPage() {
  const { currentTenantId, isAdmin } = useApp();
  const tenant = TENANTS.find((t) => t.id === currentTenantId);

  const [form, setForm] = useState({
    name: tenant?.name ?? "",
    phone: tenant?.phone ?? "",
    website: tenant?.website ?? "",
    address: tenant?.address ?? "",
  });

  const handleSave = () => {
    toast.success("Business profile saved!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Business Profile */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">
          Business Profile
        </h3>
        <div className="space-y-4">
          <div>
            <Label>Business Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              className="mt-1"
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
            />
          </div>
        </div>
        <Button
          onClick={handleSave}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Save Changes
        </Button>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
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

      {/* Team Members (admin only) */}
      {isAdmin && (
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
                  <td className="py-2.5 font-medium text-gray-900">{t.name}</td>
                  <td className="py-2.5 text-gray-600">{t.type}</td>
                  <td className="py-2.5 text-indigo-600">{t.website}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
