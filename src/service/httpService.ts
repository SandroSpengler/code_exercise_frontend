import IAuftrag from "../interface/auftrag";

export const getAllAufträge = async (): Promise<IAuftrag[]> => {
	if (process.env.HOST_URL === undefined) {
		console.error("error");
	}

	const request = fetch(`${process.env.HOST_URL}/api/auftrag`);

	const response = await request;

	const body = response.json();

	return body;
};

export const postAuftrag = async (auftrag: IAuftrag): Promise<void> => {
	if (process.env.HOST_URL === undefined) {
		console.error("error");
	}

	const requestInit: RequestInit = {
		headers: new Headers({ "content-type": "application/json" }),
		method: "POST",
		body: JSON.stringify(auftrag),
	};

	const request = fetch(`${process.env.HOST_URL}/api/auftrag`, requestInit);

	await request;
};
