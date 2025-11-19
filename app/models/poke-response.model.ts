export interface PokeResponse {
	count: number;
	next: string; // https://pokeapi.co/api/v2/pokemon?offset=4&limit=2
	previous: string; // https://pokeapi.co/api/v2/pokemon?offset=0&limit=2
	results: {
		name: string;
		url: string; // https://pokeapi.co/api/v2/pokemon/1/
	}[];
}
