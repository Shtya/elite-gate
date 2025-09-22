import DashboardHeaderTitle from "@/components/dashboard/DashboardHeaderTitle";
import DownloadList from "@/components/shared/DownloadContent";
import Link from "next/link";
import { BiEditAlt } from "react-icons/bi";
import ClientsDataView from "@/components/dashboard/Clients/ClientsDataView";
import DashboardSectionCard from "@/components/dashboard/DashboardSectionCard";
import { columns, rows } from "@/constants/dashboard/client/contants";
import { formatDate } from "@/utils/date";



export default function ClientsPage() {
    const headers = ['id', ...columns.map(col => col.label)];

    const dataMatrix = rows.map(row => {
        return [
            row.id,
            ...columns.map(col => {
                const value = row[col.key as keyof typeof row];

                if (value === undefined || value === null) return ''; // ✅ prevent undefined

                if (col.key === 'joinedAt') return formatDate(value as string);
                if (col.key === 'status') return value === 'active' ? 'نشط' : 'موقوف';
                if (col.key === 'image') {
                    return typeof value === 'string' && value.trim()
                        ? value
                        : '/users/default-user.png';
                }

                return value;
            })
        ];
    });

    const columnWidths = [
        { wch: 5 },   // ID
        { wch: 12 },  // Image
        { wch: 20 },  // Name
        { wch: 30 },  // Email
        { wch: 18 },  // Phone
        { wch: 15 },  // JoinedAt
        { wch: 10 },  // Status
    ];


    return <div>
        <DashboardHeaderTitle path={['العملاء']}>
            <div className="flex gap-4 flex-wrap">
                <DownloadList rows={dataMatrix} columnWidths={columnWidths} headers={headers} fileName="clients" />
                <Link className="btn-primary" href="/dashboard/clients/add"><BiEditAlt /> إضافة عميل </Link>
            </div>
        </DashboardHeaderTitle>
        <DashboardSectionCard>
            <ClientsDataView />
        </DashboardSectionCard>
    </div >
}