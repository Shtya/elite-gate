import {
    FaCalendarAlt, FaUserFriends, FaUserTie, FaUserPlus, FaInfoCircle, FaMapMarkerAlt, FaVideo, FaAward, FaRegFileAlt, FaCity, FaProjectDiagram, FaRegListAlt, FaHome, FaUsers, FaUserClock, FaUserShield, FaBullhorn, FaFileAlt, FaQuestionCircle, FaCalendarPlus,
    FaStar,
    FaListAlt,
    FaServicestack,
    FaQuoteRight,
    FaHandshake,
    FaRegCopyright,
    FaPlusCircle,
    FaImage,
} from 'react-icons/fa';
import {

} from "react-icons/fa";
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
        label: "طلبات الاهتمام",
        icon: FaUserShield,
        href: "/dashboard/interest-requests"
    },
    {
        label: "المواعيد",
        icon: FaCalendarAlt,
        children: [
            { label: "قائمة المواعيد", icon: FaRegListAlt, href: "/dashboard/appointments" },
            { label: "المواعيد غير المثبتة", icon: FaUserClock, href: "/dashboard/appointments/unproofed" },
            { label: "إضافة موعد", icon: FaCalendarPlus, href: "/dashboard/appointments/add" }
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
                    { label: "قائمة الوسطاء", icon: FaRegListAlt, href: "/dashboard/agents" },
                    { label: "إضافة وسيط", icon: FaUserPlus, href: "/dashboard/agents/add" },
                ]
            },
            {
                label: "المسوقين",
                icon: FaBullhorn,
                children: [
                    { label: "قائمة المسوقين", icon: FaRegListAlt, href: "/dashboard/marketers" },
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
                    { label: "قائمة المدن والمناطق", icon: FaRegListAlt, href: "/dashboard/cities" },
                    { label: "تعديل مدينة / منطقة", icon: FaUserPlus, href: "/dashboard/cities/edit" }
                ]
            },
            {
                label: "المشاريع",
                icon: FaProjectDiagram,
                children: [
                    { label: "قائمة المشاريع", icon: FaRegListAlt, href: "/dashboard/projects" },
                    { label: "إضافة مشروع", icon: FaUserPlus, href: "/dashboard/projects/add" }
                ]
            }
        ]
    },

    {
        label: "الصفحات",
        icon: FaFileAlt,
        children: [
            { label: "الرئيسية", icon: FaHome, href: "/dashboard/pages/home" },
            { label: "من نحن", icon: AiOutlineTeam, href: "/dashboard/pages/about" },
            { label: "الأسئلة الشائعة", icon: FaQuestionCircle, href: "/dashboard/pages/faq" },
            { label: "سياسة الخصوصية", icon: MdOutlinePrivacyTip, href: "/dashboard/pages/privacy" },
            { label: "الشروط والأحكام", icon: MdDescription, href: "/dashboard/pages/terms" },
        ]
    },
    {
        label: "الإعدادات العامة",
        icon: MdSettings,
        children: [
            { label: "الموقع", icon: FaMapMarkerAlt, href: "/dashboard/settings/location" },
            { label: "الفيديو التعريفي", icon: FaVideo, href: "/dashboard/settings/intro-video" },
            { label: "معلومات التواصل و الإنجازات", icon: FaAward, href: "/dashboard/settings/info" },
            { label: "الفوتر", icon: FaRegFileAlt, href: "/dashboard/settings/footer" }
        ]
    },
];
