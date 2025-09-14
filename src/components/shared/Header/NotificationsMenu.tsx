import Image from "next/image";
import Notifications from "../Notifications";

type Notification = {
  id: number;
  name: string;
  message: string;
  time: string;
  avatarUrl: string;
};

const notifications: Notification[] = [
  { id: 1, name: "Peter Parker", message: "New Message alert! @trending", time: "قبل 6 ثوان", avatarUrl: "/users/user-2.webp" },
  { id: 2, name: "Gal Gadot", message: "Measure actions your users", time: "قبل 4 دقائق", avatarUrl: "/users/user-3.webp" },
  { id: 3, name: "Eva Green", message: "New Message alert! @trending", time: "قبل 15 دقيقة", avatarUrl: "/users/user-4.webp" },
];

export default function NotificationsMenu() {
  return (
    <div className="px-1 py-1 max-h-[300px] overflow-y-auto" role="menu" aria-label="قائمة الإشعارات" >
      <h5 className="text-xl font-semibold text-neutral-700 mb-2 text-right">الإشعارات</h5>
      <Notifications />
    </div>
  );
}
