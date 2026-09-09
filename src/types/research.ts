import { Opportunity } from "./opportunity";

export interface Research extends Opportunity {
  type: "RESEARCH";
  researcher: string;
  requiredParticipants: number;
  currentParticipants: number;
  criteria: string[];
  compensation?: string;
  duration?: string;
}
