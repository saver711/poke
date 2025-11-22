"use client";
import { useQueryState } from "nuqs";
import { Suspense, useState, useTransition } from "react";
import { setModeAction } from "@/app/actions/set-mode.action";
import type { Mode } from "@/app/models";
import { cn } from "@/lib/utils";
import { PaginatedListSkeleton } from "./paginated-list-skeleton";
import { PaginatedPokemons } from "./paginated-pokemons";
import { PokemonsMore } from "./pokemons-more";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface PokemonsListProps {
	defaultMode: Mode;
}
export const PokemonsList = ({ defaultMode }: PokemonsListProps) => {
	const [isPending, startTransition] = useTransition();
	const [mode, setMode] = useQueryState<Mode>("mode", {
		defaultValue: defaultMode,
		parse: (value) => {
			if (value === "pagination" || value === "more") return value;
			return null;
		},
	});
	const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);

	const changeMode = (newMode: Mode) => {
		setMode(newMode);
		startTransition(async () => {
			await setModeAction(newMode);
		});
	};

	return (
		<>
			<div
				className={cn(
					"flex flex-col items-center gap-4 mb-8  py-4 z-10 transition-all duration-300",
					isInfiniteScroll &&
						mode === "more" &&
						"sticky top-0 shadow-md bg-background",
				)}
			>
				<div className="flex justify-center items-center gap-2">
					<Button
						onClick={() => changeMode("pagination")}
						disabled={isPending || mode === "pagination"}
						variant={mode === "pagination" ? "default" : "outline"}
						className={cn({
							"bg-red-600 hover:bg-red-700": mode === "pagination",
							"hover:bg-gray-200": mode !== "pagination",
						})}
					>
						Pagination View
					</Button>
					<Button
						onClick={() => changeMode("more")}
						disabled={isPending || mode === "more"}
						variant={mode === "more" ? "default" : "outline"}
						className={cn({
							"bg-red-600 hover:bg-red-700": mode === "more",
							"hover:bg-gray-200": mode !== "more",
						})}
					>
						Show More View
					</Button>

					{mode === "more" && (
						<div className="flex items-center space-x-2">
							<Switch
								id="infinite-scroll"
								checked={isInfiniteScroll}
								onCheckedChange={setIsInfiniteScroll}
							/>
							<Label htmlFor="infinite-scroll">Infinite Scroll</Label>
						</div>
					)}
				</div>
			</div>

			{mode === "pagination" && (
				<Suspense fallback={<PaginatedListSkeleton />}>
					<PaginatedPokemons />
				</Suspense>
			)}
			{mode === "more" && <PokemonsMore infiniteScroll={isInfiniteScroll} />}
		</>
	);
};
