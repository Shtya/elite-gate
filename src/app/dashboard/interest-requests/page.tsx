
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import DownloadList from "@/components/shared/DownloadContent";
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import InterestRequestsDataView from '@/components/dashboard/InterestRequests/InterestRequestsDataView';

export default function InterestRequestsPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['طلبات الاهتمام']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList
                        fileName="interest-requests"
                    />
                    <Link className="btn-primary" href="/add-property">
                        <BiPlus /> إضافة طلب اهتمام
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <section className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
                <InterestRequestsDataView />
            </section>
        </div>
    );
}
