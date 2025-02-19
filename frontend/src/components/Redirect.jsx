import { deleteRedirect } from "../api/redirects";

function Redirect({ redirect, setRedirects, token }) {
	const onDelete = async () => {
		try {
			await deleteRedirect({ id: redirect.id }, { token });
			setRedirects((redirects) => (
				redirects.filter((r) => r.id !== redirect.id)
			));
		} catch (error) {
			console.error(error);
		}
	}
	
	return (
		<li>
			{redirect.short_path} - <b>{redirect.clicks}</b> clicks
			<button onClick={onDelete}>Delete</button>
		</li>
	)
}

export default Redirect;