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
		<>
			<h3>Redirects</h3>
			<button onClick={onRefresh}>Refresh</button>
			<ul>
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
		</>
	)
}

export default RedirectList;