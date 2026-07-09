import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import GlobalNav from "@/components/GlobalNav";
import GlobalFooter from "@/components/GlobalFooter";

type State = "loading" | "valid" | "already" | "invalid" | "submitting" | "success" | "error";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    (async () => {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: SUPABASE_ANON_KEY } },
        );
        const json = await res.json();
        if (json.valid) setState("valid");
        else if (json.reason === "already_unsubscribed") setState("already");
        else setState("invalid");
      } catch {
        setState("invalid");
      }
    })();
  }, [token]);

  const confirm = async () => {
    if (!token) return;
    setState("submitting");
    const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
      body: { token },
    });
    if (error) return setState("error");
    if (data?.success) return setState("success");
    if (data?.reason === "already_unsubscribed") return setState("already");
    setState("error");
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <GlobalNav />
      <section className="flex-1 flex items-center justify-center section-padding">
        <div className="max-w-md w-full text-center">
          <p className="label-uppercase mb-4">Email Preferences</p>
          <h1 className="heading-section text-charcoal mb-6">Unsubscribe</h1>
          <div className="divider mx-auto mb-8" />

          {state === "loading" && <p className="text-body">Verifying your link…</p>}

          {state === "valid" && (
            <>
              <p className="text-body mb-8">
                Click below to confirm and stop receiving emails from Ocean City Development Group.
              </p>
              <button onClick={confirm} className="btn-primary">
                Confirm Unsubscribe
              </button>
            </>
          )}

          {state === "submitting" && <p className="text-body">Processing…</p>}

          {state === "success" && (
            <p className="text-body">
              You have been unsubscribed. We're sorry to see you go.
            </p>
          )}

          {state === "already" && (
            <p className="text-body">
              This email address has already been unsubscribed.
            </p>
          )}

          {state === "invalid" && (
            <p className="text-body">
              This unsubscribe link is invalid or has expired.
            </p>
          )}

          {state === "error" && (
            <p className="text-body">
              Something went wrong. Please try again later.
            </p>
          )}
        </div>
      </section>
      <GlobalFooter />
    </main>
  );
};

export default Unsubscribe;