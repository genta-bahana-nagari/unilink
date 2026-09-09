export type AnnouncementType = "INFO" | "UPDATE" | "IMPORTANT";

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: AnnouncementType;
  authorId: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
}
