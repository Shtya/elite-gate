import NavMenuItem from './NavMenuItem';
import { NavItem } from '@/types/global';


const navigation: NavItem[] = [
    {
        name: "الرئيسية",
        href: "/",
    },
    {
        name: "العقارات",
        children: [
            {
                name: "فلل", href: "/listings/villas",
            },
            { name: "شقق", href: "/listings/apartments" },
            { name: "أراضي سكنية", href: "/listings/residential-land" },
            { name: "أراضي تجارية", href: "/listings/commercial-land" },
            { name: "مكاتب إدارية", href: "/listings/offices" },
        ],
    },
    {
        name: "الصفحات",
        children: [
            { name: "من نحن", href: "/about-us" },
            { name: "الأسئلة الشائعة", href: "/faq" },
            { name: "اتصل بنا", href: "/contact-us" },
            { name: "سياسة الخصوصية", href: "/privacy" },
            { name: "الشروط والأحكام", href: "/terms" },
        ],
    },
    {
        name: "لوحة التحكم",
        href: "dashboard",
    },
];

type NavbarProps = {
    currentLevel?: number;
    onCloseMobileMenu?: () => void;
    onChangeLevel?: (val: number | undefined) => void
};


export default function Navbar({ currentLevel, onChangeLevel, onCloseMobileMenu }: NavbarProps) {
    return (
        <ul className="flex flex-col lg:flex-row menus absolute left-0 lg:top-full bg-white lg:bg-transparent w-full lg:w-auto lg:static px-2 lg:px-0">
            {/* Nested Dropdown Example */}
            {navigation.map((item, index) => (
                <NavMenuItem
                    key={index}
                    item={item}
                    level={index}
                    currentLevel={currentLevel}
                    onChangeLevel={(val) => onChangeLevel?.(val)}
                    isMainMenu={true}
                    onCloseMobileMenu={onCloseMobileMenu} />
            ))}
        </ul>

    );
}
