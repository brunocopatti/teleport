import { useState } from "react"
import CreateUserForm from "./components/CreateUserForm"
import LoginForm from "./components/LoginForm"

function App() {
	const [token, setToken] = useState(null);
	if (token) {
		return <p>Authenticated with token {token}</p>
	}
	return (
		<>
			<CreateUserForm/>
			<LoginForm setToken={setToken} />
		</>
	)
}

export default App
