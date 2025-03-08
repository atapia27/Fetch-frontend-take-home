import { useEffect } from "react";
import { useFavoritesStore } from "@/(features)/favorites/store/favoritesStore";

export default function Sonner() {
  const { notifications, clearNotification } = useFavoritesStore();

  useEffect(() => {
    notifications.forEach((notif) => {
      setTimeout(() => clearNotification(notif.id), 3000); // Auto-dismiss after 3s
    });
  }, [notifications, clearNotification]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="animate-fade-in rounded-md bg-green-500 px-4 py-2 text-white shadow-md"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
