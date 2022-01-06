import ndjson from "ndjson";
import fs from "fs";

interface AppendNDJSON_Props<Data> {
	data: Data;
	location: string;
	onError?: HandleError;
	onComplete?: HandleCompletion;
	onWrite?: HandleCompletion;
}

export async function appendNDJSON<Data>({
	data,
	location,
	onError = console.warn,
	onComplete = console.log,
	onWrite = console.count,
}: AppendNDJSON_Props<Data>) {
	const stream = ndjson.stringify();
	const promise: Promise<string> = new Promise((resolve, reject) => {
		stream.on("data", (line) => {
			fs.appendFile(location, line, function (err) {
				if (err) throw err;
				else onWrite("☑ Appended data to file!");
			});
		});

		stream.on("error", (error) => {
			onError(error);
			reject(error);
		});

		stream.write(data);

		//stream.end(onComplete);
		stream.on("end", () => {
			const message = `✅ Read data from -> ${location}`;
			onComplete(message);
			resolve(message);
		});
	});

	return promise;
}
