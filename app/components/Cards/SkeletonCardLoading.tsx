import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardLoading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-72 w-full rounded-lg" />
      <div className="space-y-2 flex flex-col">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className=" h-4 w-1/2" />
      </div>
    </div>
  );
}
