import { Skeleton } from '@/components/ui/skeleton';

export default function CourseInfoSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-between">
        <Skeleton className="w-[180px] h-[32px] bg-slate-200" />
        <Skeleton className="w-[120px] h-[32px] bg-slate-200" />
      </div>
      <Skeleton className="w-[220px] h-[32px] bg-slate-200" />
      <div className="flex gap-7 justify-between">
        <div className="w-[32%] flex flex-col gap-3">
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-[50%] h-[12px] bg-slate-200" />
        </div>
        <div className="w-[30%] flex flex-col gap-3">
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-[50%] h-[12px] bg-slate-200" />
        </div>

        <div className="w-[32%] flex flex-col gap-3">
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-full h-[12px] bg-slate-200" />
          <Skeleton className="w-[50%] h-[12px] bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
