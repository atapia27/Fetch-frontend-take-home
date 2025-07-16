import { useEffect } from "react";
import { useNotifications, useClearNotification } from "@/(features)/favorites/store/favoritesStore";

export default function Sonner() {
  const notifications = useNotifications();
  const clearNotification = useClearNotification();

  useEffect(() => {
    const timeouts = notifications.map(
      (notif) => setTimeout(() => clearNotification(notif.id), 1500), // Auto-dismiss after 3s
    );

    return () => {
      // Cleanup timeouts if notifications change before timeout triggers
      timeouts.forEach(clearTimeout);
    };
  }, [notifications, clearNotification]);

  return (
    <div className="fixed right-4 bottom-4 z-50 flex flex-col space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`animate-fade-in rounded-md px-4 py-2 text-white shadow-md ${
            notification.type === 'add' ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
