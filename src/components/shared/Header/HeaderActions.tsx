'use client';

import { BsBell } from 'react-icons/bs';
import Menu from '../Menu';
import UserMenu from './UserMenu';
import NotificationsMenu from './NotificationsMenu';
import { usePathname } from 'next/navigation';
import PrimaryButton from '../Button';
import FallbackImage from '../FallbackImage';

export default function HeaderActions() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <div className={`lg:order-2 flex gap-2 items-center`}>
      {!isDashboard && <PrimaryButton
        href="/sign-in"
        className="focus:outline-none focus:ring-2 focus:ring-primary/30"
      >
        Login
      </PrimaryButton>}

      {/* Notification Icon */}
      <div className="relative inline-block text-left">
        <Menu
          width={250}
          align='left'
          trigger={(toggle) => (
            <div className="relative inline-flex">
              {/* Notification Dot */}
              <span className="absolute top-[-8px] right-0 flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                <span className="absolute inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>

              {/* Bell Button */}
              <button
                type="button"
                onClick={toggle}
                aria-label="فتح الإشعارات"
                className="inline-flex justify-center rounded-3xl bg-btn-bg p-3 text-sm text-gray-800 hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <BsBell className="w-5 h-5" />
              </button>
            </div>

          )}
        >
          <NotificationsMenu />
        </Menu>
      </div>

      {/* Profile */}
      <div className="relative inline-block">
        <Menu
          width={200}
          align='left'
          trigger={(toggle) => (
            <button
              onClick={toggle}
              className="flex justify-center items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="فتح قائمة المستخدم"
            >
              <FallbackImage
                alt="profile"
                src="/users/user-1.jpg"
                width={44}
                height={44}
                className="rounded-full"
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
