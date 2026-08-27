import { useState } from "react";
import { toast } from "sonner";
import { Copy, UserPlus } from "lucide-react";
import AdminProtected from "@/components/admin/AdminProtected";
import { useAdminAuth } from "@/hooks/admin/useAdminAuth";
import {
  MANAGEABLE_ROLES,
  ROLE_LABELS,
  useAdminUsers,
  useDeleteUser,
  useInviteUser,
  useRevokeUser,
  useSetUserRole,
  type AdminUser,
  type InviteResult,
  type ManageableRole,
} from "@/hooks/admin/useAdminUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function formatDate(value: string | null) {
  if (!value) return "Never";
  return new Date(value).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function RoleBadge({ role }: { role: string | null }) {
  if (!role) {
    return (
      <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
        No access
      </span>
    );
  }
  const tone =
    role === "developer"
      ? "bg-slate-900 text-white"
      : role === "owner"
        ? "bg-emerald-100 text-emerald-800"
        : "bg-sky-100 text-sky-800";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>
      {ROLE_LABELS[role] ?? role}
    </span>
  );
}

type PendingAction =
  | { kind: "revoke"; user: AdminUser }
  | { kind: "delete"; user: AdminUser }
  | null;

function AdminUsersInner() {
  const auth = useAdminAuth();
  const callerId = auth.status === "admin" ? auth.userId : null;

  const { data: users, isLoading, error } = useAdminUsers();
  const invite = useInviteUser();
  const setRole = useSetUserRole();
  const revoke = useRevokeUser();
  const deleteUser = useDeleteUser();

  const [email, setEmail] = useState("");
  const [role, setRoleValue] = useState<ManageableRole>("editor");
  const [handover, setHandover] = useState<
    (InviteResult & { email: string }) | null
  >(null);
  const [pending, setPending] = useState<PendingAction>(null);

  const callerIsDeveloper =
    (users ?? []).find((u) => u.id === callerId)?.isDeveloper ?? false;

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      toast.success(`${label} copied`);
    } catch {
      toast.error("Could not copy to clipboard");
    }
  };

  const submitInvite = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    invite.mutate(
      { email: trimmed, role },
      {
        onSuccess: (result) => {
          setEmail("");
          if (result.reinvited) {
            toast.success(
              "This account already exists — a password reset link was generated.",
            );
          } else if (result.emailSent) {
            toast.success(`Invitation email sent to ${trimmed}.`);
          } else {
            toast.success(`Account created for ${trimmed}.`);
          }
          if (result.actionLink || result.password) {
            setHandover({ ...result, email: trimmed });
          }
        },
        onError: (err: Error) => toast.error(err.message),
      },
    );
  };

  const changeRole = (user: AdminUser, next: ManageableRole) => {
    setRole.mutate(
      { userId: user.id, role: next },
      {
        onSuccess: () => toast.success(`${user.email} is now ${ROLE_LABELS[next]}.`),
        onError: (err: Error) => toast.error(err.message),
      },
    );
  };

  const confirmPending = () => {
    if (!pending) return;
    const { kind, user } = pending;
    setPending(null);
    if (kind === "revoke") {
      revoke.mutate(
        { userId: user.id },
        {
          onSuccess: () => toast.success(`Access revoked for ${user.email}.`),
          onError: (err: Error) => toast.error(err.message),
        },
      );
    } else {
      deleteUser.mutate(
        { userId: user.id },
        {
          onSuccess: () => toast.success(`${user.email} deleted.`),
          onError: (err: Error) => toast.error(err.message),
        },
      );
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Users</h1>
        <p className="text-sm text-slate-500 mt-1">
          Invite teammates and manage who can access the admin.
        </p>
      </div>

      {/* Invite */}
      <form
        onSubmit={submitInvite}
        className="bg-white border border-slate-200 rounded-lg p-6 space-y-4"
      >
        <h2 className="text-sm font-semibold text-slate-900">Invite a user</h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
          <div className="flex-1 space-y-1.5">
            <Label htmlFor="invite-email">Email</Label>
            <Input
              id="invite-email"
              type="email"
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-48 space-y-1.5">
            <Label htmlFor="invite-role">Role</Label>
            <Select
              value={role}
              onValueChange={(v) => setRoleValue(v as ManageableRole)}
            >
              <SelectTrigger id="invite-role">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MANAGEABLE_ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={invite.isPending}>
            <UserPlus className="w-4 h-4 mr-2" />
            {invite.isPending ? "Inviting…" : "Send invite"}
          </Button>
        </div>
      </form>

      {/* Manual handover fallback */}
      {handover && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-sm font-semibold text-amber-900">
                Hand these details to {handover.email}
              </h2>
              <p className="text-sm text-amber-800 mt-1">
                No invitation email could be sent automatically. Share the link
                {handover.password ? " (or the temporary password)" : ""} privately.
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setHandover(null)}>
              Dismiss
            </Button>
          </div>
          {handover.actionLink && (
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-white border border-amber-200 px-3 py-2 text-xs text-slate-700">
                {handover.actionLink}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copy("Link", handover.actionLink!)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
          {handover.password && (
            <div className="flex items-center gap-2">
              <code className="flex-1 truncate rounded bg-white border border-amber-200 px-3 py-2 text-xs text-slate-700">
                {handover.password}
              </code>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copy("Password", handover.password!)}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="text-slate-500 py-16 text-center">Loading…</div>
      ) : error ? (
        <div className="text-center py-16 bg-white rounded-lg border border-slate-200 text-slate-600">
          {(error as Error).message}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left font-medium px-4 py-3">Email</th>
                <th className="text-left font-medium px-4 py-3">Role</th>
                <th className="text-left font-medium px-4 py-3">Status</th>
                <th className="text-left font-medium px-4 py-3">Last sign-in</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(users ?? []).map((u) => {
                const isSelf = u.id === callerId;
                const readOnly = (u.isDeveloper && !callerIsDeveloper) || isSelf;
                return (
                  <tr key={u.id} className="border-t border-slate-100 align-middle">
                    <td className="px-4 py-3 text-slate-900">
                      {u.email}
                      {isSelf && <span className="text-slate-400"> (you)</span>}
                    </td>
                    <td className="px-4 py-3">
                      <RoleBadge role={u.role} />
                    </td>
                    <td className="px-4 py-3">
                      {u.confirmed ? (
                        <span className="text-emerald-700">Confirmed</span>
                      ) : (
                        <span className="text-amber-700">Pending</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(u.lastSignInAt)}
                    </td>
                    <td className="px-4 py-3">
                      {readOnly ? (
                        <div className="text-right text-xs text-slate-400">
                          {isSelf ? "Your account" : "Managed by developer"}
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <Select
                            value={
                              u.role === "owner" || u.role === "editor" ? u.role : ""
                            }
                            onValueChange={(v) => changeRole(u, v as ManageableRole)}
                          >
                            <SelectTrigger className="h-8 w-32">
                              <SelectValue placeholder="Set role" />
                            </SelectTrigger>
                            <SelectContent>
                              {MANAGEABLE_ROLES.map((r) => (
                                <SelectItem key={r} value={r}>
                                  {ROLE_LABELS[r]}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={!u.role}
                            onClick={() => setPending({ kind: "revoke", user: u })}
                          >
                            Revoke
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => setPending({ kind: "delete", user: u })}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {(users ?? []).length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-16 text-center text-slate-500">
                    No users yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <AlertDialog open={pending !== null} onOpenChange={(o) => !o && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {pending?.kind === "delete" ? "Delete this account?" : "Revoke access?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.kind === "delete"
                ? `${pending?.user.email} will be permanently deleted. This cannot be undone.`
                : `${pending?.user.email} will lose admin access. The account stays, so access can be granted again later.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmPending}
              className={
                pending?.kind === "delete"
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : undefined
              }
            >
              {pending?.kind === "delete" ? "Delete" : "Revoke"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function AdminUsers() {
  return (
    <AdminProtected>
      <AdminUsersInner />
    </AdminProtected>
  );
}
