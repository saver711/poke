import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CardSkeleton() {
	return (
		<Card className="rounded-xl shadow-md border border-slate-200 bg-white">
			<CardContent className="pt-6 pb-4 px-5 flex flex-col gap-4">
				{/* Title */}
				<Skeleton className="h-5 w-28 bg-slate-300" />
				{/* ID */}
				<Skeleton className="h-4 w-16 bg-slate-300" />

				{/* image  */}
				<div className="flex justify-center py-4">
					<Skeleton className="h-24 w-24 rounded-full bg-slate-300" />
				</div>

				{/* weight + height */}
				<div className="mt-2 flex items-center justify-between">
					<Skeleton className="h-3 w-24 bg-slate-300" />
					<Skeleton className="h-3 w-24 bg-slate-300" />
				</div>
			</CardContent>
		</Card>
	);
}
