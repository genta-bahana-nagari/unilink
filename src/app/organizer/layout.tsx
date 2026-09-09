"use client";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { organizerNavigation } from "@/config/navigation";

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={organizerNavigation} role={user?.role || "ORGANIZER"} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
