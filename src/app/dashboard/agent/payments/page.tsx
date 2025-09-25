import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import AgentPayments from "@/components/dashboard/agents/AgentPayments";
import AgentPaymentsDataView from "@/components/dashboard/agents/AgentPaymentsDataView";


export default function AgentPaymentsPage() {

    return (
        <div>
            <DashboardHeaderTitle path={["المدفوعات"]} />
            <AgentPayments />
            <DashboardSectionCard className="mt-4 lg:mt-6" title="سجل المدفوعات">
                <AgentPaymentsDataView />
            </DashboardSectionCard>
        </div>
    );
}


