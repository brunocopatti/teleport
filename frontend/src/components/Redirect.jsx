import { useState } from "react";
import { Copy, CornerDownLeft, Pencil, PencilOff, RefreshCw, Trash2 } from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
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
	const [isLoading, setIsLoading] = useState(false);

	const shortUrl = `${getBaseUrl()}${redirect.short_path}`;

	const [isEditing, setIsEditing] = useState(false);

	const onRefresh = async () => {
		try {
			setIsLoading(true);
			setActiveRedirect(await getRedirectById({ id: redirect.id }, { token }));
		} catch (error) {
			setActiveRedirect(null);
			notificate({
				message: "Error refreshing Redirect",
				type: "error"
			});
		} finally {
			setIsLoading(false);
		}
	}

	const onDelete = async () => {
		try {
			setIsLoading(true);
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
		} finally {
			setIsLoading(false);
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
					className="rounded-3xl px-2 py-1 border cursor-pointer disabled:opacity-50 disabled:cursor-auto"
					onClick={() => {
						setActiveRedirect(null);
					}}
					disabled={isLoading}
				>
					<span className="sr-only">Return</span>
					<CornerDownLeft />
				</button>
				<h3 className="text-3xl">
					{redirect.short_path}
				</h3>
			</div>
			<div className="flex gap-1">
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer disabled:opacity-50 disabled:cursor-auto"
					onClick={onRefresh}
					disabled={isLoading}
				>
					<span className="sr-only">Refresh</span>
					<RefreshCw />
				</button>
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer border-red-500 text-red-500 dark:border-red-400 dark:text-red-400 disabled:opacity-50 disabled:cursor-auto"
					onClick={onDelete}
					disabled={isLoading}
				>
					<span className="sr-only">Delete</span>
					<Trash2 />
				</button>
				<button
					className="rounded-3xl px-2 py-1 border cursor-pointer"
					onClick={() => setIsEditing(!isEditing)}
				>
					<span className="sr-only">{isEditing ? 'Stop editing' : 'Edit'}</span>
					{isEditing ? <PencilOff /> : <Pencil />}
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
					isLoading={isLoading}
					setIsLoading={setIsLoading}
				/>
			)}
			<div className="flex flex-col gap-1">
				<p>{redirect.clicks} clicks</p>
				<div className="flex items-center gap-2">
					<p>
						Short URL: <a className="underline" href={shortUrl}>{shortUrl}</a>
					</p>
					<button
						className="rounded-3xl px-3 py-0.5 border cursor-pointer"
						onClick={copyShortUrl}
					>
						<span className="sr-only">Copy</span>
						<Copy />
					</button>
				</div>
				<p>Destination URL: <a className="underline" href={redirect.destination_url}>{redirect.destination_url}</a></p>
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