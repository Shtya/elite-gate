import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import AgentForm from '@/components/dashboard/agents/AgentForm';

export default function AddAgentPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['الوسطاء', 'إضافة وسيط جديد']}>
                <Link className="btn-primary" href="/dashboard/agents">
                    <BiGroup /> عرض جميع الوسطاء
                </Link>
            </DashboardHeaderTitle>

            <AgentForm isAdmin={true} />
        </div>
    );
}
