import { getRedirects } from "../api/redirects";
import RedirectItem from "./RedirectItem";

function RedirectList({ redirects, setRedirects, setActiveRedirect, token }) {
	const onRefresh = async () => {
		try {
			setRedirects(await getRedirects({ token }));
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
						token={token}
					/>
				))}
			</ul>
		</>
	)
}

export default RedirectList;