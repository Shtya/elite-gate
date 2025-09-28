import AgentFilterPopup from "@/components/dashboard/AgentFilterPopup";
import InfoCell from "@/components/shared/InfoCell";
import { FilterConfig, SortConfig, TableColumn } from "@/types/components/Table";
import { AppointmentRow, MiniUser } from "@/types/dashboard/appointment";
import { BookingStatus } from "@/types/global";
import { getDefaultProjectpath } from "@/utils/appointment";
import { formatDate, formatTime } from "@/utils/date";
import { FaStar } from 'react-icons/fa';
import { projectTypeColors } from "../property.tsx/constants";
import { MiniProject, propertyTypeLabels } from "@/types/property";
import { useRoleFromPath } from "@/hooks/dashboard/admin/useRoleFromPath";
import { useMemo } from "react";

export const bookingStatusMap: Record<BookingStatus, string> = {
    pending: 'قيد الانتظار',
    assigned: 'تم التعيين',
    confirmed: 'مؤكد',
    in_progress: 'قيد التنفيذ',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    no_show: 'لم يحضر',
};


export const bookingStatusStyle: Record<BookingStatus, string> = {
    pending: 'bg-[#FFF8E1] text-[#9C6B00]',
    assigned: 'bg-[#E6F4FF] text-[#0369A1]',
    confirmed: 'bg-[#E9FBEA] text-[#1B7B3A]',
    in_progress: 'bg-[#EEF2FF] text-[#3730A3]',
    completed: 'bg-[#EBFBF2] text-[var(--secondary-500)]',
    cancelled: 'bg-[#FFF0F0] text-[#BE6464]',
    no_show: 'bg-[#F3F4F6] text-[#4B5563]',
};



export const appointmentFilters: FilterConfig[] = [
    {
        type: 'select',
        label: 'الحالة',
        key: 'status',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'قيد الانتظار', value: 'pending' },
            { label: 'تم التعيين', value: 'assigned' },
            { label: 'مؤكد', value: 'confirmed' },
            { label: 'قيد التنفيذ', value: 'in_progress' },
            { label: 'مكتمل', value: 'completed' },
            { label: 'ملغي', value: 'cancelled' },
            { label: 'لم يحضر', value: 'no_show' },
        ],
        default: 'all',
    },
    {
        type: 'dateRange',
        label: 'تاريخ الموعد',
        key: 'appointmentAt',
    },
    {
        key: 'isPaid',
        label: 'الدفع',
        type: 'select',
        options: [
            { label: 'الكل', value: 'all' },
            { label: 'مدفوعة', value: 'paid' },
            { label: 'غير مدفوعة', value: 'unpaid' },
        ],
        default: 'all',
    },
    {
        key: 'agentId',
        label: 'الوسيط',
        type: 'custom',
        component: ({ value, onChange }) => {
            const appointment = mockAppointments.find((a) => a.agent.id.toString() === value);
            const selectedAgent = appointment?.agent;
            return (
                <AgentFilterPopup
                    selectedAgent={selectedAgent}
                    onSelect={(agent) => onChange(agent.id.toString())}
                    onClear={() => onChange(undefined)}
                />
            );
        },
    },

];

export const appointmentSortConfig: SortConfig = {
    sortFields: [
        { label: 'الحالة', value: 'status' },
        { label: 'اسم الوسيط', value: 'agentName' },
        { label: 'اسم العميل', value: 'clientName' },
        { label: 'اسم المشروع', value: 'projectTitle' },
        { label: 'موعد الزيارة', value: 'appointmentAt' },
    ],
    defaultSort: 'appointmentAt',
};

export function useAppointmentColumns(): TableColumn<AppointmentRow>[] {
    const role = useRoleFromPath();
    const isAdmin = role === "admin";

    return useMemo(() => [
        {
            key: 'project',
            label: 'المشروع',
            cell: (val: MiniProject, row?: AppointmentRow) => {

                return (
                    <InfoCell
                        image={val.image}
                        title={val.title}
                        defaultImage={getDefaultProjectpath(row?.project?.type)}
                        href={`/projects/${val.id}`}
                        subtitle={propertyTypeLabels[val.type]}
                        imageRounded="lg"
                        subtitleClass={projectTypeColors[val.type]}
                    />
                );
            },
        },

        {
            key: 'appointmentAt',
            label: 'موعد الزيارة',
            cell: (val: string) => {
                const d = new Date(val);
                const date = formatDate(d);
                const time = formatTime(d);
                return (
                    <div className="flex flex-col">
                        <span className="font-medium">{date}</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </div>
                );
            },
        },
        {
            key: 'createdAt',
            label: 'تاريخ الإنشاء',
            cell: (val: string) => {
                const d = new Date(val);
                const date = formatDate(d);
                return (
                    <div className="">
                        <span className="font-medium">{date}</span>
                    </div>
                );
            },
        },
        {
            key: 'agent',
            label: 'الوسيط',
            cell: (user: MiniUser) => (
                <InfoCell image={user.image} subtitle={user.email} title={user.name} href={`/dashboard/admin/agents/${user.id}`} />
            ),
        },
        {
            key: 'client',
            label: 'العميل',
            cell: (user: MiniUser) => {
                return (
                    <InfoCell
                        image={user.image}
                        subtitle={user.email}
                        title={user.name}
                        href={isAdmin ? `/dashboard/admin/clients/${user.id}` : undefined}
                    />
                );
            },
        },

        {
            key: 'reviewStars',
            label: 'تقييم العميل',
            cell: (val: number | undefined, row?: AppointmentRow) => {
                if (row?.status !== 'completed' || !val) return <span className="text-xs text-gray-400">—</span>;
                return (
                    <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <FaStar key={i} className={i < val ? 'fill-amber-500' : 'fill-gray-300'} />
                        ))}
                    </div>
                );
            },
        },
        {
            key: 'status',
            label: 'الحالة',
            cell: (val: BookingStatus | undefined) => {
                const style = val ? bookingStatusStyle[val] : 'bg-gray-100 text-gray-500';
                const label = val ? bookingStatusMap[val] : 'غير محدد';

                return (
                    <span className={`px-3 py-1 rounded-full text-sm ${style}`}>
                        {label}
                    </span>
                );
            },
        },
        {
            key: 'isPaid',
            label: 'الدفع',
            cell: (val: boolean | undefined, row?: AppointmentRow) => {
                if (row?.status !== 'completed') return <span className="text-xs text-gray-400">—</span>;
                return val ? (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-100 text-emerald-700">مدفوع</span>
                ) : (
                    <span className="px-2 py-0.5 rounded-full text-xs bg-rose-100 text-rose-700">غير مدفوع</span>
                );
            },
        },
    ], [isAdmin]);
}

export const mockAppointments: AppointmentRow[] = [
    {
        id: 101, project: { id: 11, title: 'مشروع 113 – فخامة وتصميم عصري', type: 'apartment', image: '/main/projects/property-2.webp' }, appointmentAt: '2025-10-03T14:30:00', createdAt: '2025-09-28T08:10:00', agent: { id: 21, name: 'يوسف أحمد', email: 'youssef@agency.com', image: '/users/user-2.webp' }, client: { id: 1, name: 'خالد الشمري', email: 'khaled@example.com', image: '/users/user-1.jpg' }, status: 'completed', reviewStars: 3, isPaid: true, proofFiles: [
            {
                url: "/uploads/request-301/property-requests-data.pdf",
                name: "الاثبات_2.dbf",
                type: "application/dbf",
                isPrimary: true,
            },
            {
                url: "/uploads/request-301/property-owners-list.pdf",
                name: "الاثبات_1.dbf",
                type: "application/dbf",
                isPrimary: false,
            },
        ],
        agentReviewStars: 4,
        agentReviewText: "خالد كان عميلًا محترمًا ومنظمًا، حضر في الوقت المحدد وكان واضحًا في متطلباته. التعامل معه كان سلسًا وساعدني في تقديم أفضل الخيارات له."
    },
    {
        id: 102, project: { id: 12, title: 'فلل البستان – واجهات حجرية', type: 'office', image: '' }, appointmentAt: '2025-10-05T09:00:00', createdAt: '2025-09-29T10:20:00', agent: { id: 35, name: 'سارة العتيبي', email: 'sara@agency.com', image: '/users/user-3.jpg' }, client: { id: 2, name: 'عبدالله الشهري', email: 'abdullah@example.com', image: '/users/user-2.webp' }, status: 'completed', reviewStars: 4,
    },
    {
        id: 103, project: { id: 13, title: 'أرض رقم 54 – مخطط الواحة', type: 'villa', image: '' }, appointmentAt: '2025-10-07T16:15:00', createdAt: '2025-09-25T12:00:00', agent: { id: 23, name: 'نواف المطيري', email: 'nawaf@agency.com', image: '' }, client: { id: 3, name: 'أحمد العتيبي', email: 'ahmad@example.com', image: '' }, status: 'cancelled',
    },
    {
        id: 104, project: { id: 14, title: 'شقق الواجهة البحرية', type: 'apartment', image: '/main/projects/property-3.webp' }, appointmentAt: '2025-10-02T11:00:00', createdAt: '2025-09-24T09:35:00', agent: { id: 24, name: 'ليان الغامدي', email: 'layan@agency.com' }, client: { id: 4, name: 'هناء العبدالله', email: 'hannah@example.com' }, status: 'in_progress',
    },

    {
        id: 105, project: { id: 15, title: 'شقق النخبة – إطلالة بانورامية', type: 'apartment', image: '' }, appointmentAt: '2025-10-08T10:00:00', createdAt: '2025-09-30T08:00:00', agent: { id: 25, name: 'فهد الزهراني', email: 'fahad@agency.com', image: '/users/user-4.jpg' }, client: { id: 5, name: 'ريم الحربي', email: 'reem@example.com', image: '' }, status: 'pending',
    },
    {
        id: 106, project: { id: 16, title: 'فلل المرجان – تصميم كلاسيكي', type: 'office', image: '/main/projects/property-2.webp' }, appointmentAt: '2025-10-09T13:30:00', createdAt: '2025-09-27T11:15:00', agent: { id: 26, name: 'نورة السبيعي', email: 'noura@agency.com', image: '/users/user-5.jpg' }, client: { id: 6, name: 'عبدالرحمن القحطاني', email: 'abdulrahman@example.com', image: '/users/user-6.jpg' }, status: 'assigned',
    },
    {
        id: 107, project: { id: 17, title: 'أرض الواحة – موقع استثماري', type: 'villa', image: '' }, appointmentAt: '2025-10-10T15:45:00', createdAt: '2025-09-26T10:00:00', agent: { id: 27, name: 'خالد الزامل', email: 'khalid@agency.com', image: '/users/user-7.jpg' }, client: { id: 7, name: 'سلمان العتيبي', email: 'salman@example.com', image: '/users/user-8.jpg' }, status: 'confirmed',
    },
    {
        id: 108, project: { id: 18, title: 'شقق البحر – مفروشة بالكامل', type: 'apartment', image: '/main/projects/property-1.webp' }, appointmentAt: '2025-10-11T09:15:00', createdAt: '2025-09-25T14:00:00', agent: { id: 28, name: 'هند القحطاني', email: 'hind@agency.com', image: '' }, client: { id: 8, name: 'ماجد السالم', email: 'majed@example.com', image: '/users/user-9.jpg' }, status: 'completed', reviewStars: 5, isPaid: true,
        proofFiles: [
            {
                url: "/uploads/request-301/property-requests-data.pdf",
                name: "الاثبات_2.dbf",
                type: "application/dbf",
                isPrimary: true,
            },
            {
                url: "/uploads/request-301/property-owners-list.pdf",
                name: "الاثبات_1.dbf",
                type: "application/dbf",
                isPrimary: false,
            },
        ],

    },
    {
        id: 109, project: { id: 19, title: 'فلل النخيل – واجهات حجرية', type: 'office', image: '' }, appointmentAt: '2025-10-12T17:00:00', createdAt: '2025-09-24T09:00:00', agent: { id: 29, name: 'سعد المطيري', email: 'saad@agency.com', image: '/users/user-10.jpg' }, client: { id: 9, name: 'نجلاء العنزي', email: 'najla@example.com', image: '' }, status: 'no_show',
    },
    {
        id: 110, project: { id: 20, title: 'أرض التلال الذهبية', type: 'villa', image: '/main/projects/property-4.webp' }, appointmentAt: '2025-10-13T12:00:00', createdAt: '2025-09-23T10:30:00', agent: { id: 30, name: 'راكان العتيبي', email: 'rakan@agency.com', image: '/users/user-11.jpg' }, client: { id: 10, name: 'أماني الزهراني', email: 'amani@example.com', image: '/users/user-12.jpg' }, status: 'in_progress',
    },
    {
        id: 111, project: { id: 21, title: 'شقق المرجان – مفروشة بالكامل', type: 'apartment', image: '' }, appointmentAt: '2025-10-14T08:30:00', createdAt: '2025-09-22T08:00:00', agent: { id: 31, name: 'عبدالله السبيعي', email: 'abdullah@agency.com', image: '' }, client: { id: 11, name: 'سارة الغامدي', email: 'sarah@example.com', image: '/users/user-13.jpg' }, status: 'completed', reviewStars: 3,
    },
    {
        id: 112, project: { id: 22, title: 'فلل الواحة – تصميم حديث', type: 'office', image: '/main/projects/property-5.webp' }, appointmentAt: '2025-10-15T14:00:00', createdAt: '2025-09-21T12:00:00', agent: { id: 32, name: 'ليلى العتيبي', email: 'leila@agency.com', image: '/users/user-14.jpg' }, client: { id: 12, name: 'فهد الحربي', email: 'fahad@example.com', image: '/users/user-15.jpg' }, status: 'cancelled',
    },
    {
        id: 113, project: { id: 23, title: 'أرض المرجان – موقع مميز', type: 'villa', image: '' }, appointmentAt: '2025-10-16T16:30:00', createdAt: '2025-09-20T11:00:00', agent: { id: 35, name: 'نادر فؤاد', email: 'nader@agency.com', image: '/users/user-16.jpg' }, client: { id: 13, name: 'أحمد الزهراني', email: 'ahmed@example.com', image: '' }, status: 'assigned',
    },
    {
        id: 114, project: { id: 24, title: 'شقق التلال – إطلالة جبلية', type: 'apartment', image: '/main/projects/property-10.webp' }, appointmentAt: '2025-10-17T11:45:00', createdAt: '2025-09-19T09:30:00', agent: { id: 35, name: 'نوف السالم', email: 'nouf@agency.com', image: '/users/user-17.jpg' }, client: { id: 14, name: 'خالد القحطاني', email: 'khalid@example.com', image: '/users/user-18.jpg' }, status: 'pending',
    },
    {
        id: 115, project: { id: 25, title: 'فلل البحر – تصميم فاخر', type: 'office', image: '' }, appointmentAt: '2025-10-18T18:00:00', createdAt: '2025-09-18T10:00:00', agent: { id: 35, name: 'سعود العتيبي', email: 'saud@agency.com', image: '/users/user-19.jpg' }, client: { id: 15, name: 'نورة الزامل', email: 'noura@example.com', image: '/users/user-20.jpg' }, status: 'confirmed',
    },
];


export const agents: MiniUser[] = [
    { id: 21, name: 'يوسف أحمد', email: 'youssef@agency.com', image: '/users/user-2.webp' },
    { id: 22, name: 'سارة العتيبي', email: 'sara@agency.com', image: '/users/user-3.jpg' },
    { id: 23, name: 'نواف المطيري', email: 'nawaf@agency.com', image: '' },
    { id: 24, name: 'ليان الغامدي', email: 'layan@agency.com' },
    { id: 25, name: 'فهد الزهراني', email: 'fahad@agency.com', image: '/users/user-4.jpg' },
    { id: 26, name: 'نورة السبيعي', email: 'noura@agency.com', image: '/users/user-5.jpg' },
    { id: 27, name: 'خالد الزامل', email: 'khalid@agency.com', image: '/users/user-7.jpg' },
    { id: 28, name: 'هند القحطاني', email: 'hind@agency.com', image: '' },
    { id: 29, name: 'سعد المطيري', email: 'saad@agency.com', image: '/users/user-10.jpg' },
    { id: 30, name: 'راكان العتيبي', email: 'rakan@agency.com', image: '/users/user-11.jpg' },
]


export const clients: MiniUser[] = [
    { id: 1, name: 'خالد الشمري', email: 'khaled@example.com', image: '/users/user-1.jpg' },
    { id: 2, name: 'عبدالله الشهري', email: 'abdullah@example.com', image: '/users/user-2.webp' },
    { id: 3, name: 'أحمد العتيبي', email: 'ahmad@example.com', image: '' },
    { id: 4, name: 'هناء العبدالله', email: 'hannah@example.com' },
    { id: 5, name: 'ريم الحربي', email: 'reem@example.com', image: '' },
    { id: 6, name: 'عبدالرحمن القحطاني', email: 'abdulrahman@example.com', image: '/users/user-6.jpg' },
    { id: 7, name: 'سلمان العتيبي', email: 'salman@example.com', image: '/users/user-8.jpg' },
    { id: 8, name: 'ماجد السالم', email: 'majed@example.com', image: '/users/user-9.jpg' },
    { id: 9, name: 'نجلاء العنزي', email: 'najla@example.com', image: '' },
    { id: 10, name: 'أماني الزهراني', email: 'amani@example.com', image: '/users/user-12.jpg' },
]
