import { useImportPath, useSanityDataset } from "../lib";
import { SourcePruned, sourcePruned, WordpressAuthorId } from "./source-pruned";

export interface Source extends SourcePruned {
	SANITY_AUTHOR: Reference;
	SANITY_CATEGORIES: Reference[];
}

const { importFile } = useImportPath();

interface SanityDocumentWithSlug extends SanityDocument {
	slug: { current: string };
}
const data = useSanityDataset<SanityDocumentWithSlug>({
	importFile,
	groupByType: true,
}).then((x) => x.topic);

export interface Reference {
	_ref: string;
	_type: "reference";
}

const ref = (_ref: string): Reference => ({ _ref, _type: "reference" });

// Map source to sanity references

function handleAuthor(id: WordpressAuthorId) {
	switch (id) {
		case "7":
			// Yessica
			return ref("1742bab8-ec69-43d1-a3a6-9275affb27c6");
		case "6":
			// Laura
			return ref("a5e3aec7-46c4-4b36-9353-f7475c06e640");
		case "5":
			// Kieran
			return ref("4bd9a5fd-c725-43ab-a588-ec8b54a8bbda");
		case "4":
			// Maddie
			return ref("3441f496-cfdc-4671-9dd3-d16182f1872a");
		case "1":
		default:
			// Megain
			return ref("ac085d21-6123-48f7-8410-1e1c509a8c90");
	}
}

async function handleCategory(slug: string) {
	const REF = await data.then(
		(topic) => topic.filter((doc) => doc?.slug?.current === slug)[0],
	);
	if (!REF) {
		throw new Error(`Topic not found for ${slug}!`);
	} else {
		console.log(`Found ${REF.slug}`);
	}
	return ref(REF._id);
}
async function handleCategories(slugs: string[]) {
	return Promise.all(
		slugs.map((slug) => {
			return handleCategory(slug);
		}),
	);
}

export const source = Promise.all(
	sourcePruned.map(async (article): Promise<Source> => {
		const { categories, authorID } = article;

		return {
			...article,
			SANITY_AUTHOR: handleAuthor(authorID),
			SANITY_CATEGORIES: await handleCategories(categories),
		};
	}),
);
