import { useEffect, useRef, useState } from "react";
import AdminProtected from "@/components/admin/AdminProtected";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  useSiteSettings,
  FALLBACK_LOGO,
  FALLBACK_HERO,
  HERO_FALLBACKS,
} from "@/hooks/useSiteSettings";
import { useSaveSiteSettings } from "@/hooks/admin/useSiteSettingsAdmin";
import {
  uploadBrandAsset,
  deleteBrandAsset,
  getBrandAssetUrl,
  NotAnImageError,
  type BrandAssetKind,
} from "@/lib/admin/uploadBrandAsset";

type SlotKey = "logo_path" | "logo_dark_path" | "favicon_path" | "hero_image_path";

const SLOTS: {
  key: SlotKey;
  kind: BrandAssetKind;
  label: string;
  help: string;
  dark?: boolean;
}[] = [
  {
    key: "logo_path",
    kind: "logo",
    label: "Logo",
    help: "Used in the header, footer and admin panel. PNG with transparency works best.",
  },
  {
    key: "logo_dark_path",
    kind: "logo_dark",
    label: "Dark-background logo",
    help: "Optional. Without it, the main logo is knocked out to white on dark surfaces.",
    dark: true,
  },
  {
    key: "favicon_path",
    kind: "favicon",
    label: "Favicon",
    help: "Square image shown in the browser tab.",
  },
  {
    key: "hero_image_path",
    kind: "hero",
    label: "Homepage hero image",
    help: "Wide landscape photo behind the homepage headline.",
    dark: true,
  },
];

function AssetSlot({
  label,
  help,
  url,
  hasUpload,
  dark,
  busy,
  progress,
  onPick,
  onRemove,
}: {
  label: string;
  help: string;
  url: string | null;
  hasUpload: boolean;
  dark?: boolean;
  busy: boolean;
  progress: number;
  onPick: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
          <p className="mt-1 text-xs text-slate-500">{help}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={busy}
            onClick={() => inputRef.current?.click()}
          >
            {hasUpload ? "Replace" : "Upload"}
          </Button>
          {hasUpload && (
            <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={onRemove}>
              Remove
            </Button>
          )}
        </div>
      </div>

      <div
        className={`flex h-28 items-center justify-center overflow-hidden rounded px-6 ${
          dark ? "bg-slate-900" : "bg-slate-100"
        }`}
      >
        {url ? (
          <img src={url} alt={label} className="max-h-24 w-auto object-contain" />
        ) : (
          <span className={`text-xs ${dark ? "text-white/50" : "text-slate-400"}`}>
            Nothing uploaded
          </span>
        )}
      </div>

      {busy && <Progress value={progress} className="mt-3 h-1" />}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) onPick(file);
        }}
      />
    </div>
  );
}

function SettingsBody() {
  const { settings, isLoading } = useSiteSettings();
  const save = useSaveSiteSettings();
  const { toast } = useToast();

  const [siteName, setSiteName] = useState("");
  const [eyebrow, setEyebrow] = useState("");
  const [headline, setHeadline] = useState("");
  const [subline, setSubline] = useState("");
  const [ctaLabel, setCtaLabel] = useState("");
  const [busyKey, setBusyKey] = useState<SlotKey | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const row = settings.row;
    if (!row) return;
    setSiteName(row.site_name ?? "");
    setEyebrow(row.hero_eyebrow ?? "");
    setHeadline(row.hero_headline ?? "");
    setSubline(row.hero_subline ?? "");
    setCtaLabel(row.hero_cta_label ?? "");
  }, [settings.row]);

  const rowId = settings.row?.id ?? null;
  const pathFor = (key: SlotKey) => settings.row?.[key] ?? null;

  const urlFor = (key: SlotKey) => {
    const path = pathFor(key);
    if (path) return getBrandAssetUrl(path);
    if (key === "logo_path") return FALLBACK_LOGO;
    if (key === "hero_image_path") return FALLBACK_HERO;
    return null;
  };

  const handleUpload = async (key: SlotKey, kind: BrandAssetKind, file: File) => {
    setBusyKey(key);
    setProgress(0);
    try {
      const previous = pathFor(key);
      const path = await uploadBrandAsset(file, kind, setProgress);
      await save.mutateAsync({ id: rowId, patch: { [key]: path } });
      await deleteBrandAsset(previous);
      toast({ title: "Saved", description: "Image updated across the site." });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description:
          err instanceof NotAnImageError ? err.message : (err as Error).message || "Please try again.",
      });
    } finally {
      setBusyKey(null);
      setProgress(0);
    }
  };

  const handleRemove = async (key: SlotKey) => {
    const previous = pathFor(key);
    setBusyKey(key);
    try {
      await save.mutateAsync({ id: rowId, patch: { [key]: null } });
      await deleteBrandAsset(previous);
      toast({ title: "Removed", description: "The default image is back in place." });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Could not remove",
        description: (err as Error).message || "Please try again.",
      });
    } finally {
      setBusyKey(null);
    }
  };

  const handleSaveText = async () => {
    try {
      await save.mutateAsync({
        id: rowId,
        patch: {
          site_name: siteName.trim() || "Ocean City Development Group",
          hero_eyebrow: eyebrow.trim() || null,
          hero_headline: headline.trim() || null,
          hero_subline: subline.trim() || null,
          hero_cta_label: ctaLabel.trim() || null,
        },
      });
      toast({ title: "Saved", description: "Homepage content updated." });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: (err as Error).message || "Please try again.",
      });
    }
  };

  if (isLoading) {
    return <p className="text-sm text-slate-500">Loading settings…</p>;
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
        <p className="mt-1 text-sm text-slate-500">
          Brand assets and homepage content. Changes go live on the public site immediately.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Brand</h2>

        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <Label htmlFor="site-name">Site name</Label>
          <Input
            id="site-name"
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            placeholder="Ocean City Development Group"
            className="mt-2"
          />
          <p className="mt-2 text-xs text-slate-500">Used as the logo's alternative text.</p>
        </div>

        {SLOTS.map((slot) => (
          <AssetSlot
            key={slot.key}
            label={slot.label}
            help={slot.help}
            url={urlFor(slot.key)}
            hasUpload={!!pathFor(slot.key)}
            dark={slot.dark}
            busy={busyKey === slot.key}
            progress={progress}
            onPick={(file) => handleUpload(slot.key, slot.kind, file)}
            onRemove={() => handleRemove(slot.key)}
          />
        ))}
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
          Homepage hero
        </h2>

        <div className="space-y-5 rounded-lg border border-slate-200 bg-white p-5">
          <div>
            <Label htmlFor="hero-eyebrow">Small line above the headline</Label>
            <Input
              id="hero-eyebrow"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              placeholder={HERO_FALLBACKS.eyebrow}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="hero-headline">Headline</Label>
            <Textarea
              id="hero-headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder={HERO_FALLBACKS.headline}
              rows={2}
              className="mt-2"
            />
            <p className="mt-2 text-xs text-slate-500">
              Press Enter to break the headline onto a second line.
            </p>
          </div>

          <div>
            <Label htmlFor="hero-subline">Subline</Label>
            <Textarea
              id="hero-subline"
              value={subline}
              onChange={(e) => setSubline(e.target.value)}
              placeholder={HERO_FALLBACKS.subline}
              rows={2}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="hero-cta">Button label</Label>
            <Input
              id="hero-cta"
              value={ctaLabel}
              onChange={(e) => setCtaLabel(e.target.value)}
              placeholder={HERO_FALLBACKS.ctaLabel}
              className="mt-2"
            />
          </div>

          <p className="text-xs text-slate-500">
            Leave a field empty to fall back to the default wording shown in grey.
          </p>

          <Button onClick={handleSaveText} disabled={save.isPending}>
            {save.isPending ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </section>
    </div>
  );
}

export default function AdminSettings() {
  return (
    <AdminProtected>
      <SettingsBody />
    </AdminProtected>
  );
}
