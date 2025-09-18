import ClientsDataView from "@/components/dashboard/Clients/ClientsDataView";
import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DownloadList from "@/components/shared/DownloadList";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import { BiEditAlt, BiUser, BiUserPin } from "react-icons/bi";


export default function ClientsPage({ searchParams }: { searchParams?: SearchParams }) {
    return <div>
        <DashboardHeaderTitle path={['العملاء']}>
            <div className="flex gap-4 flex-wrap">
                <DownloadList />
                <Link className="btn-primary" href="/dashboard/clients/add"><BiEditAlt /> Add Client</Link>
            </div>
        </DashboardHeaderTitle>
        <section className="p-3 md:py-6 lg:py-8 md:px-8 lg:px-10 border rounded-2xl bg-white relative z-[1]">
            <ClientsDataView />
        </section>
    </div >
}