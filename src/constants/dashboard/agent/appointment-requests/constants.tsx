import InfoCell from "@/components/shared/InfoCell";
import { FilterConfig, SortConfig, TableColumn } from "@/types/components/Table";
import { MiniProject } from "@/types/property";
import { formatDate, formatTime } from "@/utils/date";
import { getDefaultProjectpath } from "@/utils/appointment";
import { MiniUser } from "@/types/dashboard/appointment";

export type AppointmentRequestRow = {
    id: number;
    project: MiniProject;
    appointmentAt: string;
    createdAt: string;
    client: MiniUser;
    note?: string;
};

export const appointmentRequestFilters: FilterConfig[] = [
    {
        type: 'dateRange',
        label: 'موعد الزيارة',
        key: 'appointmentAt',
    },
    {
        type: 'dateRange',
        label: 'تاريخ الإنشاء',
        key: 'createdAt',
    },
];

export const appointmentRequestSortConfig: SortConfig = {
    sortFields: [
        { label: 'اسم المشروع', value: 'projectTitle' },
        { label: 'موعد الزيارة', value: 'appointmentAt' },
        { label: 'تاريخ الإنشاء', value: 'createdAt' },
        { label: 'اسم العميل', value: 'clientName' },
    ],
    defaultSort: 'createdAt',
};

export const appointmentRequestColumns: TableColumn<AppointmentRequestRow>[] = [
    {
        key: 'project',
        label: 'المشروع',
        cell: (val: MiniProject, row?: AppointmentRequestRow) => (
            <InfoCell
                image={val.image}
                title={val.title}
                defaultImage={getDefaultProjectpath(row?.project?.type)}
                href={`/projects/${val.id}`}
                subtitle={val.type}
                imageRounded="lg"
            />
        ),
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
        key: 'client',
        label: 'العميل',
        cell: (user: MiniUser) => (
            <InfoCell image={user.image} subtitle={user.email} title={user.name} href={`/dashboard/admin/clients/${user.id}`} />
        ),
    },
    {
        key: 'createdAt',
        label: 'تاريخ الإنشاء',
        cell: (val: string) => {
            const d = new Date(val);
            const date = formatDate(d);
            return <span className="font-medium">{date}</span>;
        },
    },
];

export const mockAppointmentRequests: AppointmentRequestRow[] = [
    {
        id: 201,
        project: { id: 11, title: 'مشروع 113 – فخامة وتصميم عصري', type: 'apartment', image: '/main/projects/property-2.webp' },
        appointmentAt: '2025-10-03T14:30:00',
        createdAt: '2025-09-28T08:10:00',
        client: { id: 1, name: 'خالد الشمري', email: 'khaled@example.com', image: '/users/user-1.jpg' },
        note: 'أرغب بزيارة صباح السبت',
    },
    {
        id: 202,
        project: { id: 14, title: 'شقق الواجهة البحرية', type: 'apartment', image: '/main/projects/property-3.webp' },
        appointmentAt: '2025-10-05T09:00:00',
        createdAt: '2025-09-29T10:20:00',
        client: { id: 2, name: 'عبدالله الشهري', email: 'abdullah@example.com', image: '/users/user-2.webp' },
    },
    {
        id: 203,
        project: { id: 20, title: 'أرض التلال الذهبية', type: 'villa', image: '/main/projects/property-4.webp' },
        appointmentAt: '2025-10-07T16:15:00',
        createdAt: '2025-09-25T12:00:00',
        client: { id: 10, name: 'أماني الزهراني', email: 'amani@example.com', image: '/users/user-12.jpg' },
    },
];


