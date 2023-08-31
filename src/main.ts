import axios from "axios"


type RequestBody = {
	candidateId: string,
	row: number,
	column: number
}

const url = "https://challenge.crossmint.io/api/polyanets"

const headers = {
	'Content-Type': 'application/json',
	Accept: 'application/json',
}

const body: RequestBody = {
	candidateId: "1f4f1bde-3290-4041-a96c-cb1597dec08f",
	row: 3,
	column: 3
}

try {

	const respose = await axios.post(url, body, { headers })

	console.log(respose.status);


} catch (error) {
	if (axios.isAxiosError(error)) {
		console.log('error message: ', error.message);
		// return error.message;
	} else {
		console.log('unexpected error: ', error);
		// return 'An unexpected error occurred';
	}
}