import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DownloadList from "@/components/shared/DownloadContent";
import PropertiesDataView from "@/components/main/projects/PropertiesDataView";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";


export default function PropertiesPage() {

    return (
        <div>
            <DashboardHeaderTitle path={['العقارات']}>
                <div className="flex gap-4 flex-wrap">
                    <DownloadList fileName="projects" />
                    <Link className="btn-primary" href="/dashboard/admin/projects/add">
                        <BiEditAlt /> إضافة عقار
                    </Link>
                </div>
            </DashboardHeaderTitle>

            <PropertiesDataView isAdmin={true} />
        </div>
    );
}