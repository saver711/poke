import { Skeleton } from "@/components/ui/skeleton";

export function PaginationSkeleton() {
	return (
		<div className="flex items-center gap-3 justify-center">
			{/* Previous */}
			<Skeleton className="h-5 w-16 bg-slate-300" />

			{/* 1 */}
			<Skeleton className="h-7 w-7 rounded-md bg-slate-300" />

			{/* ... */}
			<Skeleton className="h-5 w-6 bg-slate-300" />

			{/* 3 */}
			<Skeleton className="h-7 w-7 rounded-md bg-slate-300" />

			{/* current page (highlighted) */}
			<Skeleton className="h-7 w-7 rounded-xl bg-slate-400" />

			{/* 5 */}
			<Skeleton className="h-7 w-7 rounded-md bg-slate-300" />

			{/* last page */}
			<Skeleton className="h-7 w-10 rounded-md bg-slate-300" />

			{/* Next */}
			<Skeleton className="h-5 w-12 bg-slate-300" />
		</div>
	);
}
