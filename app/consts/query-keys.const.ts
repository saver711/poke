export const QUERY_KEYS = {
	pokemons_list: (offset: number) => ["pokemon-list", offset] as const,
	pokemon_details: (name: string) => ["pokemon-detail", name] as const,
	pokemons_more: (page: number) => ["pokemon-list-more", page] as const,
};
