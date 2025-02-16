import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const createUser = async ({ username, password }) => {
	const response = await axios.post(`${baseUrl}/api/users`, {
		username,
		password
	});
	return response.data;
};