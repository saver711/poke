import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { PokemonsList } from "@/components/pokemons-list";
import { Button } from "@/components/ui/button";
import type { Mode } from "../models/mode.model";

export default async function ListPage() {
	const cookieStore = await cookies();
	const modeCookie = cookieStore.get("mode")?.value as Mode | undefined;
	const defaultMode: Mode = modeCookie === "more" ? "more" : "pagination";
	return (
		<main className="min-h-screen bg-gray-50">
			<header className="py-6 bg-white shadow-md relative">
				<div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
					<Link
						className="absolute left-1 sm:left-5 top-1/2 -translate-y-1/2"
						href="/"
					>
						<Button variant="ghost" className="gap-2">
							<ArrowLeft className="h-4 w-4" />
							Home
						</Button>
					</Link>
					<div className="text-center grow">
						<h1 className="text-4xl font-extrabold text-red-600 tracking-tight">
							PokéDex
						</h1>
						<p className="text-sm text-gray-500 mt-1">Explore Pokémons</p>
					</div>
				</div>
			</header>

			<PokemonsList defaultMode={defaultMode} />
		</main>
	);
}
