import Image from "next/image";

type Notification = {
    id: number;
    name: string;
    message: string;
    time: string;
    avatarUrl: string;
};

const notifications: Notification[] = [
    {
        id: 1,
        name: "Peter Parker",
        message: "New Message alert! @trending",
        time: "6 Sec ago",
        avatarUrl: "/users/user-2.webp",
    },
    {
        id: 2,
        name: "Gal Gadot",
        message: "Measure actions your users",
        time: "4 Min ago",
        avatarUrl: "/users/user-3.webp",
    },
    {
        id: 3,
        name: "Eva Green",
        message: "New Message alert! @trending",
        time: "15 Min ago",
        avatarUrl: "/users/user-4.webp",
    },
];

export default function NotificationsMenu() {
    return (
        <div
            className="px-1 py-1"
            role="none"
        >
            <h5 className="text-xl font-semibold text-neutral-700 mb-1 text-right" role="none">
                الإشعارات
            </h5>

            {notifications.map((notif) => (
                <div
                    key={notif.id}
                    className="text-gray-800 group flex gap-3 w-full items-center justify-between rounded-md px-2 py-2 cursor-pointer hover:bg-gray-100 transition-colors   "
                    role="menuitem"
                    tabIndex={-1}
                >
                    <Image
                        src={notif.avatarUrl}
                        alt="img"
                        width={50}
                        height={50}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                        <span className="font-medium leading-6 text-lg text-gray-800">
                            {notif.name}
                        </span>
                        <span className="text-sm text-gray-500 leading-5">
                            {notif.message}
                        </span>
                        <span className="text-xs text-gray-400">
                            {notif.time}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
