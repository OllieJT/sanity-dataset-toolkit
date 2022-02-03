import { appendNDJSON } from "../ndjson";
// const exportPath = path.resolve(__dirname, "..", "..", "output.ndjson");

interface Props<Document extends Object> {
	documents: Document[];
	exportFile: string;
}

export async function addToDataset<Document extends Object>({
	documents,
	exportFile,
}: Props<Document>) {
	const handleEntry = async (data: Document) => {
		console.count("appendNDJSON...");
		await appendNDJSON({
			data,
			location: exportFile,
		});
	};

	return documents.forEach(handleEntry);
}
