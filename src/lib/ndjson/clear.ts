import fs from "fs";

interface ClearNDJSON_Props {
	location: string;
	onError?: HandleError;
	onComplete?: HandleCompletion;
}

export async function clearNDJSON({
	location,
	onError = console.warn,
	onComplete = console.log,
}: ClearNDJSON_Props) {
	const promise: Promise<string> = new Promise((resolve, reject) => {
		fs.writeFile(location, "", (error) => {
			if (error) {
				onError(error);
				reject(error);
				return;
			}
			const message = `✅ Cleared all data from -> ${location}`;
			onComplete(message);
			resolve(message);
			return;
		});
	});

	return promise;
}
