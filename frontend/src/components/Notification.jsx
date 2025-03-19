const notificationColors = {
    "error": "red",
    "success": "emerald"
}

function Notification({ notification }) {
    if (notification) {
        const color = notificationColors[notification.type];

        return (
            <div className="mx-auto max-w-6xl w-full px-3 mb-3">
                <div className={`text-${color}-700 border-${color}-700 p-3 border rounded-md`}>
                    {notification.message}
                </div>
            </div>
        );
    }
}

export default Notification;