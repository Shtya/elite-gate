import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import MarketerForm from '@/components/dashboard/marketers/MarketerForm';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';

export default function AddMarketerPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['المسوقين', 'إضافة مسوق جديد']}>
                <Link className="btn-primary" href="/dashboard/marketers">
                    <BiGroup /> عرض جميع المسوقين
                </Link>
            </DashboardHeaderTitle>

            <MarketerForm isAdmin={true} />
        </div>
    );
}
