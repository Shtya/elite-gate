import AgentsDataView from "@/components/dashboard/agents/AgentsDataView";
import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import DownloadList from "@/components/shared/DownloadContent";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";

export default function AgentsPage() {


    return (
        <div>
            <DashboardHeaderTitle path={['الوسطاء']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList
                        fileName="agents"
                    />
                    <Link className="btn-primary" href="/dashboard/agents/add">
                        <BiEditAlt /> إضافة وسيط
                    </Link>
                </div>
            </DashboardHeaderTitle>
            <DashboardSectionCard>
                <AgentsDataView />
            </DashboardSectionCard>
        </div>
    );
}
