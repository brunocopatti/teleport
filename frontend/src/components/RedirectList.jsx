import { getRedirects } from "../api/redirects";
import RedirectItem from "./RedirectItem";

function RedirectList({ redirects, setRedirects, setActiveRedirect, token, notificate }) {
	const onRefresh = async () => {
		try {
			setRedirects(await getRedirects({ token }));
		} catch (error) {
			notificate({
				message: "Error refreshing Redirect list",
				type: "error"
			});
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<h4 className="text-4xl">Redirects</h4>
			<button
				className="w-fit rounded-full py-2 px-8 bg-black text-white cursor-pointer"
				onClick={onRefresh}
			>
				Refresh
			</button>
			{redirects.length > 0 ? (
				<ul className="flex flex-col gap-1">
					{redirects.map((redirect) => (
						<RedirectItem
							key={redirect.id}
							redirect={redirect}
							setRedirects={setRedirects}
							setActiveRedirect={setActiveRedirect}
							token={token}
						/>
					))}
				</ul>
			) : (
				<p>Create a redirect so it can appear here.</p>
			)}
		</div>
	)
}

export default RedirectList;