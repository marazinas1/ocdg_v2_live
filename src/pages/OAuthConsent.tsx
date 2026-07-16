import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

// Only allow same-origin relative paths as post-login redirect targets.
function safeNext(): string {
  const path = window.location.pathname + window.location.search;
  if (!path.startsWith("/")) return "/";
  return path;
}

// The Supabase JS client's `auth.oauth` namespace is beta; wrap the three
// methods we need with typed shims so the consent page compiles cleanly.
type AuthzDetails = {
  client?: { name?: string; client_uri?: string };
  redirect_url?: string;
  redirect_to?: string;
};
type AuthzResult = { data: AuthzDetails | null; error: { message: string } | null };
const oauth = (supabase.auth as unknown as {
  oauth: {
    getAuthorizationDetails: (id: string) => Promise<AuthzResult>;
    approveAuthorization: (id: string) => Promise<AuthzResult>;
    denyAuthorization: (id: string) => Promise<AuthzResult>;
  };
}).oauth;

export default function OAuthConsent() {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<AuthzDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) {
        setError("Missing authorization_id");
        return;
      }
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        window.location.href = "/admin/login?next=" + encodeURIComponent(safeNext());
        return;
      }
      if (!oauth) {
        setError("OAuth authorization server is not available on this project.");
        return;
      }
      const { data, error } = await oauth.getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  async function decide(approve: boolean) {
    setBusy(true);
    const { data, error } = approve
      ? await oauth.approveAuthorization(authorizationId)
      : await oauth.denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      setError(error.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background-sand flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl text-charcoal mb-4">Authorization unavailable</h1>
          <p className="text-slate">{error}</p>
        </div>
      </main>
    );
  }
  if (!details) {
    return (
      <main className="min-h-screen bg-background-sand flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-charcoal/20 border-t-charcoal rounded-full animate-spin" />
      </main>
    );
  }
  const clientName = details.client?.name ?? "an external app";
  return (
    <main className="min-h-screen bg-background-sand flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-card border border-border-subtle rounded p-8">
        <p className="text-xs tracking-[0.3em] uppercase text-muted-slate mb-4 text-center">
          Agent Integrations
        </p>
        <h1 className="text-2xl md:text-3xl text-charcoal text-center mb-4">
          Connect {clientName}
        </h1>
        <p className="text-sm text-slate text-center mb-8">
          {clientName} is requesting permission to use OCDG's tools as your admin account.
          Approving will let it read properties and inquiry leads on your behalf.
        </p>
        <div className="flex flex-col gap-3">
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="w-full inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wider uppercase bg-charcoal text-white rounded hover:bg-charcoal/90 transition disabled:opacity-60"
          >
            {busy ? "Working…" : "Approve"}
          </button>
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="w-full inline-flex items-center justify-center px-8 py-3 text-sm font-medium tracking-wider uppercase border border-charcoal text-charcoal rounded hover:bg-charcoal/5 transition disabled:opacity-60"
          >
            Deny
          </button>
        </div>
      </div>
    </main>
  );
}