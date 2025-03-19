import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import { useState } from "react";
import { deleteRedirect, getRedirectById } from "../api/redirects";
import RedirectUpdateForm from "./RedirectUpdateForm";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

const getBaseUrl = () => {
	if (import.meta.env.VITE_API_URL) {
		return `${import.meta.env.VITE_API_URL}/`
	}
	try {
		return window.location.href.split('/').slice(0,3).join('/') + '/';
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
			return (
				<Marker
					key={report.id}
					position={position}
					icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
				/>
			);
		});

	return (
		<div className="flex flex-col gap-5 mx-auto max-w-6xl w-full px-3">
			<div className="flex items-center gap-3">
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer"
					onClick={() => {
						setActiveRedirect(null);
					}}
				>
					Return
				</button>
				<h3 className="text-3xl">
					{redirect.short_path}
				</h3>
			</div>
			<div className="flex gap-1">
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer"
					onClick={onRefresh}
				>
					Refresh
				</button>
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer border-red-500 text-red-500"
					onClick={onDelete}
				>
					Delete
				</button>
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer"
					onClick={() => setIsEditing(!isEditing)}
				>
					{isEditing ? 'Stop editing' : 'Edit'}
				</button>
			</div>
			{isEditing && (
				<RedirectUpdateForm
					redirect={redirect}
					setRedirects={setRedirects}
					setActiveRedirect={setActiveRedirect}
					setIsEditing={setIsEditing}
					token={token}
					notificate={notificate}
				/>
			)}
			<div className="flex flex-col gap-1">
				<p>{redirect.clicks} clicks</p>
				<div className="flex items-center gap-2">
					<p>
						short URL: <a className="underline" href={shortUrl}>{shortUrl}</a>
					</p>
					<button
						className="rounded-3xl px-3 py-0.5 border cursor-pointer"
						onClick={copyShortUrl}
					>
						copy
					</button>
				</div>
				<p>destination URL: <a className="underline" href={redirect.destination_url}>{redirect.destination_url}</a></p>
			</div>
			<div>
				<h3 className="text-2xl mb-1">
					Geographical location from accesses
				</h3>
				<MapContainer style={{ height: "400px" }} center={[0, 0]} zoom={1} scrollWheelZoom={true}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{clickMarkers}
				</MapContainer>
			</div>
		</div>
	)
}

export default Redirect;