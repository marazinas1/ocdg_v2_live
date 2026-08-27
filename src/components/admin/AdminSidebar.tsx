import { Link, useLocation, useNavigate } from "react-router-dom";
import { Building2, Inbox, LayoutDashboard, LogOut, UserCog } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { AdminRole } from "@/hooks/admin/useAdminAuth";
import { Badge } from "@/components/ui/badge";
import { useUnreadInquiryCount } from "@/hooks/admin/useInquiries";
import ocdgLogo from "@/assets/ocdg-logo.png";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const ITEMS = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
    match: (p: string) => p === "/admin",
  },
  {
    title: "Properties",
    url: "/admin/properties",
    icon: Building2,
    match: (p: string) => p.startsWith("/admin/properties"),
  },
  {
    title: "Inquiries",
    url: "/admin/inquiries",
    icon: Inbox,
    match: (p: string) => p.startsWith("/admin/inquiries"),
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: UserCog,
    match: (p: string) => p.startsWith("/admin/users"),
  },
];

const ROLE_LABEL: Record<AdminRole, string> = {
  developer: "Developer",
  owner: "Owner",
};

export default function AdminSidebar({
  email,
  role,
}: {
  email: string;
  role: AdminRole;
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { state, isMobile, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const { data: unreadCount = 0 } = useUnreadInquiryCount();

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login", { replace: true });
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-slate-200">
        <Link to="/admin" className="flex items-center h-12 px-2 gap-2 min-w-0">
          <img
            src={ocdgLogo}
            alt="Ocean City Development Group"
            className={collapsed ? "h-6 w-auto" : "h-8 w-auto"}
          />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {ITEMS.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={item.match(pathname)}
                    tooltip={item.title}
                  >
                    <Link
                      to={item.url}
                      className="flex items-center gap-2"
                      onClick={() => {
                        if (isMobile) setOpenMobile(false);
                      }}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className={`px-2 py-1 ${collapsed ? "hidden" : ""}`}>
              <div className="text-xs text-slate-600 truncate">{email}</div>
              <div className="text-[11px] uppercase tracking-wider text-slate-400">
                {ROLE_LABEL[role]}
              </div>
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={signOut} tooltip="Sign out">
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
