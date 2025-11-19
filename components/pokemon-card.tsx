"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import { QUERY_KEYS } from "@/app/consts";
import { getPokemonDetails } from "@/app/services/pokemons.service";
import { formatPokemonName } from "@/lib/poke-utils/format-pokemon-name";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

export const PokemonCard = ({ name }: { name: string }) => {
	const { data: details } = useSuspenseQuery({
		queryKey: QUERY_KEYS.pokemon_details(name),
		queryFn: () => getPokemonDetails(name),
	});

	const formattedName = formatPokemonName(details.name);
	// We can add fallback image here
	const imageUrl =
		details.sprites.other["official-artwork"].front_default || "";

	return (
		<Card className="hover:shadow-lg transition-shadow duration-300">
			<CardHeader className="flex pb-2 flex-col gap-1">
				<CardTitle className="text-2xl font-bold">{formattedName}</CardTitle>
				<CardDescription className="text-sm font-mono text-muted-foreground">
					ID: #{details.id}
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col items-center">
				<div className="relative w-[150px] h-[150px]">
					{imageUrl && (
						<Image
							src={imageUrl}
							alt={formattedName}
							fill
							style={{ objectFit: "contain" }}
						/>
					)}
				</div>
			</CardContent>
			<CardFooter className="flex justify-between text-sm text-muted-foreground">
				<span>Weight: {details.weight} kg</span>
				<span>Height: {details.height} m</span>
			</CardFooter>
		</Card>
	);
};
