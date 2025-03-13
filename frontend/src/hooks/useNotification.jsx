import { useState } from "react";

let timeoutId;

function useNotification() {
    const [notification, setNotification] = useState(null);

    const notificate = (newNotification, timeout) => {
        clearTimeout(timeoutId);
        setNotification(newNotification);
        timeoutId = setTimeout(() => {
            setNotification(null);
        }, timeout);
    }

    return { notification, notificate };
}

export default useNotification;