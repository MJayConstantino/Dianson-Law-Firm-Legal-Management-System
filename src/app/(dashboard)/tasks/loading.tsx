import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-60" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-50" />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-70" />
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-60" />
          <Skeleton className="h-10 w-60" />
        </div>
      </div>

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  )
}

