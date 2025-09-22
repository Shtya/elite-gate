import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Link from 'next/link';
import { BiUser, BiGroup } from 'react-icons/bi';
import MarketerForm from '@/components/dashboard/marketers/MarketerForm';
import { mockedMarketers } from '@/constants/dashboard/marketers/contants';


type Props = {
    params: { marketerId: string };
};

export default async function EditMarketerPage({ params }: Props) {
    const marketerId = Number(params.marketerId);
    const marketer = mockedMarketers.find((r) => r.id === marketerId);

    await new Promise((r) => setTimeout(r, 300)); // simulate loading
    if (!marketer) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['المسوقين', `تعديل بيانات المسوق: ${marketer.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <Link className="btn-primary" href={`/dashboard/marketers/${marketer.id}`}>
                        <BiUser /> صفحة المسوق
                    </Link>
                    <Link className="btn-primary" href="/dashboard/marketers">
                        <BiGroup /> عرض جميع المسوقين
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <MarketerForm marketer={marketer} isAdmin={true} />
        </div>
    );
}
