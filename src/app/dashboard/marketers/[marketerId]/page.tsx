import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import DownloadContent from '@/components/shared/DownloadContent';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import { mockedMarketers } from '@/constants/dashboard/marketers/contants';
import MarketerDetails from '@/components/dashboard/marketers/MarketerDetails';


type Props = {
    params: {
        marketerId: string; // dynamic route params are always strings
    };
};

export default async function MarketerPage({ params }: Props) {
    const { marketerId } = params;
    await new Promise((r) => setTimeout(r, 300)); // simulate fetch
    const marketer = mockedMarketers.find((r) => r.id === Number(marketerId));

    if (!marketer) {
        notFound();
    }

    return (
        <>
            <DashboardHeaderTitle path={['المسوقين', `تفاصيل المسوق - ${marketer.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadContent text="تحميل المعلومات" />
                    <Link className="btn-primary" href="/dashboard/marketers">
                        <BiGroup /> عرض جميع المسوقين
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <MarketerDetails marketer={marketer} />

        </>
    );
}
