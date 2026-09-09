export type ApplicationStatus = "PENDING" | "REVIEWING" | "ACCEPTED" | "REJECTED" | "COMPLETED";

export interface Application {
  id: string;
  applicantId: string;
  opportunityId: string;
  opportunityType: "EVENT" | "RESEARCH";
  status: ApplicationStatus;
  appliedAt: string;
  motivation: string;
  updatedAt?: string;
  feedback?: string;
}
