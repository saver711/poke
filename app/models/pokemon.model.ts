export interface Pokemon {
	height: number;
	id: number;
	name: string;
	weight: number;
	sprites: {
		back_default: string;
		back_female: string | null;
		back_shiny: string;
		back_shiny_female: string | null;
		front_default: string;
		front_female: string | null;
		front_shiny: string;
		front_shiny_female: string | null;
		other: {
			"official-artwork": {
				front_default: string;
				front_shiny: string;
			};
		};
	};
}
