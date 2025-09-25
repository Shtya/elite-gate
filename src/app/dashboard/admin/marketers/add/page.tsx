import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import MarketerForm from '@/components/dashboard/marketers/MarketerForm';
import CenteredContainer from '@/components/shared/CenteredContainer';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';

export default function AddMarketerPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['المسوقين', 'إضافة مسوق جديد']}>
                <Link className="btn-primary" href="/dashboard/admin/marketers">
                    <BiGroup /> عرض جميع المسوقين
                </Link>
            </DashboardHeaderTitle>

            <CenteredContainer>
                <MarketerForm isAdmin={true} />
            </CenteredContainer>
        </div>
    );
}
