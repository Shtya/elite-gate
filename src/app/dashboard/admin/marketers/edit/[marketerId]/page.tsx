import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Link from 'next/link';
import { BiUser, BiGroup } from 'react-icons/bi';
import MarketerForm from '@/components/dashboard/marketers/MarketerForm';
import { mockedMarketers } from '@/constants/dashboard/admin/marketers/contants';
import CenteredContainer from '@/components/shared/CenteredContainer';


type Props = {
    params: { marketerId: string };
};

export default async function EditMarketerPage({ params }: Props) {
    const { marketerId } = await params;
    const marketer = mockedMarketers.find((r) => r.id === Number(marketerId));

    await new Promise((r) => setTimeout(r, 300)); // simulate loading
    if (!marketer) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['المسوقين', `تعديل بيانات المسوق: ${marketer.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <Link className="btn-primary" href={`/dashboard/admin/marketers/${marketer.id}`}>
                        <BiUser /> صفحة المسوق
                    </Link>
                    <Link className="btn-primary" href="/dashboard/admin/marketers">
                        <BiGroup /> عرض جميع المسوقين
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <CenteredContainer>
                <MarketerForm marketer={marketer} isAdmin={true} />
            </CenteredContainer>
        </div>
    );
}
