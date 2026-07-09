import { PropertyStatus, STATUS_BADGE_CLASSES, STATUS_LABELS } from "@/lib/admin/status";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }: { status: PropertyStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        STATUS_BADGE_CLASSES[status],
      )}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}