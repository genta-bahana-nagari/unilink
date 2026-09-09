import { ApplicationStatus as AppStatus } from "@/types/application";
import { Badge } from "@/components/ui/badge";

interface ApplicationStatusProps {
  status: AppStatus;
}

const statusConfig: Record<
  AppStatus,
  { variant: "default" | "success" | "warning" | "danger" | "info" }
> = {
  PENDING: { variant: "warning" },
  REVIEWING: { variant: "info" },
  ACCEPTED: { variant: "success" },
  REJECTED: { variant: "danger" },
  COMPLETED: { variant: "default" },
};

export function ApplicationStatus({ status }: ApplicationStatusProps) {
  return (
    <Badge variant={statusConfig[status].variant}>
      {status.replace("_", " ")}
    </Badge>
  );
}
