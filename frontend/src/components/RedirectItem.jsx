import { deleteRedirect, getRedirectById } from "../api/redirects";

function RedirectItem({ redirect, setRedirects, setActiveRedirect, token }) {
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

	const onShow = async () => {
		try {
			const activeRedirect = await getRedirectById({ id: redirect.id }, { token });
			setActiveRedirect(activeRedirect);
		} catch (error) {
			console.error(error);
		}
	}
	
	return (
		<li>
			<button onClick={onShow}>
				{redirect.short_path}
			</button> - <b>{redirect.clicks}</b> clicks
			<button onClick={onDelete}>Delete</button>
		</li>
	)
}

export default RedirectItem;