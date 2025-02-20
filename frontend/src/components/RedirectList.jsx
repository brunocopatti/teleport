import RedirectItem from "./RedirectItem";

function RedirectList({ redirects, setRedirects, setDetailedRedirect, credentials }) {
	return (
		<>
			<h3>Redirects</h3>
			<ul>
				{redirects.map((redirect) => (
					<RedirectItem
						key={redirect.id}
						redirect={redirect}
						setRedirects={setRedirects}
						setDetailedRedirect={setDetailedRedirect}
						token={credentials.token}
					/>
				))}
			</ul>
		</>
	)
}

export default RedirectList;