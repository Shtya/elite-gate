import Link from 'next/link';
import { BiGroup, BiUser } from 'react-icons/bi';
import { rows } from '@/constants/dashboard/admin/client/contants'; // mock data
import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import BasicInfoForm from '@/components/main/customer/personal-info/BasicInfoForm';
import CenteredContainer from '@/components/shared/CenteredContainer';

type Props = {
    params: { clientId: string };
};

export default async function EditClientPage({ params }: Props) {
    const clientId = 1;
    const client = rows.find((r) => r.id === clientId);

    await new Promise((r) => setTimeout(r, 300)); // simulate loading
    if (!client) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['العملاء', `تعديل بيانات العميل: ${client.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <Link className="btn-primary" href={`/dashboard/admin/clients/${client.id}`}>
                        <BiUser /> صفحة العميل
                    </Link>
                    <Link className="btn-primary" href="/dashboard/admin/clients">
                        <BiGroup /> عرض جميع العملاء
                    </Link>
                </div>

            </DashboardHeaderTitle>

            <CenteredContainer>
                <BasicInfoForm client={client} isAdmin={true} />
            </CenteredContainer>
        </div>
    );
}
