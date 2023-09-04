import axios from 'axios'

// Create a new instance.
const axiosClient = axios.create({
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	}
})

axiosClient.interceptors.response.use((response) => {
	return response;
}, (error) => {
	if (error.response.status === 429) {
		// If the error has status code 429, retry the request
		return axios.request(error.config)
	} else {
		console.log(error.reponse?.body, 'error status: ', error.status, 'error message: ', error.message);


	}
	return Promise.reject(error)
});

export default axiosClient

export function delay(millisecons: number) {
	return new Promise(resolve => setTimeout(resolve, millisecons));
}

export const candidateId = "1f4f1bde-3290-4041-a96c-cb1597dec08f"