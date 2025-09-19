
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import BasicInfoForm from '@/components/main/customer/personal-info/BasicInfoForm';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';

export default function AddClientPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['العملاء', 'إضافة عميل جديد']}>
                <Link className="btn-primary" href="/dashboard/clients">
                    <BiGroup /> عرض جميع العملاء
                </Link>
            </DashboardHeaderTitle>

            <BasicInfoForm isAdmin={true} />
        </div>
    );
}
