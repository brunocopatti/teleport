import { useEffect, useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import CreateRedirectForm from "./components/CreateRedirectForm";
import RedirectList from "./components/RedirectList";
import Redirect from "./components/Redirect";
import { getRedirects } from "./api/redirects";

function App() {
	const [credentials, setCredentials] = useState(null);
	const [redirects, setRedirects] = useState([]);
	const [detailedRedirect, setDetailedRedirect] = useState(null);

	const onLogout = () => {
		setCredentials(null);
	}

	useEffect(() => {
		(async () => {
			if (credentials) {
				try {
					setRedirects(await getRedirects({ token: credentials.token }));
				} catch (error) {
					console.error(error);
				}
			}
		})();
	}, [credentials]);

	if (credentials) {
		return (
			<>
				<p>Authenticated as {credentials.user.username}</p>
				<button onClick={onLogout}>Logout</button>
				{!detailedRedirect ? (
					<>
						<CreateRedirectForm
							setRedirects={setRedirects}
							credentials={credentials}
						/>
						<RedirectList
							redirects={redirects}
							setRedirects={setRedirects}
							setDetailedRedirect={setDetailedRedirect}
							credentials={credentials}
						/>
					</>
				) : (
					<>
						<button 
							onClick={() => {
								setDetailedRedirect(null);
							}}
						>
							Return to redirects
						</button>
						<Redirect
							redirect={detailedRedirect.redirect}
							reports={detailedRedirect.reports}
						/>
					</>
				)}
			</>
		)
	}
	return (
		<>
			<CreateUserForm/>
			<LoginForm setCredentials={setCredentials} />
		</>
	)
}

export default App
