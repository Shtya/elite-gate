
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import DownloadList from "@/components/shared/DownloadContent";
import { BiPlus } from 'react-icons/bi';
import Link from 'next/link';
import PropertySubmissionsDataView from '@/components/dashboard/admin/propertySubmissions/PropertySubmissionsDataView';

export default function propertySubmissionsPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['طلبات عرض العقار']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList />
                    <Link className="btn-primary" href="/add-property">
                        <BiPlus /> إضافة طلب عرض عقار
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <section className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
                <PropertySubmissionsDataView />
            </section>
        </div>
    );
}
