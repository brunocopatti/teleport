import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";
import { deleteRedirect, getRedirectById } from "../api/redirects";
import RedirectUpdateForm from "./RedirectUpdateForm";
import "leaflet/dist/leaflet.css";

const getBaseUrl = () => {
	if (import.meta.env.VITE_API_URL) {
		return `${import.meta.env.VITE_API_URL}/`
	}
	try {
		return window.location.href;
	} catch {
		// Browser doesn't support this
		return "/";
	}
}

function Redirect({
	redirect,
	reports,
	setRedirects,
	setActiveRedirect,
	token,
	notificate
}) {
	const shortUrl = `${getBaseUrl()}${redirect.short_path}`;

	const [isEditing, setIsEditing] = useState(false);

	const onRefresh = async () => {
		try {
			setActiveRedirect(await getRedirectById({ id: redirect.id }, { token }));
		} catch (error) {
			setActiveRedirect(null);
			notificate({
				message: "Error refreshing Redirect",
				type: "error"
			});
		}
	}

	const onDelete = async () => {
		try {
			await deleteRedirect({ id: redirect.id }, { token });
			setRedirects((redirects) => redirects.filter((r) => (
				r.id !== redirect.id
			)));
			setActiveRedirect(null);
		} catch (error) {
			notificate({
				message: "Error deleting Redirect",
				type: "error"
			});
		}
	}

	const copyShortUrl = () => {
		try {
			navigator.clipboard.writeText(shortUrl);
			notificate({
				message: `Copied ${shortUrl} to clipboard`,
				type: "success"
			});
		} catch (error) {
			notificate({
				message: "Copying to clipboard not supported",
				type: "error"
			});
		}
	}

	const clickMarkers = reports
		.filter((report) => report.location)
		.map((report) => {
			const position = report.location.split(",");
			return <Marker key={report.id} position={position} />
		});

	return (
		<>
			<h2>{redirect.short_path}</h2>
			<button onClick={onRefresh}>Refresh</button>
			<p>Access count: {redirect.clicks}</p>
			<div>
				<p>
					Short URL: <a href={shortUrl}>{shortUrl}</a>
				</p>
				<button onClick={copyShortUrl}>Copy</button>
			</div>
			<p>Destination url: <a href={redirect.destination_url}>{redirect.destination_url}</a></p>
			<button onClick={onDelete}>Delete</button>
			<button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Stop editing' : 'Edit'}
			</button>
			{isEditing && (
				<>
					<h3>Edit {redirect.short_path}</h3>
					<RedirectUpdateForm
						redirect={redirect}
						setRedirects={setRedirects}
						setActiveRedirect={setActiveRedirect}
						setIsEditing={setIsEditing}
						token={token}
						notificate={notificate}
					/>
				</>
			)}
			<h3>Geographical location from accesses</h3>
			<MapContainer style={{ height: "400px" }} center={[0, 0]} zoom={1} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{clickMarkers}
			</MapContainer>
		</>
	)
}

export default Redirect;