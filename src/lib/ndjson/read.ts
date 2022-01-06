import ndjson from "ndjson";
import fs from "fs";

interface ReadNDJSON_Props<Data> {
	location: string;
	onError?: HandleError;
	onComplete?: HandleCompletion;
	onData: HandleData<Data>;
}

export async function readNDJSON<Data extends Object>({
	location,
	onError = console.warn,
	onComplete = console.log,
	onData,
}: ReadNDJSON_Props<Data>) {
	const promise: Promise<string> = new Promise((resolve, reject) => {
		const stream = fs.createReadStream(location).pipe(ndjson.parse());

		stream.on("data", (obj: Data) => {
			onData(obj);
		});

		stream.on("error", (error) => {
			onError(error);
			reject(error);
		});

		stream.on("end", () => {
			const message = `✅ Read data from -> ${location}`;
			onComplete(message);
			resolve(message);
		});
	});

	return promise;
}
