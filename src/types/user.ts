export type UserRole = "ADMIN" | "ORGANIZER" | "PARTICIPANT";
export type UserStatus = "ACTIVE" | "INACTIVE" | "PENDING";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  createdAt: string;
  bio?: string;
  organization?: string;
}
