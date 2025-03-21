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
            <div className="bg-white dark:bg-gray-900 mx-auto max-w-6xl w-full mb-3 sticky top-5">
                <div className={`${color["text"]} ${color["border"]} mx-3 p-3 border rounded-md`}>
                    {notification.message}
                </div>
            </div>
        );
    }
}

export default Notification;