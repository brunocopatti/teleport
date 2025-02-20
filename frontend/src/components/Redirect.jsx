function Redirect({ redirect, reports }) {
	return (
		<>
			<h2>{redirect.short_path}</h2>
			<p>Access count: {redirect.clicks}</p>
			<p>Destination url: <a href={redirect.destination_url}>{redirect.destination_url}</a></p>
			<button>Delete</button>
			<button>Edit</button>
			<h3>Geographical location from accesses</h3>
			<p>Map placeholder</p>
			<h3>Accesses over time</h3>
			<p>Graph placeholder</p>
		</>
	)
}

export default Redirect;