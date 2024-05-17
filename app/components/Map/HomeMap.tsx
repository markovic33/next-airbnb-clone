import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

export function HomeMap({ locationValue }: { locationValue: string }) {
  const LazyMap = dynamic(() => import("@/app/components/Map/Map"), {
    ssr: false,
    loading: () => <Skeleton className="h-[400px] w-full" />,
  });

  return <LazyMap locationValue={locationValue} />;
}
