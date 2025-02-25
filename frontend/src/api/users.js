import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL}/api/users`;

export const createUser = async ({ username, password }) => {
	const response = await axios.post(baseUrl, {
		username,
		password
	});
	return response.data;
};