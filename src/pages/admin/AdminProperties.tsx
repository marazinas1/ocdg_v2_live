import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Image as ImageIcon } from "lucide-react";
import { useProperties } from "@/hooks/admin/useProperties";
import {
  useUpdatePropertyPublished,
  useUpdatePropertyStatus,
} from "@/hooks/admin/useUpdatePropertyStatus";
import {
  PROPERTY_STATUSES,
  STATUS_LABELS,
  isPropertyStatus,
  type PropertyStatus,
} from "@/lib/admin/status";
import StatusBadge from "@/components/admin/StatusBadge";
import AdminProtected from "@/components/admin/AdminProtected";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Filter = "all" | PropertyStatus;
type PageFilter = "all" | "full" | "record_only";

function AdminPropertiesInner() {
  const { data, isLoading } = useProperties();
  const updateStatus = useUpdatePropertyStatus();
  const updatePublished = useUpdatePropertyPublished();
  const [filter, setFilter] = useState<Filter>("all");
  const [pageFilter, setPageFilter] = useState<PageFilter>("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const rows = data ?? [];
    return rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (pageFilter === "full" && !r.has_page) return false;
      if (pageFilter === "record_only" && r.has_page) return false;
      if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [data, filter, pageFilter, search]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">Properties</h1>
        <Link to="/admin/properties/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add New Property
          </Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <Input
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <div className="flex gap-1 rounded-md bg-slate-100 p-1">
          {(["all", ...PROPERTY_STATUSES] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "px-3 py-1.5 text-sm rounded transition " +
                (filter === f
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900")
              }
            >
              {f === "all" ? "All" : STATUS_LABELS[f]}
            </button>
          ))}
        </div>
        <div className="flex gap-1 rounded-md bg-slate-100 p-1">
          {(
            [
              ["all", "All pages"],
              ["full", "Full page"],
              ["record_only", "Record only"],
            ] as [PageFilter, string][]
          ).map(([f, label]) => (
            <button
              key={f}
              onClick={() => setPageFilter(f)}
              className={
                "px-3 py-1.5 text-sm rounded transition " +
                (pageFilter === f
                  ? "bg-white shadow-sm text-slate-900"
                  : "text-slate-600 hover:text-slate-900")
              }
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="text-slate-500 py-16 text-center">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-lg border border-slate-200">
          <p className="text-slate-600 mb-6">
            {(data ?? []).length === 0
              ? "No properties yet. Create your first one."
              : "No properties match your filters."}
          </p>
          {(data ?? []).length === 0 && (
            <Link to="/admin/properties/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Property
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-4 py-3 w-20">Image</th>
                <th className="text-left px-4 py-3">Title</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Published</th>
                <th className="text-left px-4 py-3">Listed</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="w-14 h-14 rounded bg-slate-100 flex items-center justify-center overflow-hidden">
                      {row.card_image_url ? (
                        <img
                          src={row.card_image_url}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <ImageIcon className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{row.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2">
                      <span>/{row.slug}</span>
                      {!row.has_page && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] uppercase tracking-wider">
                          Record only
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{row.price ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isPropertyStatus(row.status) && <StatusBadge status={row.status} />}
                      <Select
                        value={row.status}
                        onValueChange={(v) =>
                          updateStatus.mutate({ id: row.id, status: v })
                        }
                      >
                        <SelectTrigger className="w-[150px] h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PROPERTY_STATUSES.map((s) => (
                            <SelectItem key={s} value={s}>
                              {STATUS_LABELS[s]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Switch
                      checked={row.published}
                      onCheckedChange={(checked) =>
                        updatePublished.mutate({ id: row.id, published: checked })
                      }
                    />
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {row.listed_date ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link to={`/admin/properties/${row.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="w-3.5 h-3.5 mr-1.5" />
                        Edit
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminProperties() {
  return (
    <AdminProtected>
      <AdminPropertiesInner />
    </AdminProtected>
  );
}