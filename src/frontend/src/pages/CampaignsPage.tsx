import {
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Edit2,
  Mail,
  Megaphone,
  MessageSquare,
  MoreVertical,
  Plus,
  Send,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
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
import { Textarea } from "../components/ui/textarea";
import { useApp } from "../context/AppContext";
import {
  ADMIN_OUTREACH_SEQUENCES,
  ALL_CLIENT_CAMPAIGNS,
  type CampaignStep,
  type ClientCampaign,
  MED_SPA_CAMPAIGNS,
  type OutreachSequence,
  PERSONALIZATION_TOKENS,
  PLUMBING_CAMPAIGNS,
} from "../data/campaignData";

interface Prospect {
  id: string;
  firstName: string;
  lastName: string;
  businessName: string;
  email: string;
  phone: string;
  niche: string;
  city: string;
  status: "Not Started" | "Active" | "Replied" | "Converted";
  currentStep: number;
  sequenceId: string;
}

const MOCK_PROSPECTS: Prospect[] = [
  {
    id: "p1",
    firstName: "Carlos",
    lastName: "Rivera",
    businessName: "Rivera Plumbing Co.",
    email: "carlos@riveraplumbing.com",
    phone: "619-555-0101",
    niche: "Plumbing",
    city: "San Diego, CA",
    status: "Active",
    currentStep: 3,
    sequenceId: "plumbing-outreach",
  },
  {
    id: "p2",
    firstName: "Mike",
    lastName: "Thompson",
    businessName: "North County Pipes",
    email: "mike@ncpipes.com",
    phone: "760-555-0202",
    niche: "Plumbing",
    city: "Oceanside, CA",
    status: "Replied",
    currentStep: 2,
    sequenceId: "plumbing-outreach",
  },
  {
    id: "p3",
    firstName: "Jennifer",
    lastName: "Tran",
    businessName: "Glow Med Spa",
    email: "jennifer@glowmedspa.com",
    phone: "858-555-0303",
    niche: "Med Spa",
    city: "La Jolla, CA",
    status: "Active",
    currentStep: 4,
    sequenceId: "medspa-outreach",
  },
  {
    id: "p4",
    firstName: "David",
    lastName: "Chen",
    businessName: "Precision Plumbing",
    email: "david@precisionplumb.com",
    phone: "714-555-0404",
    niche: "Plumbing",
    city: "Anaheim, CA",
    status: "Converted",
    currentStep: 6,
    sequenceId: "plumbing-outreach",
  },
  {
    id: "p5",
    firstName: "Ashley",
    lastName: "Moore",
    businessName: "Luxe Aesthetics Studio",
    email: "ashley@luxeaesthetics.com",
    phone: "310-555-0505",
    niche: "Med Spa",
    city: "Beverly Hills, CA",
    status: "Not Started",
    currentStep: 0,
    sequenceId: "medspa-outreach",
  },
];

function channelColor(channel: string) {
  if (channel === "email") return "bg-blue-100 text-blue-700";
  if (channel === "sms") return "bg-green-100 text-green-700";
  if (channel === "task") return "bg-orange-100 text-orange-700";
  return "bg-purple-100 text-purple-700";
}

function ChannelIcon({ channel }: { channel: string }) {
  if (channel === "email") return <Mail className="h-4 w-4" />;
  if (channel === "sms") return <MessageSquare className="h-4 w-4" />;
  if (channel === "task") return <ClipboardList className="h-4 w-4" />;
  return <Zap className="h-4 w-4" />;
}

function StepCard({
  step,
  onEdit,
}: { step: CampaignStep; onEdit?: (s: CampaignStep) => void }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${channelColor(step.channel)}`}
          >
            <ChannelIcon channel={step.channel} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-medium text-gray-500">
                Step {step.stepNumber}
              </span>
              <Badge variant="outline" className="text-xs py-0">
                {step.delayLabel}
              </Badge>
              <Badge
                className={`text-xs py-0 capitalize ${channelColor(step.channel)}`}
              >
                {step.channel}
              </Badge>
              {step.isInternal && (
                <Badge className="text-xs py-0 bg-gray-100 text-gray-600">
                  Internal
                </Badge>
              )}
            </div>
            {step.subject && (
              <p className="font-medium text-sm text-gray-900 mb-1 truncate">
                {step.subject}
              </p>
            )}
            {step.previewText && (
              <p className="text-xs text-gray-500 mb-1">{step.previewText}</p>
            )}
            <p className="text-xs text-gray-600 line-clamp-2">{step.body}</p>
          </div>
        </div>
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(step)}
            className="flex-shrink-0 text-gray-400 hover:text-indigo-600 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function JourneyModal({
  campaign,
  open,
  onClose,
}: { campaign: ClientCampaign; open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        data-ocid="campaigns.journey.modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-indigo-600" />
            {campaign.name} — Journey
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-2">
          <div className="bg-indigo-50 rounded-lg p-3 text-sm text-indigo-800">
            <span className="font-medium">Trigger: </span>
            {campaign.trigger}
          </div>
          {campaign.steps.map((step, idx) => (
            <div key={step.id}>
              <StepCard step={step} />
              {idx < campaign.steps.length - 1 && (
                <div className="flex justify-center my-1">
                  <ChevronDown className="h-4 w-4 text-gray-300" />
                </div>
              )}
            </div>
          ))}
          <div className="border border-dashed border-red-200 rounded-lg p-3">
            <p className="text-xs font-medium text-red-700 mb-1">Exit Rules</p>
            <ul className="space-y-1">
              {campaign.exitRules.map((rule) => (
                <li
                  key={rule}
                  className="text-xs text-gray-600 flex items-center gap-2"
                >
                  <Check className="h-3 w-3 text-green-500 flex-shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.info("Campaign editor coming soon")}
              data-ocid="campaigns.journey.edit_button"
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Campaign
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StepEditorModal({
  step,
  open,
  onClose,
  onSave,
}: {
  step: CampaignStep | null;
  open: boolean;
  onClose: () => void;
  onSave: (s: CampaignStep) => void;
}) {
  const [subject, setSubject] = useState(step?.subject ?? "");
  const [previewText, setPreviewText] = useState(step?.previewText ?? "");
  const [body, setBody] = useState(step?.body ?? "");
  if (!step) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        data-ocid="campaigns.step_editor.modal"
      >
        <DialogHeader>
          <DialogTitle>
            Edit Step {step.stepNumber} —{" "}
            <span className="capitalize">{step.channel}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {step.channel === "email" && (
            <>
              <div>
                <Label>Subject Line</Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1"
                  data-ocid="campaigns.step_editor.input"
                />
              </div>
              <div>
                <Label>Preview Text</Label>
                <Input
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  className="mt-1"
                />
              </div>
            </>
          )}
          <div>
            <Label>Message Body</Label>
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={10}
              className="mt-1 font-mono text-xs"
              data-ocid="campaigns.step_editor.textarea"
            />
          </div>
          <div>
            <Label className="mb-2 block">Personalization Tokens</Label>
            <div className="flex flex-wrap gap-2">
              {PERSONALIZATION_TOKENS.map((token) => (
                <button
                  key={token}
                  type="button"
                  onClick={() => setBody((p) => `${p} ${token}`)}
                  className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 rounded px-2 py-1 hover:bg-indigo-100 transition-colors font-mono"
                >
                  {token}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              data-ocid="campaigns.step_editor.cancel_button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={() => {
                onSave({ ...step, subject, previewText, body });
                toast.success("Step updated");
                onClose();
              }}
              data-ocid="campaigns.step_editor.save_button"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SequenceViewer({ sequence }: { sequence: OutreachSequence }) {
  const [steps, setSteps] = useState(sequence.steps);
  const [editingStep, setEditingStep] = useState<CampaignStep | null>(null);
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: "Enrolled", value: sequence.performance.enrolled },
          { label: "Open Rate", value: `${sequence.performance.openRate}%` },
          { label: "Click Rate", value: `${sequence.performance.clickRate}%` },
          { label: "Conversions", value: sequence.performance.conversions },
        ].map((m) => (
          <div
            key={m.label}
            className="bg-gray-50 rounded-lg p-3 text-center border"
          >
            <p className="text-lg font-bold text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500">{m.label}</p>
          </div>
        ))}
      </div>
      {steps.map((step, idx) => (
        <div key={step.id}>
          <StepCard step={step} onEdit={(s) => setEditingStep(s)} />
          {idx < steps.length - 1 && (
            <div className="flex justify-center my-1">
              <ChevronDown className="h-4 w-4 text-gray-300" />
            </div>
          )}
        </div>
      ))}
      <StepEditorModal
        step={editingStep}
        open={!!editingStep}
        onClose={() => setEditingStep(null)}
        onSave={(updated) => {
          setSteps((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s)),
          );
          setEditingStep(null);
        }}
      />
    </div>
  );
}

function AddProspectModal({
  open,
  onClose,
  onAdd,
}: { open: boolean; onClose: () => void; onAdd: (p: Prospect) => void }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    email: "",
    phone: "",
    niche: "",
    city: "",
  });
  const handleSubmit = () => {
    if (!form.firstName || !form.email || !form.businessName || !form.niche) {
      toast.error("Please fill in all required fields");
      return;
    }
    onAdd({
      id: `p${Date.now()}`,
      ...form,
      status: "Not Started",
      currentStep: 0,
      sequenceId:
        form.niche === "Plumbing" ? "plumbing-outreach" : "medspa-outreach",
    });
    setForm({
      firstName: "",
      lastName: "",
      businessName: "",
      email: "",
      phone: "",
      niche: "",
      city: "",
    });
    toast.success("Prospect added");
    onClose();
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent data-ocid="campaigns.add_prospect.modal">
        <DialogHeader>
          <DialogTitle>Add Prospect</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Label>First Name *</Label>
            <Input
              value={form.firstName}
              onChange={(e) =>
                setForm((p) => ({ ...p, firstName: e.target.value }))
              }
              className="mt-1"
              data-ocid="campaigns.prospect.input"
            />
          </div>
          <div>
            <Label>Last Name</Label>
            <Input
              value={form.lastName}
              onChange={(e) =>
                setForm((p) => ({ ...p, lastName: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div className="col-span-2">
            <Label>Business Name *</Label>
            <Input
              value={form.businessName}
              onChange={(e) =>
                setForm((p) => ({ ...p, businessName: e.target.value }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <Label>Email *</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              className="mt-1"
            />
          </div>
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
            <Label>Niche *</Label>
            <Select
              value={form.niche}
              onValueChange={(v) => setForm((p) => ({ ...p, niche: v }))}
            >
              <SelectTrigger
                className="mt-1"
                data-ocid="campaigns.prospect.select"
              >
                <SelectValue placeholder="Select niche" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Plumbing">Plumbing</SelectItem>
                <SelectItem value="Med Spa">Med Spa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>City</Label>
            <Input
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="campaigns.add_prospect.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            data-ocid="campaigns.add_prospect.submit_button"
          >
            Add Prospect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CsvImportModal({
  open,
  onClose,
  onImport,
}: {
  open: boolean;
  onClose: () => void;
  onImport: (prospects: Prospect[]) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [preview, setPreview] = useState<string[][]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const FIELDS = [
    "firstName",
    "lastName",
    "businessName",
    "email",
    "phone",
    "niche",
    "city",
  ];

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text
        .split("\n")
        .filter(Boolean)
        .map((l) => l.split(",").map((c) => c.trim()));
      if (lines.length > 0) {
        setHeaders(lines[0]);
        setPreview(lines.slice(1, 6));
        const autoMap: Record<string, string> = {};
        for (const h of lines[0]) {
          const lower = h.toLowerCase();
          if (lower.includes("first")) autoMap[h] = "firstName";
          else if (lower.includes("last")) autoMap[h] = "lastName";
          else if (lower.includes("business") || lower.includes("company"))
            autoMap[h] = "businessName";
          else if (lower.includes("email")) autoMap[h] = "email";
          else if (lower.includes("phone")) autoMap[h] = "phone";
          else if (lower.includes("niche") || lower.includes("type"))
            autoMap[h] = "niche";
          else if (lower.includes("city") || lower.includes("location"))
            autoMap[h] = "city";
        }
        setMapping(autoMap);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirm = () => {
    const imported: Prospect[] = preview.map((row, i) => {
      const obj: Record<string, string> = {};
      for (const [header, field] of Object.entries(mapping)) {
        const colIdx = headers.indexOf(header);
        if (colIdx >= 0) obj[field] = row[colIdx] ?? "";
      }
      const niche = obj.niche || "Plumbing";
      return {
        id: `csv-${Date.now()}-${i}`,
        firstName: obj.firstName || "",
        lastName: obj.lastName || "",
        businessName: obj.businessName || "",
        email: obj.email || "",
        phone: obj.phone || "",
        niche,
        city: obj.city || "",
        status: "Not Started" as const,
        currentStep: 0,
        sequenceId:
          niche === "Med Spa" ? "medspa-outreach" : "plumbing-outreach",
      };
    });
    onImport(imported);
    toast.success(`${imported.length} prospects imported`);
    setPreview([]);
    setHeaders([]);
    setMapping({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl"
        data-ocid="campaigns.csv_import.modal"
      >
        <DialogHeader>
          <DialogTitle>Import Prospects from CSV</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          {headers.length === 0 ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const file = e.dataTransfer.files[0];
                if (file) handleFile(file);
              }}
              className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${dragging ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-gray-50"}`}
              data-ocid="campaigns.csv_import.dropzone"
            >
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
              <p className="text-sm font-medium text-gray-700">
                Drag and drop a CSV file here
              </p>
              <p className="text-xs text-gray-400 mt-1">
                or{" "}
                <label className="text-indigo-600 cursor-pointer underline">
                  browse
                  <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFile(f);
                    }}
                  />
                </label>
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Map columns
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {headers.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-sm">
                      <span className="text-gray-600 truncate w-28">{h}</span>
                      <ChevronRight className="h-3 w-3 text-gray-400 flex-shrink-0" />
                      <Select
                        value={mapping[h] || ""}
                        onValueChange={(v) =>
                          setMapping((p) => ({ ...p, [h]: v }))
                        }
                      >
                        <SelectTrigger className="h-7 text-xs flex-1">
                          <SelectValue placeholder="Skip" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">Skip</SelectItem>
                          {FIELDS.map((f) => (
                            <SelectItem key={f} value={f}>
                              {f}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Preview (first {preview.length} rows)
                </p>
                <div className="overflow-x-auto rounded border text-xs">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {headers.map((h) => (
                          <th
                            key={h}
                            className="px-3 py-2 text-left font-medium text-gray-600"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {preview.map((row, ri) => (
                        <tr
                          // biome-ignore lint/suspicious/noArrayIndexKey: CSV preview rows have no stable IDs
                          key={`row-${ri}`}
                          className="border-t"
                          data-ocid={`campaigns.csv_import.row.${ri + 1}`}
                        >
                          {row.map((cell, ci) => (
                            <td
                              // biome-ignore lint/suspicious/noArrayIndexKey: CSV preview cells have no stable IDs
                              key={`cell-${ri}-${ci}`}
                              className="px-3 py-2 text-gray-700"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setHeaders([]);
                    setPreview([]);
                  }}
                  data-ocid="campaigns.csv_import.cancel_button"
                >
                  Re-upload
                </Button>
                <Button
                  size="sm"
                  onClick={handleConfirm}
                  data-ocid="campaigns.csv_import.confirm_button"
                >
                  Import {preview.length} Prospects
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProspectDetailPanel({
  prospect,
  onClose,
  onConvert,
}: {
  prospect: Prospect;
  onClose: () => void;
  onConvert: (p: Prospect) => void;
}) {
  const sequence = ADMIN_OUTREACH_SEQUENCES.find(
    (s) => s.id === prospect.sequenceId,
  );
  const MOCK_ENGAGEMENT = [
    { event: "Email opened", step: "Step 1", time: "2 days ago" },
    { event: "Link clicked", step: "Step 1", time: "2 days ago" },
    { event: "SMS delivered", step: "Step 2", time: "Yesterday" },
  ];
  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white border-l shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold text-gray-900">{prospect.businessName}</h3>
        <button type="button" onClick={onClose}>
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="space-y-2">
          <p className="text-sm">
            <span className="text-gray-500">Name: </span>
            {prospect.firstName} {prospect.lastName}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Email: </span>
            {prospect.email}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Phone: </span>
            {prospect.phone}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">Niche: </span>
            {prospect.niche}
          </p>
          <p className="text-sm">
            <span className="text-gray-500">City: </span>
            {prospect.city}
          </p>
        </div>
        <div className="border rounded-lg p-3">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Sequence Progress
          </p>
          <p className="text-xs text-gray-500">{sequence?.name}</p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.round((prospect.currentStep / (sequence?.steps.length ?? 6)) * 100)}%`,
                }}
              />
            </div>
            <span className="text-xs text-gray-500">
              Step {prospect.currentStep}/{sequence?.steps.length ?? 6}
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">
            Engagement History
          </p>
          <div className="space-y-2">
            {MOCK_ENGAGEMENT.map((e, i) => (
              <div
                key={e.event}
                className="flex items-center justify-between text-xs border rounded p-2"
                data-ocid={`campaigns.engagement.item.${i + 1}`}
              >
                <span className="text-gray-700">{e.event}</span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs py-0">
                    {e.step}
                  </Badge>
                  <span className="text-gray-400">{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4 border-t">
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700"
          onClick={() => onConvert(prospect)}
          data-ocid="campaigns.prospect.convert_button"
        >
          <TrendingUp className="h-4 w-4 mr-2" />
          Convert to Client
        </Button>
      </div>
    </div>
  );
}

function ProspectOutreachTab() {
  const [prospects, setProspects] = useState<Prospect[]>(MOCK_PROSPECTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCsvModal, setShowCsvModal] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(
    null,
  );
  const [viewingSequence, setViewingSequence] =
    useState<OutreachSequence | null>(null);
  const [filterNiche, setFilterNiche] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [senderName, setSenderName] = useState(
    "David at Booked Ranked Fundable",
  );
  const [senderEmail, setSenderEmail] = useState(
    "david@bookedrankedfundable.com",
  );
  const [replyTo, setReplyTo] = useState("reply@bookedrankedfundable.com");

  const filtered = prospects.filter((p) => {
    if (filterNiche && p.niche !== filterNiche) return false;
    if (filterStatus && p.status !== filterStatus) return false;
    return true;
  });

  const stats = {
    total: prospects.length,
    active: prospects.filter((p) => p.status === "Active").length,
    replied: prospects.filter((p) => p.status === "Replied").length,
    converted: prospects.filter((p) => p.status === "Converted").length,
  };

  const handleConvert = (p: Prospect) => {
    setProspects((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, status: "Converted" } : x)),
    );
    setSelectedProspect(null);
    toast.success(
      `${p.businessName} converted to client! Tenant account created.`,
    );
  };

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      Active: "bg-blue-100 text-blue-700",
      Replied: "bg-green-100 text-green-700",
      Converted: "bg-purple-100 text-purple-700",
      "Not Started": "bg-gray-100 text-gray-600",
    };
    return map[status] ?? "bg-gray-100 text-gray-600";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Total Prospects",
            value: stats.total,
            icon: Users,
            color: "text-gray-700",
          },
          {
            label: "Active in Sequence",
            value: stats.active,
            icon: Zap,
            color: "text-blue-600",
          },
          {
            label: "Replied",
            value: stats.replied,
            icon: MessageSquare,
            color: "text-green-600",
          },
          {
            label: "Converted",
            value: stats.converted,
            icon: TrendingUp,
            color: "text-purple-600",
          },
        ].map((s) => (
          <Card key={s.label} className="border shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        <div className="xl:col-span-3 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <CardTitle className="text-base">Prospect List</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowCsvModal(true)}
                    data-ocid="campaigns.csv_import.open_modal_button"
                  >
                    <Upload className="h-4 w-4 mr-1" />
                    Import CSV
                  </Button>
                  <Button
                    size="sm"
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setShowAddModal(true)}
                    data-ocid="campaigns.add_prospect.open_modal_button"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Prospect
                  </Button>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Select value={filterNiche} onValueChange={setFilterNiche}>
                  <SelectTrigger
                    className="h-8 text-xs w-36"
                    data-ocid="campaigns.filter.select"
                  >
                    <SelectValue placeholder="All Niches" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Niches</SelectItem>
                    <SelectItem value="Plumbing">Plumbing</SelectItem>
                    <SelectItem value="Med Spa">Med Spa</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="h-8 text-xs w-36">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Replied">Replied</SelectItem>
                    <SelectItem value="Converted">Converted</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-y">
                    <tr>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">
                        Name / Business
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">
                        Niche
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">
                        Step
                      </th>
                      <th className="text-left px-4 py-2 font-medium text-gray-600">
                        Status
                      </th>
                      <th className="px-4 py-2" />
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filtered.map((p, i) => (
                      <tr
                        key={p.id}
                        className="hover:bg-gray-50 transition-colors"
                        data-ocid={`campaigns.prospect.item.${i + 1}`}
                      >
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">
                            {p.firstName} {p.lastName}
                          </p>
                          <p className="text-xs text-gray-500">
                            {p.businessName}
                          </p>
                          <p className="text-xs text-gray-400">{p.city}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge
                            variant="outline"
                            className="text-xs whitespace-nowrap"
                          >
                            {p.niche}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs text-gray-600">
                          {p.currentStep === 0 ? "—" : `Step ${p.currentStep}`}
                        </td>
                        <td className="px-4 py-3">
                          <Badge className={`text-xs ${statusBadge(p.status)}`}>
                            {p.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button
                                type="button"
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => setSelectedProspect(p)}
                              >
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleConvert(p)}
                              >
                                Convert to Client
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() =>
                                  setProspects((prev) =>
                                    prev.filter((x) => x.id !== p.id),
                                  )
                                }
                              >
                                Remove
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-8 text-center text-gray-400 text-sm"
                          data-ocid="campaigns.prospect.empty_state"
                        >
                          No prospects found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="xl:col-span-2 space-y-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Outreach Sequences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ADMIN_OUTREACH_SEQUENCES.map((seq) => (
                <div
                  key={seq.id}
                  className="border rounded-lg p-4 hover:border-indigo-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-sm text-gray-900">
                        {seq.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {seq.steps.length} steps
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Badge className="text-xs bg-blue-100 text-blue-700">
                        Email
                      </Badge>
                      <Badge className="text-xs bg-green-100 text-green-700">
                        SMS
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="font-bold text-gray-900">
                        {seq.performance.openRate}%
                      </p>
                      <p className="text-gray-500">Open Rate</p>
                    </div>
                    <div className="bg-gray-50 rounded p-2 text-center">
                      <p className="font-bold text-gray-900">
                        {seq.performance.conversions}
                      </p>
                      <p className="text-gray-500">Conversions</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-xs"
                    onClick={() => setViewingSequence(seq)}
                    data-ocid={`campaigns.sequence.${seq.id}.button`}
                  >
                    View Sequence
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Sender Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs text-gray-500">Sender Name</Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="mt-1 h-8 text-sm"
                  data-ocid="campaigns.sender.input"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">From Email</Label>
                <Input
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Reply-To</Label>
                <Input
                  value={replyTo}
                  onChange={(e) => setReplyTo(e.target.value)}
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <p className="text-xs text-gray-400">
                Sends via your configured SendGrid/Mailgun integration.
              </p>
              <Button
                size="sm"
                className="w-full bg-indigo-600 hover:bg-indigo-700"
                onClick={() => toast.success("Sender identity saved")}
                data-ocid="campaigns.sender.save_button"
              >
                Save Identity
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {viewingSequence && (
        <Card className="border shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {viewingSequence.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewingSequence(null)}
                data-ocid="campaigns.sequence.close_button"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <SequenceViewer sequence={viewingSequence} />
          </CardContent>
        </Card>
      )}

      <AddProspectModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={(p) => setProspects((prev) => [...prev, p])}
      />
      <CsvImportModal
        open={showCsvModal}
        onClose={() => setShowCsvModal(false)}
        onImport={(imported) => setProspects((prev) => [...prev, ...imported])}
      />
      {selectedProspect && (
        <ProspectDetailPanel
          prospect={selectedProspect}
          onClose={() => setSelectedProspect(null)}
          onConvert={handleConvert}
        />
      )}
    </div>
  );
}

function ClientCampaignCard({
  campaign,
  tenantId,
}: { campaign: ClientCampaign; tenantId: string }) {
  const { campaignToggles, setCampaignToggle } = useApp();
  const [showJourney, setShowJourney] = useState(false);
  const enabled = campaignToggles[tenantId]?.[campaign.id] !== false;
  const channelSet = [
    ...new Set(
      campaign.steps.filter((s) => !s.isInternal).map((s) => s.channel),
    ),
  ];

  return (
    <>
      <Card className="border shadow-sm hover:border-indigo-200 transition-colors">
        <CardContent className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {campaign.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">
                {campaign.trigger}
              </p>
            </div>
            <Switch
              checked={enabled}
              onCheckedChange={(v) => {
                setCampaignToggle(tenantId, campaign.id, v);
                toast.success(
                  v
                    ? `"${campaign.name}" activated`
                    : `"${campaign.name}" paused`,
                );
              }}
              data-ocid={`campaigns.${campaign.id}.toggle`}
            />
          </div>
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Badge
              className={`text-xs ${enabled ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
            >
              {enabled ? "Active" : "Paused"}
            </Badge>
            <span className="text-xs text-gray-400">
              {campaign.steps.length} steps
            </span>
            {channelSet.map((ch) => (
              <Badge key={ch} className={`text-xs ${channelColor(ch)}`}>
                <ChannelIcon channel={ch} />
                <span className="ml-1 capitalize">{ch}</span>
              </Badge>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-gray-50 rounded-lg p-2 text-center border">
              <p className="text-base font-bold text-gray-900">
                {campaign.mockMetrics.contactsInSequence}
              </p>
              <p className="text-xs text-gray-500">In Sequence</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center border">
              <p className="text-base font-bold text-gray-900">
                {campaign.mockMetrics.openRate}%
              </p>
              <p className="text-xs text-gray-500">Open Rate</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-2 text-center border">
              <p className="text-base font-bold text-gray-900">
                {campaign.mockMetrics.conversionRate}%
              </p>
              <p className="text-xs text-gray-500">Conversion</p>
            </div>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="w-full text-xs"
            onClick={() => setShowJourney(true)}
            data-ocid={`campaigns.${campaign.id}.button`}
          >
            View Journey
          </Button>
        </CardContent>
      </Card>
      <JourneyModal
        campaign={campaign}
        open={showJourney}
        onClose={() => setShowJourney(false)}
      />
    </>
  );
}

function MyCampaignsTab() {
  const { currentTenantId, tenants, campaignToggles } = useApp();
  const currentTenant = tenants.find((t) => t.id === currentTenantId);
  const niche = (currentTenant?.type ?? "").toLowerCase();

  let campaigns: ClientCampaign[];
  if (niche.includes("plumb")) campaigns = PLUMBING_CAMPAIGNS;
  else if (niche.includes("spa") || niche.includes("med"))
    campaigns = MED_SPA_CAMPAIGNS;
  else campaigns = ALL_CLIENT_CAMPAIGNS;

  const tenantToggles = campaignToggles[currentTenantId] ?? {};
  const activeCampaigns = campaigns.filter(
    (c) => tenantToggles[c.id] !== false,
  ).length;
  const totalContacts = campaigns.reduce(
    (sum, c) => sum + c.mockMetrics.contactsInSequence,
    0,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            label: "Active Campaigns",
            value: activeCampaigns,
            icon: Megaphone,
            color: "text-indigo-600",
          },
          {
            label: "Contacts in Sequence",
            value: totalContacts,
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "Msgs Sent This Month",
            value: 247,
            icon: Send,
            color: "text-green-600",
          },
          {
            label: "Conversions",
            value: 18,
            icon: TrendingUp,
            color: "text-purple-600",
          },
        ].map((s) => (
          <Card key={s.label} className="border shadow-sm">
            <CardContent className="p-4 flex items-center gap-3">
              <s.icon className={`h-8 w-8 ${s.color} opacity-80`} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                <p className="text-xs text-gray-500">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {campaigns.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((campaign) => (
            <ClientCampaignCard
              key={campaign.id}
              campaign={campaign}
              tenantId={currentTenantId}
            />
          ))}
        </div>
      ) : (
        <div
          className="text-center py-16 text-gray-400"
          data-ocid="campaigns.my_campaigns.empty_state"
        >
          <Megaphone className="h-12 w-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">
            No campaigns available for your account type.
          </p>
        </div>
      )}
    </div>
  );
}

export default function CampaignsPage() {
  const { isAdminUser, isAdmin } = useApp();
  const showAdmin = isAdminUser || isAdmin;

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Megaphone className="h-6 w-6 text-indigo-600" />
          Campaigns
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          {showAdmin
            ? "Prospect outreach sequences and client lifecycle campaigns"
            : "Automated lifecycle campaigns for your business"}
        </p>
      </div>
      <Tabs
        defaultValue={showAdmin ? "outreach" : "my-campaigns"}
        className="space-y-6"
      >
        <TabsList className="bg-gray-100" data-ocid="campaigns.tabs">
          {showAdmin && (
            <TabsTrigger value="outreach" data-ocid="campaigns.outreach.tab">
              <Users className="h-4 w-4 mr-2" />
              Prospect Outreach
            </TabsTrigger>
          )}
          <TabsTrigger
            value="my-campaigns"
            data-ocid="campaigns.my_campaigns.tab"
          >
            <Megaphone className="h-4 w-4 mr-2" />
            My Campaigns
          </TabsTrigger>
        </TabsList>
        {showAdmin && (
          <TabsContent value="outreach">
            <ProspectOutreachTab />
          </TabsContent>
        )}
        <TabsContent value="my-campaigns">
          <MyCampaignsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
