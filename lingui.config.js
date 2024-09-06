/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
	locales: ["en", "de", "pseudo"],
	pseudoLocale: "pseudo",
	sourceLocale: "en",
	fallbackLocales: {
		default: "en",
	},
	catalogs: [
		{
			path: "locales/{locale}",
			include: ["app", "features", "components"],
		},
	],
};
