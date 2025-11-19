import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white px-6">
			<div className="max-w-3xl text-center">
				<div className="flex items-center justify-center mb-6 text-yellow-400">
					<Image
						src="/home-img.png"
						alt="Webdocs Logo"
						width={220}
						height={120}
						className="opacity-90 dark:invert dark:brightness-200"
						priority
					/>
				</div>
				<h1 className="text-5xl font-extrabold sm:text-6xl tracking-tight text-yellow-400">
					Welcome to the PokéDex!
				</h1>

				<p className="mt-6 text-xl text-gray-300">
					Explore{" "}
					<strong className="tracking-tight text-red-500">
						hundreds of Pokémons
					</strong>
				</p>
				<div className="mt-12">
					<Link href="/pokemons">
						<Button
							size="lg"
							className="gap-3 cursor-pointer bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6 shadow-2xl shadow-red-500/50 transition-all duration-300 transform hover:scale-[1.03] hover:shadow-red-500/80"
						>
							Start Exploring Pokémons
							<ArrowRight className="h-5 w-5" />
						</Button>
					</Link>
				</div>
			</div>
			<footer className="absolute bottom-6 text-sm text-gray-500">
				Built with 🤍 for Daftra team.
			</footer>
		</main>
	);
}
