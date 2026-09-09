import { Application } from "@/types/application";

export const applications: Application[] = [
  {
    id: "app-1",
    applicantId: "user-4",
    opportunityId: "event-1",
    opportunityType: "EVENT",
    status: "ACCEPTED",
    appliedAt: "2026-08-15T10:30:00Z",
    motivation: "I'm passionate about AI and would love to learn from industry experts.",
    updatedAt: "2026-08-20T14:00:00Z",
  },
  {
    id: "app-2",
    applicantId: "user-5",
    opportunityId: "event-1",
    opportunityType: "EVENT",
    status: "PENDING",
    appliedAt: "2026-08-20T09:15:00Z",
    motivation: "As a developer, I'm excited about the AI topics and networking opportunities.",
  },
  {
    id: "app-3",
    applicantId: "user-4",
    opportunityId: "research-1",
    opportunityType: "RESEARCH",
    status: "REVIEWING",
    appliedAt: "2026-08-10T11:00:00Z",
    motivation: "I've been working remotely for 3 years and would love to contribute to this research.",
    updatedAt: "2026-08-25T16:30:00Z",
  },
  {
    id: "app-4",
    applicantId: "user-5",
    opportunityId: "research-1",
    opportunityType: "RESEARCH",
    status: "REJECTED",
    appliedAt: "2026-08-12T14:45:00Z",
    motivation: "Interested in how remote work affects mental health.",
    updatedAt: "2026-08-28T10:00:00Z",
    feedback: "We have reached our participant limit for this study.",
  },
];
