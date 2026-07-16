import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listPropertiesTool from "./tools/list-properties";
import getPropertyTool from "./tools/get-property";
import listLeadsTool from "./tools/list-leads";

// The OAuth issuer MUST be the direct Supabase host, built from the project
// ref (never from SUPABASE_URL, which may be the Lovable Cloud proxy). Vite
// inlines VITE_SUPABASE_PROJECT_ID as a literal at build time, keeping this
// import-safe for the manifest-extract eval and the Edge Function cold start.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "ocdg-admin-mcp",
  title: "Ocean City Development Group",
  version: "0.1.0",
  instructions:
    "Tools to inspect Ocean City Development Group's property portfolio and inquiry leads. " +
    "Use `list_properties` to browse the portfolio, `get_property` for full details on one home, " +
    "and `list_leads` to review recent inquiries (admin only).",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listPropertiesTool, getPropertyTool, listLeadsTool],
});