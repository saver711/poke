module.exports = {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"references-empty": [0],
		"scope-enum": [2, "always", ["POKE"]],
		"scope-case": [0],
		"subject-empty": [2, "never"],
		"type-enum": [
			2,
			"always",
			["feat", "fix", "chore", "refactor", "style", "test", "docs", "ci"],
		],
	},
	parserPreset: {
		parserOpts: {
			// Parse "feat(POKE-123): message" correctly
			headerPattern: /^(\w*)\((POKE-\d+)\): (.*)$/,
			headerCorrespondence: ["type", "ticket", "subject"],
		},
	},
};
