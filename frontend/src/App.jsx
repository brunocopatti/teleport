import { useState } from "react"
import CreateUserForm from "./components/CreateUserForm"
import LoginForm from "./components/LoginForm"

function App() {
	const [credentials, setCredentials] = useState(null);
	if (credentials) {
		return <p>Authenticated as {credentials.user.username}</p>
	}
	return (
		<>
			<CreateUserForm/>
			<LoginForm setCredentials={setCredentials} />
		</>
	)
}

export default App
