import { Skeleton } from '@/components/ui/skeleton';

export default function HeaderSkeleton() {
  return (
    <div className="flex items-center gap-5">
      <div className="space-y-1">
        <Skeleton className="h-1 w-[27px] bg-slate-300" />
        <Skeleton className="h-1 w-[27px] bg-slate-300" />
        <Skeleton className="h-1 w-[27px] bg-slate-300" />
      </div>
      <Skeleton className="h-10 w-10 rounded-full bg-slate-300" />
    </div>
  );
}
