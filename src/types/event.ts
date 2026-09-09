import { Opportunity } from "./opportunity";

export interface Event extends Opportunity {
  type: "EVENT";
  location: string;
  startDate: string;
  endDate: string;
  quota: number;
  registeredCount: number;
  isOnline?: boolean;
  meetingLink?: string;
}
