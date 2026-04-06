import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Image,
  Link2,
  Monitor,
  Palette,
  QrCode,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import { type ChangeEvent, useRef, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../context/AppContext";
import type { WhiteLabelSettings } from "../context/AppContext";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ──────────────────────────────────────────────
// Brand Settings Tab
// ──────────────────────────────────────────────
function BrandTab({
  settings,
  onChange,
  onSave,
}: {
  settings: WhiteLabelSettings;
  onChange: (patch: Partial<WhiteLabelSettings>) => void;
  onSave: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        onChange({ logoDataUrl: ev.target.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const initials = settings.agencyName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Form */}
      <div className="lg:col-span-2 space-y-5">
        <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Agency Identity
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Agency Name</Label>
              <Input
                value={settings.agencyName}
                onChange={(e) => onChange({ agencyName: e.target.value })}
                placeholder="Your Agency Name"
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                data-ocid="whitelabel.agencyname.input"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Tagline</Label>
              <Input
                value={settings.tagline}
                onChange={(e) => onChange({ tagline: e.target.value })}
                placeholder="AI-Powered Growth for Local Businesses"
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                data-ocid="whitelabel.tagline.input"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Hero Headline</Label>
            <Input
              value={settings.heroHeadline}
              onChange={(e) => onChange({ heroHeadline: e.target.value })}
              placeholder="The Platform That Books, Ranks & Funds Your Clients"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              data-ocid="whitelabel.heroheadline.input"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-slate-300 text-xs">Logo</Label>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl overflow-hidden border border-slate-600 flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${settings.primaryColor}33` }}
              >
                {settings.logoDataUrl ? (
                  <img
                    src={settings.logoDataUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span
                    className="text-lg font-bold"
                    style={{ color: settings.primaryColor }}
                  >
                    {initials || "AG"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  onChange={handleLogoUpload}
                  className="hidden"
                  data-ocid="whitelabel.upload_button"
                />
                <Button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  variant="outline"
                  className="border-slate-600 bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white gap-2"
                  data-ocid="whitelabel.logo.upload_button"
                >
                  <Image size={14} />
                  Upload Logo
                </Button>
                <p className="text-xs text-slate-500 mt-1.5">
                  PNG, JPG, SVG up to 2MB
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Primary Color</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-slate-600 cursor-pointer bg-transparent"
                  data-ocid="whitelabel.primarycolor.input"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => onChange({ primaryColor: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white font-mono text-sm"
                  maxLength={7}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-300 text-xs">Secondary Color</Label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={settings.secondaryColor}
                  onChange={(e) => onChange({ secondaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg border border-slate-600 cursor-pointer bg-transparent"
                  data-ocid="whitelabel.secondarycolor.input"
                />
                <Input
                  value={settings.secondaryColor}
                  onChange={(e) => onChange({ secondaryColor: e.target.value })}
                  className="bg-slate-700/50 border-slate-600 text-white font-mono text-sm"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={onSave}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          data-ocid="whitelabel.save.primary_button"
        >
          <Check size={15} />
          Save Brand Settings
        </Button>
      </div>

      {/* Live Preview Card */}
      <div className="space-y-3">
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
          Live Preview
        </p>
        <div className="bg-slate-800 rounded-xl border border-slate-700/50 overflow-hidden">
          {/* Header bar */}
          <div
            className="h-1.5"
            style={{
              background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
            }}
          />
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold overflow-hidden flex-shrink-0"
                style={{ backgroundColor: `${settings.primaryColor}22` }}
              >
                {settings.logoDataUrl ? (
                  <img
                    src={settings.logoDataUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span style={{ color: settings.primaryColor }}>
                    {initials || "AG"}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-semibold text-sm leading-tight">
                  {settings.agencyName || "Your Agency"}
                </p>
                <p className="text-slate-400 text-xs">
                  {settings.tagline || "Tagline goes here"}
                </p>
              </div>
            </div>
            <div className="space-y-1.5">
              <p className="text-white font-semibold text-xs leading-snug">
                {settings.heroHeadline || "Hero headline"}
              </p>
              <div className="h-px bg-slate-700" />
              <div className="flex gap-2">
                <div
                  className="h-6 rounded text-[10px] font-medium flex items-center px-2.5 text-white"
                  style={{ backgroundColor: settings.primaryColor }}
                >
                  Get Started
                </div>
                <div
                  className="h-6 rounded text-[10px] font-medium flex items-center px-2.5 border"
                  style={{
                    borderColor: settings.primaryColor,
                    color: settings.primaryColor,
                  }}
                >
                  Learn More
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-500 text-center">
          Updates as you type
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Onboarding Link Tab
// ──────────────────────────────────────────────
function OnboardingLinkTab({
  settings,
  onChange,
  onSave,
}: {
  settings: WhiteLabelSettings;
  onChange: (patch: Partial<WhiteLabelSettings>) => void;
  onSave: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const slug = slugify(settings.agencyName) || "your-agency";
  const shareableUrl = `https://bookedrankedfundable.com/onboarding?agency=${slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Welcome customization */}
      <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Customize Client Welcome Screen
        </h2>
        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Welcome Headline</Label>
          <Input
            value={settings.welcomeHeadline}
            onChange={(e) => onChange({ welcomeHeadline: e.target.value })}
            placeholder="Welcome to Your Growth Platform"
            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
            data-ocid="whitelabel.welcomeheadline.input"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-slate-300 text-xs">Welcome Message</Label>
          <Textarea
            value={settings.welcomeMessage}
            onChange={(e) => onChange({ welcomeMessage: e.target.value })}
            placeholder="Everything you need to book more jobs, rank higher, and build business credit — in one place."
            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
            rows={3}
            data-ocid="whitelabel.welcomemessage.textarea"
          />
        </div>
        <Button
          onClick={onSave}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          data-ocid="whitelabel.savewelcome.primary_button"
        >
          <Check size={15} />
          Save Changes
        </Button>
      </div>

      {/* Generated link */}
      <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
            Your Shareable Onboarding Link
          </h2>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs">
            Active
          </Badge>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-3 py-2.5 font-mono text-sm text-purple-300 truncate">
            {shareableUrl}
          </div>
          <Button
            onClick={handleCopy}
            className="bg-slate-700 hover:bg-slate-600 text-white gap-2 flex-shrink-0"
            data-ocid="whitelabel.copylink.button"
          >
            {copied ? (
              <Check size={14} className="text-emerald-400" />
            ) : (
              <Copy size={14} />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Link Clicks", value: "47", icon: Link2 },
            { label: "Signups", value: "12", icon: Users },
            { label: "Active Clients", value: "8", icon: Shield },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-slate-700/40 rounded-lg p-3 text-center border border-slate-600/50"
            >
              <Icon size={16} className="text-purple-400 mx-auto mb-1" />
              <p className="text-xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code + Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Simulated QR Code */}
        <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <QrCode size={16} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-300">
              QR Code
            </span>
          </div>
          <div className="w-32 h-32 bg-white rounded-lg p-2 relative overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              role="img"
              aria-label="QR code for agency onboarding link"
            >
              <title>QR code for agency onboarding link</title>
              {/* Simulated QR grid pattern */}
              {Array.from({ length: 10 }, (_, row) =>
                Array.from({ length: 10 }, (_, col) => {
                  const isCorner =
                    (row < 3 && col < 3) ||
                    (row < 3 && col > 6) ||
                    (row > 6 && col < 3);
                  const cellKey = `qr-${row * 10 + col}`;
                  const randomFill = (row * 13 + col * 7) % 3 !== 0;
                  return (
                    <rect
                      key={cellKey}
                      x={col * 10 + 1}
                      y={row * 10 + 1}
                      width={8}
                      height={8}
                      fill={
                        isCorner
                          ? "#1e1b4b"
                          : randomFill
                            ? "#1e1b4b"
                            : "transparent"
                      }
                    />
                  );
                }),
              )}
            </svg>
          </div>
          <p className="text-xs text-slate-400 text-center">
            Clients scan to access your branded onboarding
          </p>
        </div>

        {/* Preview Welcome Screen */}
        <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Monitor size={16} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-300">
              Preview
            </span>
          </div>
          <p className="text-xs text-slate-400 text-center">
            See exactly what your clients see when they land on your onboarding
            link.
          </p>
          <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
            <DialogTrigger asChild>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white gap-2 w-full"
                data-ocid="whitelabel.previewwelcome.open_modal_button"
              >
                <ExternalLink size={14} />
                Preview Welcome Screen
              </Button>
            </DialogTrigger>
            <DialogContent
              className="bg-slate-900 border-slate-700 max-w-md"
              data-ocid="whitelabel.previewwelcome.dialog"
            >
              <DialogHeader>
                <DialogTitle className="text-white">
                  Client Welcome Screen Preview
                </DialogTitle>
              </DialogHeader>
              <WelcomeScreenPreview settings={settings} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

function WelcomeScreenPreview({ settings }: { settings: WhiteLabelSettings }) {
  const initials = settings.agencyName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className="rounded-xl overflow-hidden border border-slate-700"
      style={{
        background: "linear-gradient(135deg, #0f0f1a 0%, #1a1040 100%)",
      }}
    >
      <div
        className="h-1"
        style={{
          background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
        }}
      />
      <div className="p-6 flex flex-col items-center gap-5 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold overflow-hidden"
          style={{ backgroundColor: `${settings.primaryColor}33` }}
        >
          {settings.logoDataUrl ? (
            <img
              src={settings.logoDataUrl}
              alt="Logo"
              className="w-full h-full object-contain"
            />
          ) : (
            <span style={{ color: settings.primaryColor }}>
              {initials || "AG"}
            </span>
          )}
        </div>
        <div>
          <h3 className="text-white font-bold text-xl leading-tight">
            {settings.welcomeHeadline || "Welcome to Your Growth Platform"}
          </h3>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            {settings.welcomeMessage ||
              "Everything you need to book more jobs, rank higher, and build business credit — in one place."}
          </p>
        </div>
        <div className="w-full space-y-2">
          <button
            type="button"
            className="w-full rounded-lg py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: settings.primaryColor }}
          >
            Get Started
          </button>
          <button
            type="button"
            className="w-full rounded-lg py-2.5 text-sm font-medium bg-white/10 text-slate-200 hover:bg-white/15"
          >
            I already have an account
          </button>
        </div>
        <p className="text-xs text-slate-500">
          Powered by {settings.agencyName || "Your Agency"}
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────
// Client Portal Preview Tab
// ──────────────────────────────────────────────
function PortalPreviewTab({ settings }: { settings: WhiteLabelSettings }) {
  const initials = settings.agencyName
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 px-1">
        <Monitor size={15} className="text-purple-400" />
        <p className="text-slate-300 text-sm">
          This is exactly what your clients will see when they log in.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Branded Login Card */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-center">
            Login Card
          </p>
          <div
            className="rounded-xl border border-slate-700 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f0f1a 0%, #1a1040 100%)",
            }}
          >
            <div
              className="h-1"
              style={{
                background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
              }}
            />
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: `${settings.primaryColor}33` }}
                >
                  {settings.logoDataUrl ? (
                    <img
                      src={settings.logoDataUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span
                      style={{ color: settings.primaryColor }}
                      className="text-xs"
                    >
                      {initials || "AG"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-white text-xs font-semibold leading-tight">
                    {settings.agencyName || "Your Agency"}
                  </p>
                  <p className="text-slate-400 text-[10px]">
                    {settings.tagline || "Tagline"}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="bg-slate-700/60 rounded-md px-2.5 py-1.5 text-xs text-slate-400">
                  email@example.com
                </div>
                <div className="bg-slate-700/60 rounded-md px-2.5 py-1.5 text-xs text-slate-400">
                  ••••••••
                </div>
              </div>
              <div
                className="w-full rounded-md py-1.5 text-[10px] font-semibold text-white text-center"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Sign In
              </div>
            </div>
          </div>
        </div>

        {/* 2. Branded Dashboard Header */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-center">
            Dashboard Header
          </p>
          <div className="rounded-xl border border-slate-700 overflow-hidden bg-slate-900">
            <div
              className="h-0.5"
              style={{
                background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
              }}
            />
            <div
              className="px-3 py-2.5 flex items-center justify-between"
              style={{ backgroundColor: `${settings.primaryColor}11` }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-bold overflow-hidden"
                  style={{ backgroundColor: `${settings.primaryColor}44` }}
                >
                  {settings.logoDataUrl ? (
                    <img
                      src={settings.logoDataUrl}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span style={{ color: settings.primaryColor }}>
                      {initials?.[0] || "A"}
                    </span>
                  )}
                </div>
                <span className="text-white text-xs font-semibold">
                  {settings.agencyName || "Agency"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-300 text-[10px]">Dashboard</span>
                <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[9px] text-slate-300">
                  JD
                </div>
              </div>
            </div>
            {/* Fake nav items */}
            <div className="p-3 space-y-1.5">
              {["Dashboard", "Leads", "Reviews", "SEO Audit"].map((item) => (
                <div
                  key={item}
                  className="text-[10px] px-2 py-1 rounded text-slate-400"
                  style={
                    item === "Dashboard"
                      ? {
                          backgroundColor: `${settings.primaryColor}22`,
                          color: settings.primaryColor,
                        }
                      : {}
                  }
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Branded Welcome Onboarding */}
        <div className="space-y-2">
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider text-center">
            Onboarding Welcome
          </p>
          <div
            className="rounded-xl border border-slate-700 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f0f1a 0%, #1a1040 100%)",
            }}
          >
            <div
              className="h-1"
              style={{
                background: `linear-gradient(to right, ${settings.primaryColor}, ${settings.secondaryColor})`,
              }}
            />
            <div className="p-4 space-y-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold overflow-hidden"
                style={{ backgroundColor: `${settings.primaryColor}33` }}
              >
                {settings.logoDataUrl ? (
                  <img
                    src={settings.logoDataUrl}
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <span style={{ color: settings.primaryColor }}>
                    {initials || "AG"}
                  </span>
                )}
              </div>
              <div>
                <p className="text-white font-bold text-xs leading-snug">
                  {settings.welcomeHeadline ||
                    "Welcome to Your Growth Platform"}
                </p>
                <p className="text-slate-400 text-[10px] mt-1 leading-relaxed line-clamp-3">
                  {settings.welcomeMessage ||
                    "Everything you need to book more jobs, rank higher, and build business credit."}
                </p>
              </div>
              <div
                className="w-full rounded py-1 text-[10px] font-semibold text-white text-center"
                style={{ backgroundColor: settings.primaryColor }}
              >
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-slate-500 italic">
        ✦ This is exactly what your clients will see — fully branded to your
        agency.
      </p>
    </div>
  );
}

// ──────────────────────────────────────────────
// Domain & Access Tab
// ──────────────────────────────────────────────
function DomainTab({
  settings,
  onChange,
  onSave,
}: {
  settings: WhiteLabelSettings;
  onChange: (patch: Partial<WhiteLabelSettings>) => void;
  onSave: () => void;
}) {
  const slug = slugify(settings.agencyName) || "your-agency";
  const subdomain = `${slug}.bookedrankedfundable.com`;
  const hasCustomDomain = settings.customDomain.length > 3;

  return (
    <div className="space-y-5">
      <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Domain Configuration
        </h2>

        {/* Auto-subdomain */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-xs">
            Your Subdomain (Auto-Generated)
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2.5 font-mono text-sm text-purple-300">
              {subdomain}
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
              SSL Active
            </Badge>
          </div>
          <p className="text-xs text-slate-500">
            This subdomain is live immediately. Share it with your clients as
            their portal URL.
          </p>
        </div>

        <div className="h-px bg-slate-700" />

        {/* Custom domain */}
        <div className="space-y-2">
          <Label className="text-slate-300 text-xs">
            Custom Domain (Optional)
          </Label>
          <Input
            value={settings.customDomain}
            onChange={(e) => onChange({ customDomain: e.target.value })}
            placeholder="youragency.com"
            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
            data-ocid="whitelabel.customdomain.input"
          />
          {hasCustomDomain && (
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                Pending DNS
              </Badge>
              <p className="text-xs text-slate-400">
                SSL will activate within 24 hours of DNS propagation.
              </p>
            </div>
          )}
        </div>

        {/* CNAME instruction */}
        <div className="bg-slate-700/30 rounded-lg border border-slate-600/40 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-purple-400" />
            <span className="text-xs font-semibold text-slate-300">
              DNS Setup Instructions
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Point your domain's CNAME record to:{" "}
            <span className="font-mono text-purple-300">
              platform.bookedrankedfundable.com
            </span>
          </p>
          <p className="text-xs text-slate-500">
            Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare,
            etc.) and add a CNAME record for your root or subdomain pointing to
            the address above.
          </p>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700/50 p-6 space-y-5">
        <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
          Email Sender Identity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Sender Name</Label>
            <Input
              value={settings.emailSenderName}
              onChange={(e) => onChange({ emailSenderName: e.target.value })}
              placeholder="Bold Growth Agency"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              data-ocid="whitelabel.emailsendername.input"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-slate-300 text-xs">Sender Email</Label>
            <Input
              value={settings.emailSenderAddress}
              onChange={(e) => onChange({ emailSenderAddress: e.target.value })}
              placeholder="hello@youragency.com"
              type="email"
              className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              data-ocid="whitelabel.emailsenderaddress.input"
            />
          </div>
        </div>
        <p className="text-xs text-slate-500">
          All platform emails to your clients will appear to come from this name
          and address, not from Booked Ranked Fundable.
        </p>
      </div>

      <Button
        onClick={onSave}
        className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
        data-ocid="whitelabel.savedomain.primary_button"
      >
        <Check size={15} />
        Save Domain Settings
      </Button>
    </div>
  );
}

// ──────────────────────────────────────────────
// Client Branding Controls Tab
// ──────────────────────────────────────────────
interface ClientOverride {
  greetingOverride: string;
  helpText: string;
  hideDashboardLink: boolean;
}

function ClientBrandingTab() {
  const { tenants } = useApp();
  const displayTenants = tenants.filter((t) => t.id !== "tenant-demo");

  const [overrides, setOverrides] = useState<Record<string, ClientOverride>>(
    () =>
      Object.fromEntries(
        displayTenants.map((t) => [
          t.id,
          { greetingOverride: "", helpText: "", hideDashboardLink: false },
        ]),
      ),
  );
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  const update = (tenantId: string, patch: Partial<ClientOverride>) => {
    setOverrides((prev) => ({
      ...prev,
      [tenantId]: { ...prev[tenantId], ...patch },
    }));
  };

  const handleApply = (tenantId: string) => {
    setSavedIds((prev) => new Set(prev).add(tenantId));
    toast.success("Overrides applied for this client");
    setTimeout(() => {
      setSavedIds((prev) => {
        const next = new Set(prev);
        next.delete(tenantId);
        return next;
      });
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Smartphone size={15} className="text-purple-400" />
        <p className="text-slate-300 text-sm">
          These overrides apply only to clients under your agency.
        </p>
      </div>

      {displayTenants.length === 0 ? (
        <div
          className="bg-slate-800 rounded-xl border border-slate-700/50 p-12 text-center"
          data-ocid="whitelabel.clients.empty_state"
        >
          <Users size={32} className="text-slate-600 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">No client tenants yet.</p>
          <p className="text-slate-500 text-xs mt-1">
            Add clients in the Admin Panel to configure their branding.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayTenants.map((tenant, idx) => {
            const o = overrides[tenant.id] ?? {
              greetingOverride: "",
              helpText: "",
              hideDashboardLink: false,
            };
            const isSaved = savedIds.has(tenant.id);
            return (
              <div
                key={tenant.id}
                className="bg-slate-800 rounded-xl border border-slate-700/50 p-5 space-y-4"
                data-ocid={`whitelabel.clients.item.${idx + 1}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {tenant.name}
                    </p>
                    <p className="text-slate-400 text-xs capitalize">
                      {tenant.type}
                    </p>
                  </div>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                    {tenant.type || "Client"}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-slate-300 text-xs">
                      Greeting Override
                    </Label>
                    <Input
                      value={o.greetingOverride}
                      onChange={(e) =>
                        update(tenant.id, { greetingOverride: e.target.value })
                      }
                      placeholder="Welcome back, {name}!"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-sm"
                      data-ocid={"whitelabel.clients.greeting.input"}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-300 text-xs">Help Text</Label>
                    <Input
                      value={o.helpText}
                      onChange={(e) =>
                        update(tenant.id, { helpText: e.target.value })
                      }
                      placeholder="Need help? Contact us at support@..."
                      className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 text-sm"
                      data-ocid={"whitelabel.clients.helptext.input"}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={o.hideDashboardLink}
                      onCheckedChange={(v) =>
                        update(tenant.id, { hideDashboardLink: v })
                      }
                      data-ocid={"whitelabel.clients.hidedashboard.switch"}
                    />
                    <Label className="text-slate-300 text-sm cursor-pointer">
                      Hide Dashboard Link
                    </Label>
                  </div>
                  <Button
                    onClick={() => handleApply(tenant.id)}
                    className={`gap-2 text-sm ${
                      isSaved
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-purple-600 hover:bg-purple-700 text-white"
                    }`}
                    data-ocid={"whitelabel.clients.apply.save_button"}
                  >
                    {isSaved ? (
                      <>
                        <Check size={13} /> Applied!
                      </>
                    ) : (
                      "Apply Overrides"
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────────
export default function WhiteLabelHubPage() {
  const { whiteLabelSettings, setWhiteLabelSettings } = useApp();
  const [draft, setDraft] = useState<WhiteLabelSettings>(whiteLabelSettings);

  const onChange = (patch: Partial<WhiteLabelSettings>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleSave = () => {
    setWhiteLabelSettings(draft);
    toast.success("White-label settings saved!");
  };

  // Keep draft in sync with context on mount
  // (e.g., if navigating back)
  const liveSettings = draft;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
              Admin Only
            </Badge>
          </div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            <Palette size={24} className="text-purple-400" />
            White-Label Hub
          </h1>
          <p className="text-slate-400 mt-1 text-sm">
            Configure your agency's brand, shareable onboarding link, client
            portal preview, custom domain, and per-client branding overrides.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="brand" className="space-y-6">
        <TabsList className="bg-slate-800 border border-slate-700/50 p-1 h-auto flex-wrap gap-1">
          {(
            [
              { value: "brand", label: "Brand Settings", icon: Palette },
              { value: "link", label: "Onboarding Link", icon: Link2 },
              { value: "preview", label: "Portal Preview", icon: Monitor },
              { value: "domain", label: "Domain & Access", icon: Globe },
              { value: "clients", label: "Client Controls", icon: Users },
            ] as const
          ).map(({ value, label, icon: Icon }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-slate-400 hover:text-slate-200 gap-1.5 text-xs sm:text-sm px-3 py-2"
              data-ocid={`whitelabel.${value}.tab`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{label.split(" ")[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="brand">
          <BrandTab
            settings={liveSettings}
            onChange={onChange}
            onSave={handleSave}
          />
        </TabsContent>
        <TabsContent value="link">
          <OnboardingLinkTab
            settings={liveSettings}
            onChange={onChange}
            onSave={handleSave}
          />
        </TabsContent>
        <TabsContent value="preview">
          <PortalPreviewTab settings={liveSettings} />
        </TabsContent>
        <TabsContent value="domain">
          <DomainTab
            settings={liveSettings}
            onChange={onChange}
            onSave={handleSave}
          />
        </TabsContent>
        <TabsContent value="clients">
          <ClientBrandingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
