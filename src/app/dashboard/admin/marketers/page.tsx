import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import MarketersDataView from "@/components/dashboard/marketers/MarketersDataView";
import Link from "next/link";
import DownloadList from "@/components/shared/DownloadContent";
import { BiEditAlt } from "react-icons/bi";

export default function MarketersPage() {
    return (
        <div>
            <DashboardHeaderTitle path={['المسوقين']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList fileName="marketers" />
                    <Link className="btn-primary" href="/dashboard/admin/marketers/add">
                        <BiEditAlt /> إضافة مسوق
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <DashboardSectionCard>
                <MarketersDataView />
            </DashboardSectionCard>
        </div>
    );
}
