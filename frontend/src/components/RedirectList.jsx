import Redirect from "./Redirect";

function RedirectList({ redirects, setRedirects, credentials }) {
	return (
		<>
			<h3>Redirects</h3>
			<ul>
				{redirects.map((redirect) => (
					<Redirect
						key={redirect.id}
						redirect={redirect}
						setRedirects={setRedirects}
						token={credentials.token}
					/>
				))}
			</ul>
		</>
	)
}

export default RedirectList;