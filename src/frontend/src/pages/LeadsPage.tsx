import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useApp } from "../context/AppContext";
import { LEADS, type Lead } from "../data/demoData";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-amber-100 text-amber-700",
  qualified: "bg-emerald-100 text-emerald-700",
  closed: "bg-gray-100 text-gray-600",
};

const SOURCES = ["Website", "Google", "Referral", "Facebook", "Yelp", "Other"];
const STATUSES = ["new", "contacted", "qualified", "closed"] as const;

export default function LeadsPage() {
  const { currentTenantId } = useApp();
  const [leads, setLeads] = useState<Lead[]>(LEADS[currentTenantId] ?? []);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    source: "Website",
    status: "new" as Lead["status"],
  });

  const counts = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
  };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      tenantId: currentTenantId,
      name: form.name,
      phone: form.phone,
      email: form.email,
      source: form.source,
      status: form.status,
      createdAt: Date.now(),
    };
    setLeads((prev) => [newLead, ...prev]);
    setForm({
      name: "",
      phone: "",
      email: "",
      source: "Website",
      status: "new",
    });
    setOpen(false);
    toast.success("Lead added successfully");
  };

  const handleDelete = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    toast.success("Lead removed");
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {Object.entries(counts).map(([key, val]) => (
          <div
            key={key}
            className="bg-white rounded-lg border border-gray-200 p-4 text-center shadow-sm"
          >
            <p className="text-2xl font-bold text-gray-900">{val}</p>
            <p className="text-xs text-gray-200 capitalize mt-0.5">{key}</p>
          </div>
        ))}
      </div>

      {/* Table Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">
          {leads.length} leads
        </h3>
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
          onClick={() => setOpen(true)}
        >
          <Plus size={14} className="mr-1" /> Add Lead
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {[
                "Name",
                "Phone",
                "Email",
                "Source",
                "Status",
                "Date Added",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-semibold text-gray-200 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {lead.name}
                </td>
                <td className="px-4 py-3 text-gray-600">{lead.phone}</td>
                <td className="px-4 py-3 text-gray-600">{lead.email}</td>
                <td className="px-4 py-3 text-gray-600">{lead.source}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[lead.status]}`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-200">
                  {formatDate(lead.createdAt)}
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => handleDelete(lead.id)}
                    className="p-1.5 rounded hover:bg-red-50 text-gray-200 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <p className="text-center text-gray-200 py-10 text-sm">
            No leads yet. Add your first lead!
          </p>
        )}
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Lead</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label>Name *</Label>
              <Input
                placeholder="Full name"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Phone</Label>
                <Input
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, email: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Source</Label>
                <select
                  value={form.source}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, source: e.target.value }))
                  }
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm"
                >
                  {SOURCES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm((p) => ({
                      ...p,
                      status: e.target.value as Lead["status"],
                    }))
                  }
                  className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 text-sm capitalize"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="capitalize">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAdd}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Add Lead
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
