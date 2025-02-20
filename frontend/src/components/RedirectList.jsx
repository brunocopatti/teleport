import { getRedirects } from "../api/redirects";
import RedirectItem from "./RedirectItem";

function RedirectList({ redirects, setRedirects, setActiveRedirect, credentials }) {
	const onRefresh = async () => {
		try {
			setRedirects(await getRedirects({ token: credentials.token }));
		} catch (error) {
			console.error(error);
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
						token={credentials.token}
					/>
				))}
			</ul>
		</>
	)
}

export default RedirectList;