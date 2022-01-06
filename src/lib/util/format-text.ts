export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
export const titleCase = (str: string) => str.split(" ").map(capitalize).join(" ");

/* eslint-disable  */
export function slugify(text: string): string {
	if (!text) throw new Error(`Invalid value passed to slugify function: ${text}`);
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w\-]+/g, "") // Remove all non-word chars
		.replace(/\-\-+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
}
