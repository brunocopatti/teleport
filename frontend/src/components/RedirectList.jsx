import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { getRedirects } from "../api/redirects";
import RedirectItem from "./RedirectItem";

function RedirectList({ redirects, setRedirects, setActiveRedirect, token, notificate }) {
	const [isLoading, setIsLoading] = useState(false);

	const onRefresh = async () => {
		try {
			setIsLoading(true);
			setRedirects(await getRedirects({ token }));
		} catch (error) {
			notificate({
				message: "Error refreshing Redirect list",
				type: "error"
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col gap-3">
			<h4 className="text-4xl">Redirects</h4>
			<button
				className="w-fit rounded-full py-2 px-8 bg-black dark:bg-gray-600 text-white cursor-pointer disabled:opacity-50 disabled:cursor-auto"
				onClick={onRefresh}
				disabled={isLoading}
			>
				<RefreshCw />
				<span className="sr-only">Refresh</span>
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
							isLoading={isLoading}
							setIsLoading={setIsLoading}
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