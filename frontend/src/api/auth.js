import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL || ''}/api/auth`;

export const authenticate = async ({ username, password }) => {
	const response = await axios.post(baseUrl, {
		username,
		password
	});
	return response.data;
};