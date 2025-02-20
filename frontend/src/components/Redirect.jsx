import { useState } from "react";
import { deleteRedirect } from "../api/redirects";
import RedirectUpdateForm from "./RedirectUpdateForm";

const getBaseUrl = () => {
	if (import.meta.env.VITE_API_URL) {
		return `${import.meta.env.VITE_API_URL}/`
	}
	return window.location.href;
}

function Redirect({ redirect, reports, setRedirects, setActiveRedirect, token }) {
	const shortUrl = `${getBaseUrl()}${redirect.short_path}`;

	const [isEditing, setIsEditing] = useState(false);

	const onDelete = async () => {
		try {
			await deleteRedirect({ id: redirect.id }, { token });
			setRedirects((redirects) => redirects.filter((r) => (
				r.id !== redirect.id
			)));
			setActiveRedirect(null);
		} catch (error) {
			console.error(error);
		}
	}

	const copyShortUrl = () => {
		navigator.clipboard.writeText(shortUrl);
		alert(`copied ${shortUrl} to clipboard`);
	}
	
	return (
		<>
			<h2>{redirect.short_path}</h2>
			<p>Access count: {redirect.clicks}</p>
			<div>
				<p>
					Short URL: <a href={shortUrl}>{shortUrl}</a>
				</p>
				<button onClick={copyShortUrl}>Copy</button>
			</div>
			<p>Destination url: <a href={redirect.destination_url}>{redirect.destination_url}</a></p>
			<button onClick={onDelete}>Delete</button>
			<button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Stop editing' : 'Edit'}
			</button>
			{isEditing && (
				<>
					<h3>Edit {redirect.short_path}</h3>
					<RedirectUpdateForm
						redirect={redirect}
						setRedirects={setRedirects}
						setActiveRedirect={setActiveRedirect}
						token={token}
					/>
				</>
			)}
			<h3>Geographical location from accesses</h3>
			<p>Map placeholder</p>
			<h3>Accesses over time</h3>
			<p>Graph placeholder</p>
		</>
	)
}

export default Redirect;