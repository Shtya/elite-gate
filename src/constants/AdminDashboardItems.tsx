import { FaChartBar, FaCalendarAlt, FaUserFriends, FaUserTie, FaUserPlus, FaEdit, FaInfoCircle, FaMapMarkerAlt, FaVideo, FaPhoneAlt, FaAward, FaRegFileAlt, FaCog, FaCity, FaProjectDiagram, FaRegListAlt, FaHome, FaUsers, FaUserCheck, FaUserClock, FaUserEdit, FaUserShield, FaBullhorn, FaFileAlt, FaQuestionCircle } from 'react-icons/fa';
import { MdDashboard, MdSettings, MdOutlinePrivacyTip, MdDescription } from 'react-icons/md';
import { AiOutlineTeam, AiOutlineUser } from 'react-icons/ai';
import { SelectableItem } from '@/types/global';

export const dashboardItems: SelectableItem[] = [
    {
        label: "لوحة التحكم",
        icon: MdDashboard,
        href: "/dashboard"
    },
    {
        label: "المواعيد",
        icon: FaCalendarAlt,
        children: [
            { label: "قائمة المواعيد", icon: FaRegListAlt, href: "/dashboard/appointments" },
            { label: "المواعيد غير المثبتة", icon: FaUserClock, href: "/dashboard/appointments/unproofed" }
        ]
    },
    {
        label: "إدارة المستخدمين",
        icon: FaUsers,
        children: [
            {
                label: "العملاء",
                icon: FaUserFriends,
                children: [
                    { label: "قائمة العملاء", icon: FaRegListAlt, href: "/dashboard/clients" },
                    { label: "إضافة عميل", icon: FaUserPlus, href: "/dashboard/clients/add" }
                ]
            },
            {
                label: "الوسطاء",
                icon: FaUserTie,
                children: [
                    { label: "قائمة الوسطاء", icon: FaRegListAlt, href: "/dashboard/agents/list" },
                    { label: "إضافة وسيط", icon: FaUserPlus, href: "/dashboard/agents/add" },
                    { label: "طلبات التسجيل", icon: FaUserCheck, href: "/dashboard/agents/requests" },
                ]
            },
            {
                label: "المسوقين",
                icon: FaBullhorn,
                children: [
                    { label: "قائمة المسوقين", icon: FaRegListAlt, href: "/dashboard/marketers/list" },
                    { label: "إضافة مسوق", icon: FaUserPlus, href: "/dashboard/marketers/add" }
                ]
            }
        ]
    },
    {
        label: "إدارة المحتوى",
        icon: FaProjectDiagram,
        children: [
            {
                label: "المدن والمناطق",
                icon: FaCity,
                children: [
                    { label: "قائمة المدن والمناطق", icon: FaRegListAlt, href: "/dashboard/locations/list" },
                    { label: "إضافة مدينة / منطقة", icon: FaUserPlus, href: "/dashboard/locations/add" }
                ]
            },
            {
                label: "المشاريع",
                icon: FaProjectDiagram,
                children: [
                    { label: "قائمة المشاريع", icon: FaRegListAlt, href: "/dashboard/projects/list" },
                    { label: "إضافة مشروع", icon: FaUserPlus, href: "/dashboard/projects/add" }
                ]
            }
        ]
    },
    {
        label: "طلبات الاهتمام",
        icon: FaUserShield,
        href: "/dashboard/interests"
    },
    {
        label: "الصفحات",
        icon: FaFileAlt,
        children: [
            {
                label: "الرئيسية",
                icon: FaHome,
                children: [
                    { label: "قسم البطل", icon: FaInfoCircle, href: "/dashboard/pages/home/hero" },
                    { label: "قسم الميزات", icon: FaInfoCircle, href: "/dashboard/pages/home/features" },
                    { label: "قسم الشهادات", icon: FaInfoCircle, href: "/dashboard/pages/home/testimonials" }
                ]
            },
            {
                label: "من نحن",
                icon: AiOutlineTeam,
                children: [
                    { label: "المهمة", icon: FaInfoCircle, href: "/dashboard/pages/about/mission" },
                    { label: "الفريق", icon: AiOutlineUser, href: "/dashboard/pages/about/team" },
                    { label: "العملية", icon: FaInfoCircle, href: "/dashboard/pages/about/process" }
                ]
            },
            { label: "سياسة الخصوصية", icon: MdOutlinePrivacyTip, href: "/dashboard/pages/privacy" },
            { label: "الشروط والأحكام", icon: MdDescription, href: "/dashboard/pages/terms" },
            { label: "الأسئلة الشائعة", icon: FaQuestionCircle, href: "/dashboard/pages/faq" }
        ]
    },
    {
        label: "الإعدادات العامة",
        icon: MdSettings,
        children: [
            { label: "الموقع", icon: FaMapMarkerAlt, href: "/dashboard/settings/location" },
            { label: "الفيديو التعريفي", icon: FaVideo, href: "/dashboard/settings/video" },
            { label: "معلومات التواصل", icon: FaPhoneAlt, href: "/dashboard/settings/contact" },
            { label: "الإنجازات", icon: FaAward, href: "/dashboard/settings/accomplishments" },
            { label: "الفوتر", icon: FaRegFileAlt, href: "/dashboard/settings/footer" }
        ]
    },
    {
        label: "إعدادات المسؤول",
        icon: FaCog,
        href: "/dashboard/admin/account"
    }
];
