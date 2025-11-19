/**
 * Utility to format a raw Pokémon name readable format.
 * @param name The raw Pokémon name string.
 * @returns The formatted name string.
 */
export const formatPokemonName = (name: string) => {
	if (!name) return "";
	return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
};
