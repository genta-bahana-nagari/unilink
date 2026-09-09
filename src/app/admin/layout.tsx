import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { adminNavigation } from "@/config/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={adminNavigation} role={user?.role || "ADMIN"} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
