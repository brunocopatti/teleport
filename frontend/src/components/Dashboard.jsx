import { useEffect, useState } from "react";
import RedirectCreateForm from "./RedirectCreateForm";
import RedirectList from "./RedirectList";
import Redirect from "./Redirect";
import { getRedirects } from "../api/redirects";

function Dashboard({ credentials, notificate, activeRedirect, setActiveRedirect }) {
	const [redirects, setRedirects] = useState([]);

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

	if (activeRedirect) {
		return (
			<Redirect
				redirect={activeRedirect.redirect}
				reports={activeRedirect.reports}
				setRedirects={setRedirects}
				setActiveRedirect={setActiveRedirect}
				token={credentials.token}
				notificate={notificate}
			/>
		);
	}

	return (
		<div className="mx-auto max-w-6xl w-full px-3">
			<div className="flex justify-center mb-3">
				<RedirectCreateForm
					setRedirects={setRedirects}
					token={credentials.token}
					notificate={notificate}
				/>
			</div>
			<RedirectList
				redirects={redirects}
				setRedirects={setRedirects}
				setActiveRedirect={setActiveRedirect}
				token={credentials.token}
				notificate={notificate}
			/>
		</div>
	);
}

export default Dashboard;