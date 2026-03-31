import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { type TenantEntry, useApp } from "../context/AppContext";
import { LEADS, REVIEWS } from "../data/demoData";

export default function AdminPage() {
  const {
    tenants,
    addTenant,
    deleteTenant,
    setAuditOverride,
    setFundabilityOverride,
    auditOverrides,
    fundabilityOverrides,
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTenant, setNewTenant] = useState({
    name: "",
    type: "",
    website: "",
    phone: "",
    address: "",
  });
  const [selectedTenantId, setSelectedTenantId] = useState("");
  const [auditScore, setAuditScore] = useState("");
  const [fundScore, setFundScore] = useState("");

  const totalLeads = Object.values(LEADS).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );
  const totalReviews = Object.values(REVIEWS).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  const handleAddTenant = () => {
    if (!newTenant.name.trim()) {
      toast.error("Business name is required");
      return;
    }
    const tenant: TenantEntry = {
      id: `tenant-${Date.now()}`,
      name: newTenant.name,
      type: newTenant.type || "General",
      website: newTenant.website,
      phone: newTenant.phone,
      address: newTenant.address,
    };
    addTenant(tenant);
    setNewTenant({ name: "", type: "", website: "", phone: "", address: "" });
    setShowAddForm(false);
    toast.success(`"${tenant.name}" added successfully`);
  };

  const handleDeleteTenant = (id: string, name: string) => {
    deleteTenant(id);
    toast.success(`"${name}" removed`);
  };

  const handleSaveOverride = () => {
    if (!selectedTenantId) {
      toast.error("Please select a tenant");
      return;
    }
    const aScore = Number(auditScore);
    const fScore = Number(fundScore);
    if (auditScore !== "" && (aScore < 0 || aScore > 100)) {
      toast.error("Audit score must be 0-100");
      return;
    }
    if (fundScore !== "" && (fScore < 0 || fScore > 100)) {
      toast.error("Fundability score must be 0-100");
      return;
    }
    if (auditScore !== "") setAuditOverride(selectedTenantId, aScore);
    if (fundScore !== "") setFundabilityOverride(selectedTenantId, fScore);
    toast.success("Score overrides saved");
  };

  const selectedTenantName = tenants.find(
    (t) => t.id === selectedTenantId,
  )?.name;

  return (
    <div className="space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card
          data-ocid="admin.stats.card"
          className="bg-gradient-to-br from-indigo-600 to-indigo-700 border-0 text-white"
        >
          <CardContent className="pt-6 pb-4">
            <p className="text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              Total Tenants
            </p>
            <p className="text-4xl font-bold mt-1">{tenants.length}</p>
          </CardContent>
        </Card>
        <Card
          data-ocid="admin.stats.card"
          className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-0 text-white"
        >
          <CardContent className="pt-6 pb-4">
            <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
              Total Leads
            </p>
            <p className="text-4xl font-bold mt-1">{totalLeads}</p>
          </CardContent>
        </Card>
        <Card
          data-ocid="admin.stats.card"
          className="bg-gradient-to-br from-amber-500 to-amber-600 border-0 text-white"
        >
          <CardContent className="pt-6 pb-4">
            <p className="text-amber-100 text-xs font-semibold uppercase tracking-wider">
              Total Reviews
            </p>
            <p className="text-4xl font-bold mt-1">{totalReviews}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tenant Management */}
      <Card data-ocid="admin.tenants.card">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-base font-semibold">
            Tenant Management
          </CardTitle>
          <Button
            data-ocid="admin.tenant.open_modal_button"
            size="sm"
            onClick={() => setShowAddForm((v) => !v)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            <Plus size={14} className="mr-1" />
            {showAddForm ? "Cancel" : "Add Tenant"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div
              data-ocid="admin.tenant.modal"
              className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3"
            >
              <p className="text-sm font-semibold text-slate-700">
                New Business Tenant
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-slate-600">
                    Business Name *
                  </Label>
                  <Input
                    data-ocid="admin.tenant.input"
                    value={newTenant.name}
                    onChange={(e) =>
                      setNewTenant((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Sunrise Landscaping"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600">
                    Business Type
                  </Label>
                  <Input
                    data-ocid="admin.tenant.input"
                    value={newTenant.type}
                    onChange={(e) =>
                      setNewTenant((p) => ({ ...p, type: e.target.value }))
                    }
                    placeholder="e.g. Landscaping"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Website</Label>
                  <Input
                    data-ocid="admin.tenant.input"
                    value={newTenant.website}
                    onChange={(e) =>
                      setNewTenant((p) => ({ ...p, website: e.target.value }))
                    }
                    placeholder="example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600">Phone</Label>
                  <Input
                    data-ocid="admin.tenant.input"
                    value={newTenant.phone}
                    onChange={(e) =>
                      setNewTenant((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="(555) 000-0000"
                    className="mt-1"
                  />
                </div>
                <div className="sm:col-span-2">
                  <Label className="text-xs text-slate-600">Address</Label>
                  <Input
                    data-ocid="admin.tenant.input"
                    value={newTenant.address}
                    onChange={(e) =>
                      setNewTenant((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="123 Main St, City, CA 90000"
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                data-ocid="admin.tenant.submit_button"
                onClick={handleAddTenant}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="sm"
              >
                Save Tenant
              </Button>
            </div>
          )}

          <Table data-ocid="admin.tenants.table">
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="hidden sm:table-cell">Website</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant, i) => (
                <TableRow
                  key={tenant.id}
                  data-ocid={`admin.tenants.item.${i + 1}`}
                >
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    {tenant.type}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-slate-500 text-sm">
                    {tenant.website}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      data-ocid={`admin.tenant.delete_button.${i + 1}`}
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteTenant(tenant.id, tenant.name)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {tenants.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="text-center text-slate-400 py-8"
                    data-ocid="admin.tenants.empty_state"
                  >
                    No tenants yet. Add one above.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Score Override Panel */}
      <Card data-ocid="admin.overrides.card">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Score Override Panel
          </CardTitle>
          <p className="text-sm text-slate-500">
            Override audit and fundability scores for any tenant.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-slate-600 mb-1 block">
              Select Tenant
            </Label>
            <Select
              value={selectedTenantId}
              onValueChange={setSelectedTenantId}
            >
              <SelectTrigger
                data-ocid="admin.overrides.select"
                className="max-w-sm"
              >
                <SelectValue placeholder="Choose a tenant..." />
              </SelectTrigger>
              <SelectContent>
                {tenants.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTenantId && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-4">
              <p className="text-sm font-medium text-slate-700">
                Overrides for{" "}
                <span className="text-indigo-600">{selectedTenantName}</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-slate-600 mb-1 block">
                    Audit Score (0–100)
                    {auditOverrides[selectedTenantId] !== undefined && (
                      <span className="ml-2 text-indigo-600 font-semibold">
                        Current: {auditOverrides[selectedTenantId]}
                      </span>
                    )}
                  </Label>
                  <Input
                    data-ocid="admin.overrides.input"
                    type="number"
                    min={0}
                    max={100}
                    value={auditScore}
                    onChange={(e) => setAuditScore(e.target.value)}
                    placeholder="e.g. 85"
                  />
                </div>
                <div>
                  <Label className="text-xs text-slate-600 mb-1 block">
                    Fundability Score (0–100)
                    {fundabilityOverrides[selectedTenantId] !== undefined && (
                      <span className="ml-2 text-indigo-600 font-semibold">
                        Current: {fundabilityOverrides[selectedTenantId]}
                      </span>
                    )}
                  </Label>
                  <Input
                    data-ocid="admin.overrides.input"
                    type="number"
                    min={0}
                    max={100}
                    value={fundScore}
                    onChange={(e) => setFundScore(e.target.value)}
                    placeholder="e.g. 78"
                  />
                </div>
              </div>
              <Button
                data-ocid="admin.overrides.save_button"
                onClick={handleSaveOverride}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
                size="sm"
              >
                Save Overrides
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
