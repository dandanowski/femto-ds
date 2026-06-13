export default function (eleventyConfig) {
    // Configure Eleventy
    // Directories
    eleventyConfig.setInputDirectory("_src");
    eleventyConfig.setIncludesDirectory("_includes");
    eleventyConfig.setLayoutsDirectory("_layouts");
    eleventyConfig.addPassthroughCopy("_src/assets");
    eleventyConfig.addPassthroughCopy("_src/js");
    eleventyConfig.addPassthroughCopy("_src/css");
    eleventyConfig.addWatchTarget("_src/css");
    // Template
    eleventyConfig.setLiquidOptions({
        jsTruthy: true,
    });
    eleventyConfig.configureErrorReporting({ allowMissingExtensions: true });
    eleventyConfig.setFrontMatterParsingOptions({
        excerpt: true,
        excerpt_separator: "<!-- excerpt -->",
    });
    eleventyConfig.addFilter("titleCase", function (value) {
        return value.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    });
};
