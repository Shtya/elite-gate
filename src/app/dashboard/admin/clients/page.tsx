import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DownloadList from "@/components/shared/DownloadContent";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import ClientsDataView from "@/components/dashboard/Clients/ClientsDataView";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";



export default function ClientsPage() {

    return <div>
        <DashboardHeaderTitle path={['العملاء']}>
            <div className="flex gap-4 flex-wrap">
                <DownloadList />
                <Link className="btn-primary" href="/dashboard/admin/clients/add"><BiEditAlt /> إضافة عميل </Link>
            </div>
        </DashboardHeaderTitle>
        <DashboardSectionCard>
            <ClientsDataView />
        </DashboardSectionCard>
    </div >
}