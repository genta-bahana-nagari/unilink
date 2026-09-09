export type OpportunityType = "EVENT" | "RESEARCH";
export type OpportunityStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED" | "CLOSED";

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  type: OpportunityType;
  organizerId: string;
  category: string;
  status: OpportunityStatus;
  createdAt: string;
  deadline?: string;
  image?: string;
}
