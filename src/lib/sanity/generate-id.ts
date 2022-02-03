import { v4 as uuid } from "uuid";

interface Props {
	batchName: string;
	isDraft: boolean;
}

export function generateID({ batchName, isDraft }: Props) {
	const parts = ["import", batchName, uuid()].join("-");

	if (isDraft) {
		return `drafts.${parts}`;
	}

	return parts;
}
