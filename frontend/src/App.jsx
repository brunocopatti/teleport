import { useEffect, useState } from "react";
import CreateUserForm from "./components/CreateUserForm";
import LoginForm from "./components/LoginForm";
import CreateRedirectForm from "./components/CreateRedirectForm";
import RedirectList from "./components/RedirectList";
import { getRedirects } from "./api/redirects";

function App() {
	const [credentials, setCredentials] = useState(null);
	const [redirects, setRedirects] = useState([]);

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
				<CreateRedirectForm setRedirects={setRedirects} credentials={credentials} />
				<RedirectList
					redirects={redirects}
					setRedirects={setRedirects}
					credentials={credentials}
				/>
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
