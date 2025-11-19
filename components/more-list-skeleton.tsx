import { CardSkeleton } from "./card-skeleton";
import { Skeleton } from "./ui/skeleton";

export const MoreListSkeleton = () => {
	return (
		<div className="p-4 mx-auto container">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
				{Array.from({ length: 12 }).map((_, index) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: Dummy array
					<CardSkeleton key={index} />
				))}
			</div>
			<div className="flex justify-center">
				<Skeleton className="h-9 w-36 rounded-full bg-slate-300" />
			</div>
		</div>
	);
};
