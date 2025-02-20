import { useEffect, useState } from "react";
import UserCreateForm from "./components/UserCreateForm";
import LoginForm from "./components/LoginForm";
import RedirectCreateForm from "./components/RedirectCreateForm";
import RedirectList from "./components/RedirectList";
import Redirect from "./components/Redirect";
import { getRedirects } from "./api/redirects";

function App() {
	const [credentials, setCredentials] = useState(null);
	const [redirects, setRedirects] = useState([]);
	const [activeRedirect, setActiveRedirect] = useState(null);

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
				{activeRedirect ? (
					<>
						<button 
							onClick={() => {
								setActiveRedirect(null);
							}}
						>
							Return to redirects
						</button>
						<Redirect
							redirect={activeRedirect.redirect}
							reports={activeRedirect.reports}
							setRedirects={setRedirects}
							setActiveRedirect={setActiveRedirect}
							token={credentials.token}
						/>
					</>
				) : (
					<>
						<RedirectCreateForm
							setRedirects={setRedirects}
							credentials={credentials}
						/>
						<RedirectList
							redirects={redirects}
							setRedirects={setRedirects}
							setActiveRedirect={setActiveRedirect}
							credentials={credentials}
						/>
					</>
				)}
			</>
		)
	}
	return (
		<>
			<UserCreateForm/>
			<LoginForm setCredentials={setCredentials} />
		</>
	)
}

export default App
