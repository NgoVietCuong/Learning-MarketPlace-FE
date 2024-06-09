import { Skeleton } from '@/components/ui/skeleton';

export default function AccountSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="h-11 w-11 rounded-full bg-slate-300" />
      <div className="space-y-2">
        <Skeleton className="h-2 w-[80px] bg-slate-300" />
        <Skeleton className="h-2 w-[120px] bg-slate-300" />
      </div>
    </div>
  );
}
