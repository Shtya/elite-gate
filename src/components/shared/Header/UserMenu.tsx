import {
    HiOutlineUser,
    HiOutlineCalendar,
    HiOutlineHeart,
    HiOutlineQuestionMarkCircle,
    HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import Image from "next/image";
import MenuItem from "../MenuItem";


type Props = {
    user: {
        name: string;
        location: string;
        avatarUrl: string;
    };
    onLogout?: () => void;
};

export default function UserMenu({ user, onLogout }: Props) {
    return (
        <>
            {/* Profile Section */}
            <div className="flex gap-3 pb-3 items-center border-b border-dashed">
                <Image
                    src={user.avatarUrl}
                    alt="profile"
                    width={55}
                    height={55}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <span className="text-gray-800 text-xl font-semibold">{user.name}</span>
                    <span className="text-gray-600 text-sm">{user.location}</span>
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-1 py-1">
                <MenuItem icon={<HiOutlineUser className="w-5 h-5" />} label="حسابي" />
                <MenuItem icon={<HiOutlineCalendar className="w-5 h-5" />} label="حجوزاتي" />
                <MenuItem icon={<HiOutlineHeart className="w-5 h-5" />} label="المفضلة" />
                <MenuItem icon={<HiOutlineQuestionMarkCircle className="w-5 h-5" />} label="المساعدة" />
                <MenuItem
                    icon={<HiOutlineArrowRightOnRectangle className="w-5 h-5" />}
                    label="تسجيل الخروج"
                    onClick={onLogout}
                />
            </div>

        </>
    );
}

