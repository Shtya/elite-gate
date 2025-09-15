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
                name: "فلل", href: "/projects?type=villas",
            },
            { name: "شقق", href: "/projects?type=apartments" },
            { name: "أراضي سكنية", href: "/projects?type=residential-land" },
            { name: "أراضي تجارية", href: "/projects?type=commercial-land" },
            { name: "مكاتب إدارية", href: "/projects?type=offices" },
        ],
    },
    {
        name: "الصفحات",
        children: [
            { name: "من نحن", href: "/about-us" },
            { name: "اتصل بنا", href: "/contact-us" },
            { name: "المفضلة", href: "/favorites" },
            { name: "الأسئلة الشائعة", href: "/faq" },
            { name: "سياسة الخصوصية", href: "/privacy" },
            { name: "الشروط والأحكام", href: "/terms" },
        ],
    },
    {
        name: "لوحة التحكم",
        href: "/dashboard",
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
