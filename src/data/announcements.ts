import { Announcement } from "@/types/announcement";

export const announcements: Announcement[] = [
  {
    id: "announce-1",
    title: "Platform Launch Announcement",
    content:
      "We are excited to announce the official launch of Fivo! Explore opportunities, connect with organizers, and participate in exciting events and research.",
    type: "INFO",
    authorId: "user-1",
    createdAt: "2026-09-01T00:00:00Z",
    isActive: true,
  },
  {
    id: "announce-2",
    title: "New Feature: Application Tracking",
    content:
      "Track all your applications in one place! We've added a new dashboard feature that shows the status of all your applications at a glance.",
    type: "UPDATE",
    authorId: "user-1",
    createdAt: "2026-09-05T00:00:00Z",
    isActive: true,
  },
  {
    id: "announce-3",
    title: "Maintenance Scheduled",
    content:
      "Fivo will be undergoing maintenance on September 20th from 2:00 AM to 4:00 AM EST. The platform will be temporarily unavailable.",
    type: "IMPORTANT",
    authorId: "user-1",
    createdAt: "2026-09-10T00:00:00Z",
    expiresAt: "2026-09-21T00:00:00Z",
    isActive: true,
  },
];
