import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminAuthState =
  | { status: "loading" }
  | { status: "unauthorized" }
  | { status: "admin"; userId: string; email: string };

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;

    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!active) return;
      if (!session) {
        setState({ status: "unauthorized" });
        return;
      }
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (!active) return;
      if (userError || !userData.user) {
        setState({ status: "unauthorized" });
        return;
      }
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userData.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!active) return;
      if (!roleRow) {
        await supabase.auth.signOut();
        setState({ status: "unauthorized" });
        return;
      }
      setState({
        status: "admin",
        userId: userData.user.id,
        email: userData.user.email ?? "",
      });
    };

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setState({ status: "unauthorized" });
      } else {
        // Re-verify role on token refresh / sign-in.
        setState({ status: "loading" });
        check();
      }
    });

    check();
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  return state;
}