import { appFetch } from "@/lib/poke-utils/app-fetch";
import { INCREMENTAL_PAGE_SIZE } from "../consts";
import type { Pokemon } from "../models";
import type { PokeResponse } from "../models/poke-response.model";

interface GetPokemonsParams {
	offset?: number;
	limit?: number;
}

export const getPokemons = async ({
	offset = 0,
	limit = INCREMENTAL_PAGE_SIZE,
}: GetPokemonsParams): Promise<PokeResponse> => {
	const params = new URLSearchParams({
		offset: String(offset),
		limit: String(limit),
	});

	const res = await appFetch(`/api/pokemons?${params.toString()}`);

	if (!res.ok) {
		throw new Error(
			`Failed to fetch Pokemon list from API handler: ${res.statusText}`,
		);
	}
	return res.json();
};

export const getPokemonDetails = async (name: string): Promise<Pokemon> => {
	const res = await appFetch(`/api/pokemons/${name}`);

	if (!res.ok) {
		throw new Error(
			`Failed to fetch Pokemon list from API handler: ${res.statusText}`,
		);
	}
	return res.json();
};
