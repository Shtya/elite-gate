
import {
    FaUserCircle,
    FaShieldAlt,
    FaBell,
    FaComments,
    FaShoppingCart,
} from 'react-icons/fa';
import Image from 'next/image';
import SidebarSection from '@/components/shared/SidebarSection';
import SidebarLink from '@/components/shared/SidebarLink';
import FavoritesLink from './FavoritesLink';


export default function CustomerSidebar() {

    return (
        <div className="sticky top-24 p-4 lg:p-6 rounded-2xl bg-white shadow-lg flex flex-col">
            {/* Profile */}
            <div className="w-32 h-32 border border-primary rounded-full bg-white p-4 grid place-content-center relative mx-auto mb-8">
                <Image
                    src="/users/user-1.jpg"
                    alt="User"
                    width={96}
                    height={96}
                    className="rounded-full"
                />
            </div>

            <div className="text-center mb-8">
                <h4 className="text-2xl font-semibold">Peter Parker</h4>
                <p className="text-sm text-gray-500">info@example.com</p>
            </div>

            {/* Sections */}
            <SidebarSection title="الحساب">
                <SidebarLink href="/personal-info" icon={<FaUserCircle />}>
                    المعلومات الشخصية
                </SidebarLink>
                <SidebarLink href="/user-security" icon={<FaShieldAlt />}>
                    الأمان
                </SidebarLink>
                <SidebarLink href="/user-notification" icon={<FaBell />} badge="4">
                    الإشعارات
                </SidebarLink>
            </SidebarSection>

            <SidebarSection title="التسوق">
                <SidebarLink href="/user-booking" icon={<FaShoppingCart />}>
                    حجوزاتي
                </SidebarLink>
                <FavoritesLink />
            </SidebarSection>

            {/* Logout Button */}
            <div className="mt-[60px] flex justify-center">
                <button
                    type="button"
                    className="px-6 py-2  text-white rounded-lg bg-[#243756] hover:bg-primary transition"
                >
                    تسجيل خروج
                </button>
            </div>
        </div>
    );
}


