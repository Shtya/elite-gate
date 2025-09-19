import ClientDetails from '@/components/dashboard/clients/ClientDetails';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import { rows } from '@/constants/dashboard/client/contants';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import DownloadContent from '@/components/shared/DownloadContent';
import AppointmentsDataView from '@/components/dashboard/appointments/AppointmentsDataView';
import DashboardSectionCard from '@/components/dashboard/DashboardSectionCard';

type Props = {
    params: { clientId: string };
};
export default function ClientDetailsPage({ params }: Props) {
    const clientId = Number(params.clientId);

    return (
        <div>
            <DashboardHeaderTitle path={['العملاء', `تفاصيل العميل`]}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadContent text="تحميل المعلومات" />
                    <Link className="btn-primary" href="/dashboard/clients">
                        <BiGroup /> عرض جميع العملاء
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <ClientDetails clientId={clientId} />
            <DashboardSectionCard className=' mt-4 lg:mt-6'>
                <h2 className="h3 text-gray-800 mb-6">سجل الحجوزات</h2>
                <AppointmentsDataView clientId={clientId} />
            </DashboardSectionCard>

        </div >
    );
}
