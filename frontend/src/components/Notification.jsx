const notificationColors = {
    "error": {
        "text": "text-red-700",
        "border": "border-red-700"
    },
    "success": {
        "text": "text-emerald-700",
        "border": "border-emerald-700"
    },
}

function Notification({ notification }) {
    if (notification) {
        const color = notificationColors[notification.type];

        return (
            <div className="mx-auto max-w-6xl w-full px-3 mb-3">
                <div className={`${color["text"]} ${color["border"]} p-3 border rounded-md`}>
                    {notification.message}
                </div>
            </div>
        );
    }
}

export default Notification;