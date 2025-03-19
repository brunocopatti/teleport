import axios from "axios";

const baseUrl = `${import.meta.env.VITE_API_URL || ''}/api/redirects`;

export const createRedirect = async ({ shortPath, destinationUrl }, { token }) => {
	const response = await axios.post(baseUrl, {
		shortPath,
		destinationUrl
	}, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response.data;
};

export const getRedirects = async ({ token }) => {
	const response = await axios.get(baseUrl, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response.data;
};

export const getRedirectById = async ({ id }, { token }) => {
	const response = await axios.get(`${baseUrl}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return response.data;
}

export const deleteRedirect = async({ id }, { token }) => {
	await axios.delete(`${baseUrl}/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
};

export const updateRedirect = async(
	{ id }, { shortPath, destinationUrl }, { token }
) => {
	const response = await axios.put(
		`${baseUrl}/${id}`,
		{
			shortPath,
			destinationUrl
		},
		{
			headers: {
				Authorization: `Bearer ${token}`
			}
		}
	);
	return response.data;
};