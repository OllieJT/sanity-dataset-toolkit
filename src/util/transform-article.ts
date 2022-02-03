import { titleCase } from "../lib";
import { generateID } from "../lib/sanity/generate-id";
import { Reference, Source } from "../source/source-mapped";

interface Article {
	migrated: boolean;
	permalink: string;
	_id: string | undefined;
	_createdAt: string;
	_type: string;
	_updatedAt: string;
	author: Reference;
	// content: any[];
	// html: string | undefined;
	description: string;

	header: {
		_type: "header";
		subtitle?: string;
		title: string;
	};
	publishAt: string;
	slug: {
		_type: string;
		current: string;
	};
	thumbnail: {
		_type: string;
		alt?: string;
	};
	title: string;
	topics: Reference[];
	type: "blog" | "case-study";
	noIndex: boolean;
	noFollow: boolean;
}

export function transformArticle(source: Source): Article {
	const metaTitle = titleCase(source.metaTitle || source.title);
	const title = titleCase(source.title);
	const caseStudyTags = source.SANITY_CATEGORIES.filter(
		(x) => x._ref === "80f46628-32db-434f-a8e8-01bd29e198af",
	);
	const isCaseStudy = caseStudyTags.length;
	if (isCaseStudy)
		console.log(
			"CASE STUDY -> CASE STUDY -> CASE STUDY -> CASE STUDY -> CASE STUDY",
		);
	return {
		migrated: false,
		permalink: source.permaLink,
		_id: generateID({
			batchName: "wordpress",
			isDraft: !source.published,
		}),
		_createdAt: new Date(source.dateModified).toISOString(),
		_type: "article",
		_updatedAt: new Date(source.dateModified).toISOString(),
		publishAt: new Date(source.datePublished).toISOString(),

		title: metaTitle,
		author: source.SANITY_AUTHOR,
		//html: source.content,
		// content: handleContent(`${source.image?.url} \n\n ${source.permaLink}`),
		description: "Meta Description",
		header: { _type: "header", title },
		slug: {
			_type: "slug",
			current: source.slug,
		},
		thumbnail: {
			_type: "thumbnail",
			alt: source.image?.alt,
		},
		topics: source.SANITY_CATEGORIES,
		type: "blog",
		noIndex: false,
		noFollow: false,
	};
}
