import ClientDetails from '@/components/dashboard/clients/ClientDetails';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import { rows } from '@/constants/dashboard/client/contants';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import { notFound } from 'next/navigation';

type Props = {
    params: { clientId: string };
};

export default async function ClientDetailsPage({ params }: Props) {
    const clientId = Number(params.clientId);
    const client = rows.find((r) => r.id === clientId);

    await new Promise((r) => setTimeout(r, 700)); // simulate loading

    if (!client) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['العملاء', `تفاصيل العميل: ${client.name}`]}>
                <Link className="btn-primary" href="/dashboard/clients">
                    <BiGroup /> عرض جميع العملاء
                </Link>
            </DashboardHeaderTitle>

            <ClientDetails client={client} bookingsThisMonth={5} totalBookings={53} />
        </div>
    );
}
