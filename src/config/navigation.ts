import { NavigationItem } from "@/config/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  FlaskConical,
  Bell,
  CheckCircle,
  User,
  ListChecks,
  Megaphone,
  Search,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: any;
  exact?: boolean;
}

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Organizers", href: "/admin/organizers", icon: Users },
  { label: "Events", href: "/admin/events", icon: Calendar },
  { label: "Research", href: "/admin/research", icon: FlaskConical },
  { label: "Announcements", href: "/admin/announcements", icon: Bell },
  { label: "Approvals", href: "/admin/approvals", icon: CheckCircle },
];

export const organizerNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/organizer", icon: LayoutDashboard, exact: true },
  { label: "Events", href: "/organizer/events", icon: Calendar },
  { label: "Research", href: "/organizer/research", icon: FlaskConical },
  { label: "Announcements", href: "/organizer/announcements", icon: Megaphone },
  { label: "Profile", href: "/organizer/profile", icon: User },
];

export const participantNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/participant", icon: LayoutDashboard, exact: true },
  { label: "Explore", href: "/participant/explore", icon: Search },
  { label: "Applications", href: "/participant/applications", icon: ListChecks },
  { label: "Profile", href: "/participant/profile", icon: User },
];

export const publicNavigation: NavigationItem[] = [
  { label: "Events", href: "/events", icon: Calendar },
  { label: "Research", href: "/research", icon: FlaskConical },
  { label: "Announcements", href: "/announcements", icon: Bell },
];

export function getNavigationByRole(role: string | null): NavigationItem[] {
  switch (role?.toUpperCase()) {
    case "ADMIN":
      return adminNavigation;
    case "ORGANIZER":
      return organizerNavigation;
    case "PARTICIPANT":
      return participantNavigation;
    default:
      return publicNavigation;
  }
}
