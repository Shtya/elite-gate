import Image from "next/image";

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
    <div className="px-1 py-1" role="menu" aria-label="قائمة الإشعارات">
      <h5 className="text-xl font-semibold text-neutral-700 mb-2 text-right">الإشعارات</h5>
      {notifications.map((notif) => (
        <div
          key={notif.id}
          className="group flex gap-3 w-full items-center justify-between rounded-md px-2 py-2 cursor-pointer hover:bg-gray-100 transition-colors"
          role="menuitem"
          tabIndex={0}
        >
          <Image src={notif.avatarUrl} alt="" width={44} height={44} className="rounded-full" />
          <div className="flex flex-col">
            <span className="font-medium leading-6 text-base text-gray-800">{notif.name}</span>
            <span className="text-sm text-gray-500 leading-5">{notif.message}</span>
            <span className="text-xs text-gray-400">{notif.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
