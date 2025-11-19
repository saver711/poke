"use client";
import { useQueryState } from "nuqs";
import { Suspense, useTransition } from "react";
import { setModeAction } from "@/app/actions/set-mode.action";
import type { Mode } from "@/app/models";
import { PaginatedListSkeleton } from "./paginated-list-skeleton";
import { PaginatedPokemons } from "./paginated-pokemons";
import { PokemonsMore } from "./pokemons-more";
import { Button } from "./ui/button";

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

	const changeMode = (newMode: Mode) => {
		setMode(newMode);
		startTransition(async () => {
			await setModeAction(newMode);
		});
	};

	return (
		<>
			<div className="flex justify-center items-center gap-2 mb-8">
				<Button
					onClick={() => changeMode("pagination")}
					disabled={isPending || mode === "pagination"}
					variant={mode === "pagination" ? "default" : "outline"}
					className={
						mode === "pagination"
							? "bg-red-600 hover:bg-red-700"
							: "hover:bg-gray-200"
					}
				>
					Pagination View
				</Button>
				<Button
					onClick={() => changeMode("more")}
					disabled={isPending || mode === "more"}
					variant={mode === "more" ? "default" : "outline"}
					className={
						mode === "more"
							? "bg-red-600 hover:bg-red-700"
							: "hover:bg-gray-200"
					}
				>
					Show More View
				</Button>
			</div>

			{mode === "pagination" && (
				<Suspense fallback={<PaginatedListSkeleton />}>
					<PaginatedPokemons />
				</Suspense>
			)}
			{mode === "more" && <PokemonsMore />}
		</>
	);
};
