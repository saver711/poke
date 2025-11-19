import { NextResponse } from "next/server";
import { POKE_API_BASE_URL } from "@/app/consts";
import type { Pokemon } from "@/app/models/pokemon.model";

interface Context {
	params: Promise<{
		name: string;
	}>;
}

export const GET = async (_: Request, context: Context) => {
	const params = await context.params;
	const pokemonIdentifier = params.name;

	if (!pokemonIdentifier) {
		return NextResponse.json(
			{ error: "Missing Pokemon name or ID parameter." },
			{ status: 400 },
		);
	}

	const detailUrl = `${POKE_API_BASE_URL}/pokemon/${pokemonIdentifier}`;

	try {
		const res = await fetch(detailUrl);

		if (res.status === 404) {
			return NextResponse.json(
				{ error: `Pokemon '${pokemonIdentifier}' not found.` },
				{ status: 404 },
			);
		}

		if (!res.ok) {
			throw new Error(
				`Failed to fetch Pokemon details: ${res.status} ${res.statusText}`,
			);
		}

		const data: Pokemon = await res.json();

		return NextResponse.json(data);
	} catch (_) {
		return NextResponse.json(
			{ error: "Failed to retrieve Pokemon data from external API." },
			{ status: 500 },
		);
	}
};
