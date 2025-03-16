import { useEffect, useState } from "react";
import UserCreateForm from "./components/UserCreateForm";
import LoginForm from "./components/LoginForm";
import RedirectCreateForm from "./components/RedirectCreateForm";
import RedirectList from "./components/RedirectList";
import Redirect from "./components/Redirect";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";
import { getRedirects } from "./api/redirects";

function App() {
	const [credentials, setCredentials] = useState(null);
	const [redirects, setRedirects] = useState([]);
	const [activeRedirect, setActiveRedirect] = useState(null);
	const { notification, notificate } = useNotification();

	const onLogout = () => {
		setCredentials(null);
		setActiveRedirect(null);
	}

	useEffect(() => {
		(async () => {
			if (credentials) {
				try {
					setRedirects(await getRedirects({ token: credentials.token }));
				} catch (error) {
					notificate({
						message: "Error retrieving redirects",
						type: "error"
					});
				}
			}
		})();
	}, [credentials]);

	if (credentials) {
		return (
			<>
				<Notification notification={notification} />
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
							notificate={notificate}
						/>
					</>
				) : (
					<>
						<RedirectCreateForm
							setRedirects={setRedirects}
							token={credentials.token}
							notificate={notificate}
						/>
						<RedirectList
							redirects={redirects}
							setRedirects={setRedirects}
							setActiveRedirect={setActiveRedirect}
							token={credentials.token}
							notificate={notificate}
						/>
					</>
				)}
			</>
		)
	}
	return (
		<>
			<Notification notification={notification} />
			<UserCreateForm notificate={notificate} />
			<LoginForm setCredentials={setCredentials} notificate={notificate} />
		</>
	)
}

export default App
