"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { INCREMENTAL_PAGE_SIZE, QUERY_KEYS } from "@/app/consts";
import { getPokemons } from "@/app/services/pokemons.service";
import { CardSkeleton } from "./card-skeleton";
import { MoreListSkeleton } from "./more-list-skeleton";
import { PokemonCard } from "./pokemon-card";
import { Button } from "./ui/button";

export const PokemonsMore = () => {
	const [pages, setPages] = useQueryState("pages", {
		defaultValue: 1,
		parse: (value) => parseInt(value) || 1,
		history: "push",
	});

	const totalLimit = pages * INCREMENTAL_PAGE_SIZE;

	const { data, isLoading, isFetching } = useQuery({
		queryKey: QUERY_KEYS.pokemons_more(pages),
		queryFn: () => getPokemons({ offset: 0, limit: totalLimit }),
		placeholderData: keepPreviousData,
	});

	const totalCount = data?.count || 0;
	const totalPages = Math.ceil(totalCount / INCREMENTAL_PAGE_SIZE);
	const hasMore = pages < totalPages;

	const loadNextPage = () => {
		if (!hasMore || isLoading) return;
		setPages(pages + 1);
	};

	if (!data && isLoading) {
		return <MoreListSkeleton />;
	}

	return (
		<div className="p-4 max-w-7xl mx-auto">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{data?.results.map((pokemon) => (
					<Suspense key={pokemon.name} fallback={<CardSkeleton />}>
						<PokemonCard name={pokemon.name} />
					</Suspense>
				))}
			</div>

			{hasMore && (
				<div className="flex justify-center mt-8">
					<Button
						onClick={loadNextPage}
						disabled={isFetching}
						className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-4"
					>
						{isFetching ? "Loading More..." : "View More"}
					</Button>
				</div>
			)}
		</div>
	);
};
