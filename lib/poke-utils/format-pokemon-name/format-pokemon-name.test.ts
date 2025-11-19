// This is just a simple test for demonstrating
import { describe, expect, test } from "vitest";
import { formatPokemonName } from "./format-pokemon-name";

describe("formatPokemonName", () => {
	test("should capitalize the first letter and lowercase the rest for a normal name", () => {
		expect(formatPokemonName("charmander")).toBe("Charmander");
		expect(formatPokemonName("RATTATA")).toBe("Rattata");
		expect(formatPokemonName("mEwTwO")).toBe("Mewtwo");
	});

	test("should handle empty string input", () => {
		expect(formatPokemonName("")).toBe("");
	});

	test("should handle undefined or null input gracefully (though function signature expects string)", () => {
		// @ts-expect-error
		expect(formatPokemonName(null)).toBe("");
		// @ts-expect-error
		expect(formatPokemonName(undefined)).toBe("");
	});

	test("should return the same name if it is already correctly formatted", () => {
		expect(formatPokemonName("Pikachu")).toBe("Pikachu");
	});
});
