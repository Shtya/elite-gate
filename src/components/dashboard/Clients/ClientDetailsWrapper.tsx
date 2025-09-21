import { rows } from '@/constants/dashboard/client/contants';
import ClientDetails from './ClientDetails';
import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '../DashboardHeaderTitle';
import DownloadContent from '@/components/shared/DownloadContent';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';


type Props = {
    clientId: number;
};

export default async function ClientDetailsWrapper({ clientId }: Props) {
    await new Promise((r) => setTimeout(r, 300)); // simulate client fetch data
    const client = rows.find((r) => r.id === Number(clientId));

    if (!client) {
        notFound();
    }
    return (
        <>
            <DashboardHeaderTitle path={['العملاء', `تفاصيل العميل - ${client.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadContent text="تحميل المعلومات" />
                    <Link className="btn-primary" href="/dashboard/clients">
                        <BiGroup /> عرض جميع العملاء
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <ClientDetails client={client} />
        </>
    );
}