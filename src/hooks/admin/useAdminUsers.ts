import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Roles that can be granted through the UI. 'developer' is never offered. */
export const MANAGEABLE_ROLES = ["owner", "editor"] as const;
export type ManageableRole = (typeof MANAGEABLE_ROLES)[number];

export const ROLE_LABELS: Record<string, string> = {
  developer: "Developer",
  owner: "Owner",
  editor: "Editor",
};

export type AdminUser = {
  id: string;
  email: string;
  role: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  confirmed: boolean;
  isDeveloper: boolean;
  isLastOwner: boolean;
};

export type InviteResult = {
  success: true;
  userId: string;
  emailSent: boolean;
  password: string | null;
  actionLink: string | null;
  reinvited?: boolean;
};

type Action =
  | { action: "list" }
  | { action: "invite"; email: string; role: ManageableRole }
  | { action: "set_role"; userId: string; role: ManageableRole }
  | { action: "revoke"; userId: string }
  | { action: "delete_user"; userId: string };

/**
 * Calls the manage-users function and surfaces the backend's own error text
 * (guard messages like "At least one owner account must remain") verbatim.
 */
async function callManageUsers<T>(body: Action): Promise<T> {
  const { data, error } = await supabase.functions.invoke("manage-users", { body });

  if (error) {
    // Non-2xx: the readable message lives in the JSON body, not in `error`.
    let message = error.message;
    const res = (error as { context?: Response }).context;
    if (res && typeof res.json === "function") {
      try {
        const payload = await res.clone().json();
        if (typeof payload?.error === "string") message = payload.error;
      } catch {
        /* keep the transport message */
      }
    }
    throw new Error(message || "Request failed.");
  }

  if (data && typeof data === "object" && "error" in (data as Record<string, unknown>)) {
    const e = (data as { error: unknown }).error;
    throw new Error(typeof e === "string" ? e : "Request failed.");
  }

  return data as T;
}

const usersKey = ["admin-users"] as const;

export function useAdminUsers() {
  return useQuery({
    queryKey: usersKey,
    queryFn: async (): Promise<AdminUser[]> => {
      const data = await callManageUsers<{ users: AdminUser[] }>({ action: "list" });
      return data.users ?? [];
    },
  });
}

function useUsersMutation<TVars>(fn: (vars: TVars) => Promise<unknown>) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey });
    },
  });
}

export function useInviteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { email: string; role: ManageableRole }) =>
      callManageUsers<InviteResult>({ action: "invite", ...vars }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: usersKey });
    },
  });
}

export function useSetUserRole() {
  return useUsersMutation((vars: { userId: string; role: ManageableRole }) =>
    callManageUsers({ action: "set_role", ...vars }),
  );
}

export function useRevokeUser() {
  return useUsersMutation((vars: { userId: string }) =>
    callManageUsers({ action: "revoke", userId: vars.userId }),
  );
}

export function useDeleteUser() {
  return useUsersMutation((vars: { userId: string }) =>
    callManageUsers({ action: "delete_user", userId: vars.userId }),
  );
}
