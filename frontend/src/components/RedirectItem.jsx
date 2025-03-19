import { deleteRedirect, getRedirectById } from "../api/redirects";

function RedirectItem({ redirect, setRedirects, setActiveRedirect, token }) {
	const onDelete = async (event) => {
		// Ensure it won't run onClick
		event.stopPropagation();

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
		<li
			className="border rounded-md py-3 px-5 flex justify-between items-center"
			onClick={onShow}
		>
			<div className="flex flex-wrap gap-3">
				<button className="underline cursor-pointer">
					{redirect.short_path}
				</button>
				<span>{redirect.clicks} clicks</span>
			</div>
			<button
				className="border border-red-500 text-red-500 py-1 px-2 rounded-xl lowercase cursor-pointer"
				onClick={onDelete}
			>
				Delete
			</button>
		</li>
	)
}

export default RedirectItem;