import { NextResponse } from "next/server";
import { DEFAULT_PAGE_SIZE } from "@/app/consts";
import type { PokeResponse } from "@/app/models/poke-response.model";

const POKE_API_BASE_URL = "https://pokeapi.co/api/v2";

export const GET = async (request: Request) => {
	const { searchParams } = new URL(request.url);

	const limit = searchParams.get("limit") || DEFAULT_PAGE_SIZE;
	const offset = searchParams.get("offset") || "0";

	if (Number.isNaN(Number(limit)) || Number.isNaN(Number(offset))) {
		return NextResponse.json(
			{ error: "Invalid limit or offset parameters." },
			{ status: 400 },
		);
	}

	const listUrl = `${POKE_API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;

	try {
		const res = await fetch(listUrl);

		if (!res.ok) {
			throw new Error(
				`Failed to fetch Pokemon list: ${res.status} ${res.statusText}`,
			);
		}

		const data: PokeResponse = await res.json();

		return NextResponse.json(data);
	} catch (_) {
		return NextResponse.json(
			{ error: "Failed to retrieve Pokemon data from external API." },
			{ status: 500 },
		);
	}
};
