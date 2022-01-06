// import { useSanityDataset } from "./lib/sanity/use-dataset";
import { useExportPath } from "./lib/util/use-path";
import { clearNDJSON } from "./lib/ndjson";
import { addToDataset } from "./lib/sanity";

// const { importFile } = useImportPath();
const { exportFile } = useExportPath();

clearNDJSON({
	location: exportFile,
});

/* async function handleImport() {
	await useSanityDataset({
		groupByType: true,
		importFile,
	});
} */
async function handleExport() {
	console.log("Running");
	await addToDataset({
		documents: [{ test: "1" }, { test: "2" }, { test: "3" }, { test: "4" }],
		exportFile,
	});
}

handleExport();
