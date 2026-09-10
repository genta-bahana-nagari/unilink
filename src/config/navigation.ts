import {
  FiLayout,
  FiUsers,
  FiCalendar,
  FiBell,
  FiCheckCircle,
  FiUser,
  FiList,
  FiSearch,
  FiBriefcase,
  FiBookOpen,
  FiMail,
} from "react-icons/fi";
import { GiMicroscope } from "react-icons/gi";
import { IconType } from "react-icons";

export interface NavigationItem {
  label: string;
  href: string;
  icon: IconType;
  exact?: boolean;
}

export const adminNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/admin", icon: FiLayout, exact: true },
  { label: "Users", href: "/admin/users", icon: FiUsers },
  { label: "Organizers", href: "/admin/organizers", icon: FiUsers },
  { label: "Events", href: "/admin/events", icon: FiCalendar },
  { label: "Research", href: "/admin/research", icon: GiMicroscope },
  { label: "Announcements", href: "/admin/announcements", icon: FiBell },
  { label: "Approvals", href: "/admin/approvals", icon: FiCheckCircle },
];

export const organizerNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/organizer", icon: FiLayout, exact: true },
  { label: "Events", href: "/organizer/events", icon: FiCalendar },
  { label: "Research", href: "/organizer/research", icon: GiMicroscope },
  { label: "Announcements", href: "/organizer/announcements", icon: FiBell },
  { label: "Profile", href: "/organizer/profile", icon: FiUser },
];

export const participantNavigation: NavigationItem[] = [
  { label: "Dashboard", href: "/participant", icon: FiLayout, exact: true },
  { label: "Explore", href: "/participant/explore", icon: FiSearch },
  { label: "Applications", href: "/participant/applications", icon: FiList },
  { label: "Profile", href: "/participant/profile", icon: FiUser },
];

export const publicNavigation: NavigationItem[] = [
  { label: "Events", href: "/events", icon: FiCalendar },
  { label: "Research", href: "/research", icon: GiMicroscope },
  { label: "Announcements", href: "/announcements", icon: FiBell },
  { label: "Careers", href: "/careers", icon: FiBriefcase },
  { label: "Blog", href: "/blog", icon: FiBookOpen },
  { label: "Contact", href: "/contact", icon: FiMail },
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