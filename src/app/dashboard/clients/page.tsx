import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DownloadList from "@/components/shared/DownloadList";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import ClientsDataView from "@/components/dashboard/clients/ClientsDataView";

export const dynamic = 'force-dynamic';

export default function ClientsPage() {
    return <div>
        <DashboardHeaderTitle path={['العملاء']}>
            <div className="flex gap-4 flex-wrap">
                <DownloadList />
                <Link className="btn-primary" href="/dashboard/clients/add"><BiEditAlt /> إضافة عميل </Link>
            </div>
        </DashboardHeaderTitle>
        <section className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
            <ClientsDataView />
        </section>
    </div >
}