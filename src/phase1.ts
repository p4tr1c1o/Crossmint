import axios from "axios"
import axiosClient, { candidateId, delay } from "./utils/axios.utils"

type RequestBody = {
	candidateId: string,
	row: number,
	column: number
}

const startPosition = 5


// center polyanet
await makePost(startPosition, startPosition)

for (let index = 1; index < 4; index++) {

	let row = startPosition - index
	postParallelPolyanets(row, index)

	row = startPosition + index
	postParallelPolyanets(row, index)

}

async function postParallelPolyanets(row: number, index: number) {
	await makePost(row, startPosition - index)
	await makePost(row, startPosition + index)
}

async function makePost(row: number, column: number) {
	const url = "https://challenge.crossmint.io/api/polyanets"

	try {
		const body: RequestBody = {
			candidateId,
			row,
			column
		}

		await delay(6000)
		// const respose = await axiosClient.post(url, body)
		const respose = await axiosClient.delete(url, { data: body })
		console.log(`row: ${row}`, `column: ${column}`, respose.statusText)

	} catch (error) {
		if (!axios.isAxiosError(error)) {
			console.log('unexpected error: ', error)
		}
	}
}

