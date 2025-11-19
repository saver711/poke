"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useQueryState } from "nuqs";
import { Suspense } from "react";
import { INCREMENTAL_PAGE_SIZE, QUERY_KEYS } from "@/app/consts";
import { getPokemons } from "@/app/services/pokemons.service";
import { CardSkeleton } from "./card-skeleton";
import { PokePagination } from "./poke-pagination";
import { PokemonCard } from "./pokemon-card";
export const PaginatedPokemons = () => {
	const [page, setPage] = useQueryState("page", {
		defaultValue: 1,
		parse: (value) => parseInt(value, 10) || 1,
		history: "push",
	});

	const offset = (page - 1) * INCREMENTAL_PAGE_SIZE;

	const { data: listData } = useSuspenseQuery({
		queryKey: QUERY_KEYS.pokemons_list(offset),
		queryFn: () => getPokemons({ offset, limit: INCREMENTAL_PAGE_SIZE }),
	});

	const totalPages = Math.ceil(listData.count / INCREMENTAL_PAGE_SIZE);
	const currentPage = page;

	return (
		<div className="p-4 mx-auto container">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{listData.results.map((pokemon) => (
					<Suspense key={pokemon.name} fallback={<CardSkeleton />}>
						<PokemonCard name={pokemon.name} />
					</Suspense>
				))}
			</div>

			<PokePagination
				totalPages={totalPages}
				currentPage={currentPage}
				setPage={setPage}
			/>
		</div>
	);
};
