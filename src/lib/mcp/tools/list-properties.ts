import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_properties",
  title: "List properties",
  description:
    "List OCDG properties with optional status filter. Returns slug, title, status, price, published, and has_page.",
  inputSchema: {
    status: z
      .enum(["active", "under_contract", "coming_soon", "sold"])
      .optional()
      .describe("Filter by property status."),
    published_only: z.boolean().optional().describe("If true, only return published properties."),
    limit: z.number().int().min(1).max(200).optional().describe("Max rows to return (default 50)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async ({ status, published_only, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    let q = supabaseForUser(ctx)
      .from("properties")
      .select("slug,title,status,price,published,has_page,sort_order")
      .order("sort_order", { ascending: true })
      .limit(limit ?? 50);
    if (status) q = q.eq("status", status);
    if (published_only) q = q.eq("published", true);
    const { data, error } = await q;
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { properties: data ?? [] },
    };
  },
});