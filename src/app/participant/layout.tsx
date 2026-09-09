"use client";

import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { useAuth } from "@/hooks/use-auth";
import { participantNavigation } from "@/config/navigation";

export default function ParticipantLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar items={participantNavigation} role={user?.role || "PARTICIPANT"} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
