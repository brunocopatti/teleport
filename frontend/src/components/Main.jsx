import { useState } from "react";
import UserCreateForm from "./UserCreateForm";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

function Main({ notificate, credentials, setCredentials }) {
	const [activeRedirect, setActiveRedirect] = useState(null);

	if (credentials) {
		return (
			<Dashboard
				credentials={credentials}
				notificate={notificate}
				activeRedirect={activeRedirect}
				setActiveRedirect={setActiveRedirect}
			/>
		)
	}

	return (
		<main className="mx-auto max-w-6xl w-full px-3 flex flex-col items-center justify-between gap-3 lg:flex-row">
			<UserCreateForm notificate={notificate} />
			<LoginForm
				setCredentials={setCredentials}
				notificate={notificate}
				setActiveRedirect={setActiveRedirect}
			/>
		</main>
	)
}

export default Main;