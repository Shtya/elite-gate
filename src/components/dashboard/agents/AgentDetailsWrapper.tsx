
import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '../DashboardHeaderTitle';
import DownloadContent from '@/components/shared/DownloadContent';
import Link from 'next/link';
import { BiGroup } from 'react-icons/bi';
import AgentDetails from './AgentDetails';
import { mockedAgents } from '@/constants/dashboard/agent/contants';

type Props = {
    agentId: number;
};

export default async function AgentDetailsWrapper({ agentId }: Props) {
    await new Promise((r) => setTimeout(r, 300)); // simulate fetch
    const agent = mockedAgents.find((r) => r.id === Number(agentId));

    if (!agent) {
        notFound();
    }

    return (
        <>
            <DashboardHeaderTitle path={['الوسطاء', `تفاصيل الوسيط - ${agent.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadContent text="تحميل المعلومات" />
                    <Link className="btn-primary" href="/dashboard/admin/agents">
                        <BiGroup /> عرض جميع الوسطاء
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <AgentDetails agent={agent} />
        </>
    );
}
