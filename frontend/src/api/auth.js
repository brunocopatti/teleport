import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const authenticate = async ({ username, password }) => {
	const response = await axios.post(`${baseUrl}/api/auth`, {
		username,
		password
	});
	return response.data;
};