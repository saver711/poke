import { ArrowLeft, Ruler, Weight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Pokemon } from "@/app/models";
import { getPokemonDetails } from "@/app/services/pokemons.service";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPokemonName } from "@/lib/poke-utils/index";
import { cn } from "@/lib/utils";

// export const revalidate = 86400; // 24 hours
// export const dynamicParams = true; // dynamic parameters that aren't pre-generated

// export async function generateStaticParams() {
// 	// Fetch the first 50 Pokemon to pre-render at build time. [This might not the best thing to do - but i just wanted to demonstrate]
// 	// We fetch directly from PokeAPI here to avoid build-time localhost fetch issues.
// 	try {
// 		const res = await fetch(`${POKE_API_BASE_URL}/pokemon?limit=50`);
// 		const data = await res.json();

// 		return data.results.map((pokemon: { name: string }) => ({
// 			name: pokemon.name,
// 		}));
// 	} catch (_error) {
// 		console.warn("Failed to generate static params:", _error);
// 		return [];
// 	}
// }

interface Props {
	params: Promise<{
		name: string;
	}>;
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
// 	try {
// 		const metaParams = await params;
// 		const pokemon = await getPokemonDetails(metaParams.name);
// 		const formattedName = formatPokemonName(pokemon.name);

// 		return {
// 			title: `${formattedName} | PokéDex`,
// 			description: `Discover stats, types, and sprites for ${formattedName}.`,
// 			openGraph: {
// 				title: `${formattedName} | PokéDex`,
// 				description: `Height: ${pokemon.height} | Weight: ${pokemon.weight}`,
// 				images: [
// 					{
// 						url:
// 							pokemon.sprites.other["official-artwork"].front_default ||
// 							pokemon.sprites.front_default ||
// 							"",
// 						width: 800,
// 						height: 600,
// 						alt: formattedName,
// 					},
// 				],
// 			},
// 		};
// 	} catch {
// 		return {
// 			title: "Pokémon Not Found",
// 		};
// 	}
// }

export default async function PokemonPage({ params }: Props) {
	const pageParams = await params;
	let pokemon: Pokemon;

	try {
		pokemon = await getPokemonDetails(pageParams.name);
	} catch (_error) {
		notFound();
	}

	const formattedName = formatPokemonName(pokemon.name);
	const mainImage =
		pokemon.sprites.other["official-artwork"].front_default ||
		pokemon.sprites.front_default;
	const spriteImage = pokemon.sprites.front_default;

	return (
		<main className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center justify-center relative">
			<div className="absolute top-6 left-6 sm:top-10 sm:left-10 z-10">
				<Link href="/pokemons">
					<Button
						variant="outline"
						className="gap-2 bg-white/80 backdrop-blur-sm hover:bg-white"
					>
						<ArrowLeft className="h-4 w-4" />
						Back to List
					</Button>
				</Link>
			</div>

			<Card className="w-full max-w-3xl shadow-2xl overflow-hidden border-none animate-in fade-in slide-in-from-bottom-4 duration-700">
				<div className="bg-linear-to-r from-purple-500 to-pink-500 p-6 text-white flex justify-between items-center">
					<h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
						{formattedName}
					</h1>
					<span className="text-xl font-mono opacity-80">#{pokemon.id}</span>
				</div>

				<CardContent className="p-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
						<div className="flex flex-col items-center justify-center gap-6 relative">
							<div className="relative w-[300px] h-[300px] flex items-center justify-center">
								<div className="absolute inset-0 bg-gray-100 rounded-full transform scale-90" />
								{mainImage && (
									<Image
										src={mainImage}
										alt={formattedName}
										fill
										className="object-contain z-10 drop-shadow-xl hover:scale-110 transition-transform duration-500"
										priority
									/>
								)}
							</div>

							{spriteImage && (
								<div className="flex flex-col items-center gap-2">
									<span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
										In-Game Sprite
									</span>
									<div className="relative w-20 h-20 bg-gray-50 rounded-lg border border-gray-200 p-2">
										<Image
											src={spriteImage}
											alt={`${formattedName} sprite`}
											fill
											className="object-contain pixelated"
										/>
									</div>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-8">
							<div className="space-y-3">
								<h3 className="text-lg font-semibold text-gray-900">Type</h3>
								<div className="flex flex-wrap gap-3">
									{pokemon.types.map(({ type }) => (
										<span
											key={type.name}
											className={cn(
												"px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide text-white shadow-md transform transition-transform hover:scale-105",
												getTypeColor(type.name),
											)}
										>
											{type.name}
										</span>
									))}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-gray-100">
									<div className="flex items-center gap-2 text-muted-foreground mb-1">
										<Ruler className="w-4 h-4" />
										<span className="text-sm font-medium uppercase">
											Height
										</span>
									</div>
									<span className="text-2xl font-bold text-gray-800">
										{pokemon.height} m
									</span>
								</div>

								<div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col items-center justify-center gap-2 transition-colors hover:bg-gray-100">
									<div className="flex items-center gap-2 text-muted-foreground mb-1">
										<Weight className="w-4 h-4" />
										<span className="text-sm font-medium uppercase">
											Weight
										</span>
									</div>
									<span className="text-2xl font-bold text-gray-800">
										{pokemon.weight} kg
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}

function getTypeColor(type: string) {
	const colors: Record<string, string> = {
		fire: "bg-red-500",
		water: "bg-blue-500",
		grass: "bg-green-500",
		electric: "bg-yellow-500",
		ice: "bg-cyan-500",
		fighting: "bg-orange-500",
		poison: "bg-purple-500",
		ground: "bg-amber-600",
		flying: "bg-violet-500",
		psychic: "bg-pink-500",
		bug: "bg-lime-500",
		rock: "bg-stone-500",
		ghost: "bg-indigo-500",
		dragon: "bg-violet-700",
		steel: "bg-slate-500",
		fairy: "bg-fuchsia-500",
		normal: "bg-gray-400",
	};
	return colors[type] || "bg-gray-500";
}
