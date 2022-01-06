import groupBy from "just-group-by";
import { readNDJSON } from "../ndjson";

interface Props {
	groupByType?: boolean;
	importFile: string;
}

type Grouped<Doc extends SanityDocument, Groups extends string> = Record<Groups, Doc[]>;

export async function useSanityDataset<
	ExpectedDocuments extends SanityDocument,
	ExpectedGroups extends string,
>({ importFile, groupByType = false }: Props) {
	let store: ExpectedDocuments[] = [];

	await readNDJSON<ExpectedDocuments>({
		location: importFile,
		onData: (data) => {
			store.push(data);
		},
	});

	console.log(`${store.length} documents found`);

	if (groupByType) {
		const grouped = groupBy(store, (doc) => doc._type) as Grouped<
			ExpectedDocuments,
			ExpectedGroups
		>;
		console.log(`🙋‍♀️ Grouped by: ${Object.keys(grouped)}`);
		return grouped;
	} else {
		return {
			all: store,
		};
	}
}
