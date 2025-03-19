import { deleteRedirect, getRedirectById } from "../api/redirects";

function RedirectItem({ redirect, setRedirects, setActiveRedirect, token, isLoading, setIsLoading }) {
	const onDelete = async (event) => {
		// Ensure it won't run onClick
		event.stopPropagation();

		try {
			setIsLoading(true);
			await deleteRedirect({ id: redirect.id }, { token });
			setRedirects((redirects) => (
				redirects.filter((r) => r.id !== redirect.id)
			));
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}

	const onShow = async () => {
		if (isLoading) {
			return;
		}

		try {
			setIsLoading(true);
			const activeRedirect = await getRedirectById({ id: redirect.id }, { token });
			setActiveRedirect(activeRedirect);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	}
	
	return (
		<li
			className={`border rounded-md py-3 px-5 flex justify-between items-center ${isLoading && "opacity-50"}`}
			onClick={onShow}
		>
			<div className="flex flex-wrap gap-3">
				<button className={`underline ${!isLoading && "cursor-pointer"}`}>
					{redirect.short_path}
				</button>
				<span>{redirect.clicks} clicks</span>
			</div>
			<button
				className="border border-red-500 text-red-500 py-1 px-2 rounded-xl lowercase cursor-pointer disabled:cursor-auto"
				onClick={onDelete}
				disabled={isLoading}
			>
				Delete
			</button>
		</li>
	)
}

export default RedirectItem;