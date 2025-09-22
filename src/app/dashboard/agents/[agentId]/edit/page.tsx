import { notFound } from 'next/navigation';
import DashboardHeaderTitle from '@/components/dashboard/DashboardHeaderTitle';
import Link from 'next/link';
import { BiUser, BiGroup } from 'react-icons/bi';
import AgentForm from '@/components/dashboard/agents/AgentForm';
import { mockedAgents } from '@/constants/dashboard/agent/contants';
import CenteredContainer from '@/components/shared/CenteredContainer';

type Props = {
    params: { agentId: string };
};

export default async function EditAgentPage({ params }: Props) {
    const agentId = Number(params.agentId);
    const agent = mockedAgents.find((r) => r.id === agentId);

    await new Promise((r) => setTimeout(r, 300)); // simulate loading
    if (!agent) {
        notFound();
    }

    return (
        <div>
            <DashboardHeaderTitle path={['الوسطاء', `تعديل بيانات الوسيط: ${agent.name}`]}>
                <div className="flex gap-4 flex-wrap">
                    <Link className="btn-primary" href={`/dashboard/agents/${agent.id}`}>
                        <BiUser /> صفحة الوسيط
                    </Link>
                    <Link className="btn-primary" href="/dashboard/agents">
                        <BiGroup /> عرض جميع الوسطاء
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <CenteredContainer>

                <AgentForm agent={agent} isAdmin={true} />
            </CenteredContainer>
        </div>
    );
}
