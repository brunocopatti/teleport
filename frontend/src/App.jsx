import { useState } from "react";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";
import Main from "./components/Main";
import socials from "./assets/socials.json";

function App() {
	const [credentials, setCredentials] = useState(null);
	const { notification, notificate } = useNotification();

	const onLogout = () => {
		setCredentials(null);
	}

	return (
		<div className="min-h-screen flex flex-col">
			<nav className="flex justify-between items-center mx-auto max-w-6xl w-full px-3 py-5">
				<h1 className="text-2xl">teleport</h1>
				<div className="flex items-center gap-3">
					{credentials && (
						<button
							className="lowercase px-3 py-0.5 border rounded-xl border-red-500 text-red-500 cursor-pointer"
							onClick={onLogout}
						>
							Logout
						</button>
					)}
				</div>
			</nav>
			<Notification notification={notification} />
			{!credentials && (
				<header className="flex flex-col lg:flex-row gap-6 justify-between items-center mx-auto max-w-6xl w-full px-3 py-48">
					<div>
						<h2 className="text-2xl text-center lg:text-3xl lg:text-start">Shorten your URL for FREE!</h2>
						<p className="text-xl text-center lg:text-2xl lg:text-start">And get reports about it.</p>
					</div>
					<a className="bg-black text-white px-7 py-3 rounded-full" href="#">Start now</a>
				</header>
			)}
			<div className="flex-1">
				<Main
					notificate={notificate}
					credentials={credentials}
					setCredentials={setCredentials}
				/>
			</div>
			<footer className="flex flex-col lg:flex-row gap-2 justify-between items-center mx-auto max-w-6xl w-full px-3 py-5">
				<p>Created by <a className="underline" href="https://github.com/brunocopatti" target="_blank">Bruno Copatti</a></p>
				<div className="flex items-center gap-2">
					{socials.map((social) => (
						<a
							className="lowercase px-3 py-0.5 border rounded-xl"
							key={social.name}
							href={social.url}
							target="_blank"
						>
							{social.name}
						</a>
					))}
				</div>
			</footer>
		</div>
	)
}

export default App
