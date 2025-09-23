import AppointmentsDataView from '@/components/dashboard/appointments/AppointmentsDataView';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import DownloadList from "@/components/shared/DownloadContent";
import { bookingStatusMap, mockAppointments } from '@/constants/dashboard/appointment/contants';
import { formatDate, formatTime } from '@/utils/date';
import Link from 'next/link';
import { BiPlus } from 'react-icons/bi';

export default function AppointmentsPage() {
    const headers = [
        'ID',
        'المشروع',
        'نوع المشروع',
        'موعد الزيارة',
        'تاريخ الإنشاء',
        'الوسيط',
        'بريد الوسيط',
        'العميل',
        'بريد العميل',
        'التقييم',
        'الحالة',
    ];

    const dataMatrix: (string | number | null)[][] = mockAppointments.map(row => {
        const project = row.project;
        const agent = row.agent;
        const client = row.client;

        const appointmentDate = formatDate(row.appointmentAt);
        const appointmentTime = formatTime(row.appointmentAt);
        const createdDate = formatDate(row.createdAt);

        const review = row.status === 'completed' && row.reviewStars ? row.reviewStars : null;
        const statusLabel = bookingStatusMap[row.status] ?? 'غير محدد';

        return [
            row.id,
            project?.title ?? '',
            project?.type ?? '',
            `${appointmentDate} ${appointmentTime}`,
            createdDate,
            agent?.name ?? '',
            agent?.email ?? '',
            client?.name ?? '',
            client?.email ?? '',
            review,
            statusLabel,
        ];
    })

    const columnWidths = [
        { wch: 5 },   // ID
        { wch: 30 },  // Project Title
        { wch: 15 },  // Project Type
        { wch: 20 },  // Appointment Date
        { wch: 20 },  // Created Date
        { wch: 20 },  // Agent Name
        { wch: 25 },  // Agent Email
        { wch: 20 },  // Client Name
        { wch: 25 },  // Client Email
        { wch: 10 },  // Review
        { wch: 15 },  // Status
    ];

    return (
        <div>
            <DashboardHeaderTitle path={['المواعيد']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList
                        rows={dataMatrix}
                        columnWidths={columnWidths}
                        headers={headers}
                        fileName="appointments"
                    />
                    <Link className="btn-primary" href="/dashboard/appointments/add">
                        <BiPlus /> إضافة موعد
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <section className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
                <AppointmentsDataView />
            </section>
        </div>
    );
}
