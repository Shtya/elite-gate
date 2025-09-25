import {
    FaCalendarAlt, FaUserFriends, FaUserTie, FaUserPlus, FaMapMarkerAlt, FaVideo, FaAward, FaRegFileAlt, FaCity, FaProjectDiagram, FaRegListAlt, FaHome, FaUsers, FaUserShield, FaBullhorn, FaFileAlt, FaQuestionCircle, FaCalendarPlus,
    FaRegCalendarAlt,
    FaWallet,
    FaCalendarCheck,
} from 'react-icons/fa';
import {

} from "react-icons/fa";
import { MdDashboard, MdSettings, MdOutlinePrivacyTip, MdDescription } from 'react-icons/md';
import { AiOutlineTeam } from 'react-icons/ai';
import { Role, SelectableItem } from '@/types/global';



export const adminDashboardItems: SelectableItem[] = [
    {
        label: "لوحة التحكم",
        icon: MdDashboard,
        href: "/dashboard/admin"
    },
    {
        label: "طلبات الاهتمام",
        icon: FaUserShield,
        href: "/dashboard/admin/interest-requests"
    },
    {
        label: "المواعيد",
        icon: FaCalendarAlt,
        children: [
            { label: "قائمة المواعيد", icon: FaRegListAlt, href: "/dashboard/admin/appointments" },
            { label: "إضافة موعد", icon: FaCalendarPlus, href: "/dashboard/admin/appointments/add" }
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
                    { label: "قائمة العملاء", icon: FaRegListAlt, href: "/dashboard/admin/clients" },
                    { label: "إضافة عميل", icon: FaUserPlus, href: "/dashboard/admin/clients/add" }
                ]
            },
            {
                label: "الوسطاء",
                icon: FaUserTie,
                children: [
                    { label: "قائمة الوسطاء", icon: FaRegListAlt, href: "/dashboard/admin/agents" },
                    { label: "إضافة وسيط", icon: FaUserPlus, href: "/dashboard/admin/agents/add" },
                ]
            },
            {
                label: "المسوقين",
                icon: FaBullhorn,
                children: [
                    { label: "قائمة المسوقين", icon: FaRegListAlt, href: "/dashboard/admin/marketers" },
                    { label: "إضافة مسوق", icon: FaUserPlus, href: "/dashboard/admin/marketers/add" }
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
                    { label: "قائمة المدن والمناطق", icon: FaRegListAlt, href: "/dashboard/admin/cities" },
                    { label: "تعديل مدينة / منطقة", icon: FaUserPlus, href: "/dashboard/admin/cities/edit" }
                ]
            },
            {
                label: "المشاريع",
                icon: FaProjectDiagram,
                children: [
                    { label: "قائمة المشاريع", icon: FaRegListAlt, href: "/dashboard/admin/projects" },
                    { label: "إضافة مشروع", icon: FaUserPlus, href: "/dashboard/admin/projects/add" }
                ]
            }
        ]
    },

    {
        label: "الصفحات",
        icon: FaFileAlt,
        children: [
            { label: "الرئيسية", icon: FaHome, href: "/dashboard/admin/pages/home" },
            { label: "من نحن", icon: AiOutlineTeam, href: "/dashboard/admin/pages/about" },
            { label: "الأسئلة الشائعة", icon: FaQuestionCircle, href: "/dashboard/admin/pages/faq" },
            { label: "سياسة الخصوصية", icon: MdOutlinePrivacyTip, href: "/dashboard/admin/pages/privacy" },
            { label: "الشروط والأحكام", icon: MdDescription, href: "/dashboard/admin/pages/terms" },
        ]
    },
    {
        label: "الإعدادات العامة",
        icon: MdSettings,
        children: [
            { label: "الموقع", icon: FaMapMarkerAlt, href: "/dashboard/admin/settings/location" },
            { label: "الفيديو التعريفي", icon: FaVideo, href: "/dashboard/admin/settings/intro-video" },
            { label: "معلومات التواصل و الإنجازات", icon: FaAward, href: "/dashboard/admin/settings/info" },
            { label: "الفوتر", icon: FaRegFileAlt, href: "/dashboard/admin/settings/footer" }
        ]
    },
];

export const agentDashboardItems: SelectableItem[] = [
    {
        label: "لوحة التحكم",
        icon: MdDashboard,
        href: "/dashboard/admin"
    },
    {
        label: "وقت العمل",
        icon: FaRegCalendarAlt,
        href: "/dashboard/agent/schedule"
    },
    {
        label: "المحفظة والمدفوعات",
        icon: FaWallet,
        href: "/dashboard/agent/payments"
    },
    {
        label: "المواعيد",
        icon: FaCalendarAlt,
        children: [
            { label: "قائمة المواعيد", icon: FaRegListAlt, href: "/dashboard/agent/appointments" },
            { label: "إضافة موعد", icon: FaCalendarPlus, href: "/dashboard/agent/appointments/add" },
            { label: "طلبات المواعيد", icon: FaCalendarCheck, href: "/dashboard/agent/appointment-requests" },
        ]
    },
];

export const marketerDashboardItems: SelectableItem[] = [];


export const dashboardItems: Record<Role, SelectableItem[]> = {
    admin: adminDashboardItems,
    marketer: marketerDashboardItems,
    agent: agentDashboardItems,
};