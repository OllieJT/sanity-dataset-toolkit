import path from "path";
import fs from "fs";

const ROOT = path.resolve(__dirname, "..", "..", "..");

export function useImportPath(fileName: string | undefined = "data") {
	const importDir = path.join(ROOT, "dataset");
	const importFile = path.join(importDir, `${fileName}.ndjson`);

	fs.exists(importDir, (exists) => {
		if (!exists) fs.mkdirSync(importDir, { recursive: true });
	});

	fs.exists(importFile, (exists) => {
		if (!exists)
			fs.writeFile(importFile, "", (err) => {
				if (err === null) return;
				throw err;
			});
	});

	return {
		importDir,
		importFile,
	};
}
export function useExportPath(fileName: string | undefined = "data") {
	const exportDir = path.join(ROOT, "new-dataset");
	const exportFile = path.join(exportDir, `output-${fileName}.ndjson`);

	fs.exists(exportDir, (exists) => {
		if (!exists) fs.mkdirSync(exportDir, { recursive: true });
	});

	return {
		exportDir,
		exportFile,
	};
}
