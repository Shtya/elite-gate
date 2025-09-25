'use client';
import DataView from '@/components/shared/DateViewTable/DataView';
import { FaCheck, FaEdit, FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import useClients from '@/hooks/dashboard/admin/client/useClients';
import { columns, filters, sortConfig } from '@/constants/dashboard/admin/client/contants';
import { ClientRow } from '@/types/dashboard/client';
import ClientStatusToggle from './ClientStatusToggle';
import { ActionType, MenuActionItem } from '@/components/shared/Header/MenuActionList';



export default function ClientsDataView() {
    const getRows = useClients();

    return (
        <DataView<ClientRow>
            columns={columns}
            filters={filters}
            sortConfig={sortConfig}
            showSearch
            showSort
            getRows={getRows}
            showActions
            actionsMenuItems={getClientActionsMenu}



        />
    );
}


export function getClientActionsMenu(row: ClientRow, onClose?: () => void): MenuActionItem[] {
    const isSuspended = row.status === 'suspended';

    return [
        {
            label: 'عرض التفاصيل',
            icon: <FaPencilAlt />,
            link: `/dashboard/admin/clients/${row.id}`,
        },
        {
            label: 'تعديل العميل',
            icon: <FaEdit />,
            link: `/dashboard/admin/clients/${row.id}/edit`,
        },
        {
            label: isSuspended ? 'تفعيل الحساب' : 'تعليق الحساب',
            type: (isSuspended ? 'primary' : 'delete') as ActionType,
            icon: isSuspended ? <FaCheck /> : <FaRegTrashAlt />,
            child: (
                <ClientStatusToggle
                    client={row}
                    currentStatus={row.status}
                    onConfirm={() => {
                        onClose?.(); // ✅ إغلاق القائمة بعد التأكيد
                    }}
                />
            ),
        },
    ];
}