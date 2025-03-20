import { useState } from "react";
import Notification from "./components/Notification";
import useNotification from "./hooks/useNotification";
import Main from "./components/Main";
import { Github, Linkedin, Moon, Sun } from "lucide-react";

const socials = [
	{
		"name": "LinkedIn",
		"url": "https://linkedin.com/in/brunocopatti",
		"icon": <Linkedin />
	},
	{
		"name": "GitHub",
		"url": "https://github.com/brunocopatti",
		"icon": <Github />
	},
	{
		"name": "Portfolio",
		"url": "https://brunocopatti.github.io"
	}
]

function App() {
	const [credentials, setCredentials] = useState(null);
	const [theme, setTheme] = useState(
		document.documentElement.classList.contains("dark") ? "dark" : "light"
	);
	const { notification, notificate } = useNotification();

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
		if (document.documentElement.classList.contains("dark")) {
			localStorage.theme = "dark";
			setTheme("dark");
		} else {
			localStorage.theme = "light";
			setTheme("light");
		}
	}

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
					<button onClick={toggleTheme}>
						{theme === "dark" ? <Sun /> : <Moon />}
					</button>
				</div>
			</nav>
			<Notification notification={notification} />
			{!credentials && (
				<header className="flex flex-col lg:flex-row gap-6 justify-between items-center mx-auto max-w-6xl w-full px-3 py-48">
					<div>
						<h2 className="text-2xl text-center lg:text-3xl lg:text-start">Shorten your URL for FREE!</h2>
						<p className="text-xl text-center lg:text-2xl lg:text-start">And get reports about it.</p>
					</div>
					<a className="bg-black text-white px-7 py-3 rounded-full" href="#register">Start now</a>
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
							{social.icon ? (
								<>
									<span className="sr-only">{social.name}</span>
									{social.icon}
								</>
							) : (
								<>{social.name}</>
							)}
						</a>
					))}
				</div>
			</footer>
		</div>
	)
}

export default App
