import { Skeleton } from "@/components/ui/skeleton";

export default function GameCardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <Skeleton className="aspect-video w-full bg-muted/40" />
      <div className="p-3 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-2/3 bg-muted/40" />
          <Skeleton className="h-5 w-16 bg-muted/40 rounded-full" />
        </div>
        <Skeleton className="h-3 w-full bg-muted/40" />
        <Skeleton className="h-3 w-4/5 bg-muted/40" />
      </div>
    </div>
  );
}
