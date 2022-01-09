import { useSanityDataset } from "./lib/sanity/use-dataset";
import { useExportPath, useImportPath } from "./lib/util/use-path";
import { clearNDJSON } from "./lib/ndjson";
import { addToDataset } from "./lib/sanity";

const { importFile } = useImportPath();
const { exportFile } = useExportPath();

let my_transformed_data: SanityDocument[] = [];

// Clear the export directory
clearNDJSON({
	location: exportFile,
});

// Import NDJSON or whatever data you have
async function handleImport() {
	const data = await useSanityDataset({ importFile });

	console.log(data);
	// Do something with your data
	// my_transformed_data = data.all.map(document => {...})
}

// Export your transformed data back to NDJSON
async function handleExport() {
	const documents = await my_transformed_data;
	await addToDataset({
		documents,
		exportFile,
	});
	console.log(`${documents.length} documents added to ${exportFile}`);
}

handleImport();
handleExport();
