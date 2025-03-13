function Notification({ notification }) {
    if (notification) {
        return (
            <div>
                {notification.message}
            </div>
        );
    }
}

export default Notification;