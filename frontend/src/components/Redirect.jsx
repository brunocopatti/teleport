import { useState } from "react";
import { deleteRedirect } from "../api/redirects";
import UpdateRedirectForm from "./UpdateRedirectForm";

function Redirect({ redirect, reports, setRedirects, setActiveRedirect, token }) {
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
	
	return (
		<>
			<h2>{redirect.short_path}</h2>
			<p>Access count: {redirect.clicks}</p>
			<p>Destination url: <a href={redirect.destination_url}>{redirect.destination_url}</a></p>
			<button onClick={onDelete}>Delete</button>
			<button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Stop editing' : 'Edit'}
			</button>
			{isEditing && (
				<>
					<h3>Edit {redirect.short_path}</h3>
					<UpdateRedirectForm
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