import axios from "axios";
import axiosClient, { candidateId, delay } from "./utils/axios.utils";

type RequestBody = {
	candidateId: string,
	row: number,
	column: number,
	color?: string,
	direction?: string
}

const urlMap = `https://challenge.crossmint.io/api/map/${candidateId}/goal`
const response = await axiosClient.get(urlMap)
console.log(response.data)

const goal = response.data.goal as Array<Array<string>>


for (let rowIndex = 0; rowIndex < goal.length; rowIndex++) {

	for (let colIndex = 0; colIndex < goal[rowIndex].length; colIndex++) {
		let cell = goal[rowIndex][colIndex]
		let endpoint = ""
		let body: RequestBody = {
			candidateId,
			row: rowIndex,
			column: colIndex
		}

		if (cell == "SPACE") continue

		if (cell == "POLYANET") {
			endpoint = cell.toLowerCase()
		}

		if (cell.includes("_")) {
			const [argument, astralObject] = cell.split("_")
			endpoint = astralObject.toLowerCase()

			switch (astralObject) {
				case "SOLOON":
					body.color = argument.toLowerCase()
					break;

				case "COMETH":
					body.direction = argument.toLowerCase()
					break;

			}
		}

		if (!endpoint)
			throw new Error("Missing Endpoint")

		await makePost(body, endpoint)
	}
}

async function makePost(body, endpoint: string) {
	try {
		await delay(8000)

		const respose = await axiosClient.post(`https://challenge.crossmint.io/api/${endpoint}s`, JSON.stringify(body))
		console.log(`${endpoint} -> row: ${body.row}`, `column: ${body.column}`, respose.statusText)

	} catch (error) {
		if (!axios.isAxiosError(error)) {
			console.log('unexpected error: ', error)
		}
	}
}

// Parkour to the moon!