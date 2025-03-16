const notificationColors = {
    "error": "red",
    "success": "green"
}

function Notification({ notification }) {
    if (notification) {
        return (
            <div style={{ color: notificationColors[notification.type] }}>
                {notification.message}
            </div>
        );
    }
}

export default Notification;