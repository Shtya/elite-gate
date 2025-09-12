'use client';

import { BsBell } from 'react-icons/bs';
import Image from 'next/image';
import Menu from '../Menu';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';

export default function HeaderActions() {
  return (
    <div className="lg:order-2 flex gap-2 items-center">
      {/* Notification Icon */}
      <div className="relative inline-block text-left">
        <Menu
          width={288}
          trigger={(toggle) => (
            <button
              type="button"
              onClick={toggle}
              aria-label="فتح الإشعارات"
              className="inline-flex justify-center rounded-3xl bg-btn-bg p-3 text-sm text-gray-800 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              <BsBell className="w-5 h-5" />
            </button>
          )}
        >
          <NotificationsMenu />
        </Menu>
      </div>

      {/* Profile */}
      <div className="relative inline-block">
        <Menu
          trigger={(toggle) => (
            <button
              onClick={toggle}
              className="flex justify-center items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="فتح قائمة المستخدم"
            >
              <Image
                alt="profile"
                src="/users/user-1.jpg"
                width={44}
                height={44}
                className="rounded-full"
                priority
              />
            </button>
          )}
        >
          <UserMenu
            user={{ name: "Peter Parker", location: "Los Angeles, CA", avatarUrl: "/users/user-1.jpg" }}
            onLogout={() => console.log("Logging out...")}
          />
        </Menu>
      </div>
    </div>
  );
}
